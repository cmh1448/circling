package ac.mju.turkey.circle.domain.notification.dto;

import ac.mju.turkey.circle.domain.notification.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class NotificationDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Data
    public static class Response {
        private String id;
        private String title;
        private String content;
        private String targetEmail;

        private LocalDateTime createdAt;

        public static Response from(Notification notification) {
            return Response.builder()
                    .id(notification.getId())
                    .title(notification.getTitle())
                    .content(notification.getContent())
                    .targetEmail(notification.getTargetEmail())
                    .createdAt(notification.getCreatedAt())
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Data
    public static class Request {
        private String title;
        private String content;
        private String targetEmail;

        public static Request of(String title, String content, String targetEmail) {
            return Request.builder()
                    .title(title)
                    .content(content)
                    .targetEmail(targetEmail)
                    .build();
        }
    }
}
