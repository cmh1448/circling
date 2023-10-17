package ac.mju.turkey.circle.system.exception.dto;

import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ErrorDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class ErrorResponse {
        private Integer statusCode;
        private String message;
        private String codeName;

        public static ErrorResponse from(ErrorCode errorCode) {
            return ErrorResponse.builder()
                    .statusCode(errorCode.getStatusCode())
                    .message(errorCode.getMessage())
                    .codeName(errorCode.getCodeName())
                    .build();
        }

        public static ErrorResponse of(Integer statusCode, String message) {
            return ErrorResponse.builder()
                    .statusCode(statusCode)
                    .message(message)
                    .build();
        }
    }
}
