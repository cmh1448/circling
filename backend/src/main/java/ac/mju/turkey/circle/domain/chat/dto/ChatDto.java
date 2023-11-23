package ac.mju.turkey.circle.domain.chat.dto;

import ac.mju.turkey.circle.domain.chat.entity.ChatLog;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import ac.mju.turkey.circle.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ChatDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Response {
        private String content;
        private LocalDateTime timestamp;
        private String sender;

        public static Response from(ChatLog chatLog) {
            return Response.builder()
                    .content(chatLog.getContent())
                    .timestamp(chatLog.getTimestamp())
                    .sender(chatLog.getSender())
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class LastMessageResponse {
        private String content;
        private LocalDateTime timestamp;
        private UserDto.UserResponse sender;
        private UserDto.UserResponse receiver;

        public static LastMessageResponse of(ChatLog chatLog, User sender, User receiver) {
            return LastMessageResponse.builder()
                    .content(chatLog.getContent())
                    .timestamp(chatLog.getTimestamp())
                    .sender(UserDto.UserResponse.from(sender))
                    .receiver(UserDto.UserResponse.from(receiver))
                    .build();
        }
    }
}
