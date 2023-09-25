package ac.mju.turkey.circle.system.exception.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //Auth
    AUTH_TOKEN_NOT_FOUND(401, "인증 토큰을 찾을 수 없습니다."),
    AUTH_TOKEN_EXPIRED(401, "토큰이 만료되었습니다."),
    AUTH_TOKEN_INVALID(401, "올바른 토큰이 아닙니다."),
    //Other
    INTERNAL_SERVER_ERROR(500, "오류가 발생했습니다.");

    private final int statusCode;
    private final String message;
}
