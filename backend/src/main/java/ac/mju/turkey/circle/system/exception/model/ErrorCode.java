package ac.mju.turkey.circle.system.exception.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //Global
    GLOBAL_BAD_REQUEST(400, "올바르지 않은 요청입니다."),
    //Auth
    AUTH_TOKEN_NOT_FOUND(401, "인증 토큰을 찾을 수 없습니다."),
    AUTH_TOKEN_EXPIRED(401, "토큰이 만료되었습니다."),
    AUTH_TOKEN_INVALID(401, "올바른 토큰이 아닙니다."),
    AUTH_USER_NOT_FOUND(404, "등록된 유저를 찾을 수 없습니다."),
    AUTH_PASSWORD_NOT_CORRECT(401, "올바른 비밀번호가 아닙니다."),
    AUTH_FORBIDDEN(403, "접근 권한이 없습니다."),
    AUTH_CANNOT_GENERATE_TOKEN(400, "인증키를 생성 할 수 없습니다."),

    //Other
    INTERNAL_SERVER_ERROR(500, "오류가 발생했습니다.");

    private final int statusCode;
    private final String message;
}
