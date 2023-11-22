package ac.mju.turkey.circle.domain.chat.entity;

import ac.mju.turkey.circle.domain.chat.websocket.dto.MessageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;

@RedisHash(value = "chat_log")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatLog {
    @Id
    private String id;

    @Indexed
    private String roomName;

    private String sender;

    private String receiver;

    private String content;

    private LocalDateTime timestamp;

    public static String generateRoomName(String sender, String receiver) {
        return sender.compareTo(receiver) < 0 ? sender + receiver : receiver + sender;
    }

    public static ChatLog of(MessageDto.Request request, String sender) {
        return ChatLog.builder()
                .sender(sender)
                .receiver(request.getReceiver())
                .content(request.getContent())
                .timestamp(LocalDateTime.now())
                .roomName(generateRoomName(sender, request.getReceiver()))
                .build();
    }
}
