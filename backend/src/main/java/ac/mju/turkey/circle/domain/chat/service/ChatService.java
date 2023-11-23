package ac.mju.turkey.circle.domain.chat.service;

import ac.mju.turkey.circle.domain.chat.dto.ChatDto;
import ac.mju.turkey.circle.domain.chat.entity.ChatLog;
import ac.mju.turkey.circle.domain.chat.repository.ChatLogRepository;
import ac.mju.turkey.circle.domain.chat.websocket.dto.MessageDto;
import ac.mju.turkey.circle.domain.user.entity.User;
import ac.mju.turkey.circle.domain.user.repository.UserRepository;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatLogRepository chatLogRepository;
    private final UserRepository userRepository;

    @Transactional
    public void saveChatLog(MessageDto.Request request, CircleUserDetails sender) {
        ChatLog toSave = ChatLog.of(request, sender.getEmail());
        chatLogRepository.save(toSave);
    }

    @Transactional(readOnly = true)
    public List<ChatDto.Response> loadCachedChatLog(String sender, String receiver) {
        String roomName = ChatLog.generateRoomName(sender, receiver);

        List<ChatLog> founds = chatLogRepository.findByRoomName(roomName);

        if (founds.size() >= 1000) {
            //TODO: flush to db
            //chatLogRepository.deleteAllById(found.stream().map(ChatLog::getId).toList());
        }

        return founds.stream()
                .map(ChatDto.Response::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ChatDto.LastMessageResponse> loadLastMessages(CircleUserDetails user) {
        List<ChatLog> recentChats = chatLogRepository.findAllByReceiverOrSenderEquals(user.getEmail(), user.getEmail());

        //group by roomName
        HashMap<String, ChatLog> grouped = new HashMap<>();

        for (ChatLog chatLog : recentChats) {
            String roomName = chatLog.getRoomName();
            if (grouped.containsKey(roomName)) {
                ChatLog prev = grouped.get(roomName);
                if (prev.getTimestamp().isBefore(chatLog.getTimestamp())) {
                    grouped.put(roomName, chatLog);
                }
            } else {
                grouped.put(roomName, chatLog);
            }
        }

        //batch fetch uesrs and cache
        Set<String> involvedUsers = new HashSet<>();
        for (ChatLog chatLog : grouped.values()) {
            involvedUsers.add(chatLog.getSender());
            involvedUsers.add(chatLog.getReceiver());
        }
        List<User> cachedUsers = cacheUsers(involvedUsers);


        //return ChatLogs order by timestamp
        return new ArrayList<>(grouped.values()).stream()
                .map(chatLog -> ChatDto.LastMessageResponse.of(chatLog,
                        findUserFromCacheOrElseThrow(chatLog.getSender(), cachedUsers),
                        findUserFromCacheOrElseThrow(chatLog.getReceiver(), cachedUsers)
                ))
                .toList();
    }

    private List<User> cacheUsers(Collection<String> involvedUsers) {
        return userRepository.findAllById(involvedUsers);
    }

    private User findUserFromCacheOrElseThrow(String email, List<User> cachedUsers) {
        return cachedUsers.stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst()
                .orElseThrow(() -> new RestException(ErrorCode.AUTH_USER_NOT_FOUND));
    }
}
