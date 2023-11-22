package ac.mju.turkey.circle.domain.chat.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MessageDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class HandshakeRequest {
        private String jwtToken;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Request {
        private String content;
        private String receiver;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Response {
        private String content;
        private String sender;
    }
}
