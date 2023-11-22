package ac.mju.turkey.circle.domain.chat.service;

import ac.mju.turkey.circle.domain.chat.dto.ChatDto;
import ac.mju.turkey.circle.domain.chat.entity.ChatLog;
import ac.mju.turkey.circle.domain.chat.repository.ChatLogRepository;
import ac.mju.turkey.circle.domain.chat.websocket.dto.MessageDto;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatLogRepository chatLogRepository;

    @Transactional
    public void saveChatLog(MessageDto.Request request, CircleUserDetails sender) {
        ChatLog toSave = ChatLog.of(request, sender.getEmail());
        chatLogRepository.save(toSave);
    }

    @Transactional(readOnly = true)
    public List<ChatDto.Response> loadCachedChatLog(String sender, String receiver) {
        String roomName = ChatLog.generateRoomName(sender, receiver);

        List<ChatLog> founds = chatLogRepository.findByRoomName(roomName);

        if(founds.size() >= 1000) {
            //TODO: flush to db
            //chatLogRepository.deleteAllById(found.stream().map(ChatLog::getId).toList());
        }

        return founds.stream()
                .map(ChatDto.Response::from)
                .toList();
    }
}
