package ac.mju.turkey.circle.system.exception.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //Global
    GLOBAL_BAD_REQUEST(400, "올바르지 않은 요청입니다."),
    GLOBAL_NOT_FOUND(404, "요청한 사항을 찾을 수 없습니다."),
    GLOBAL_ALREADY_EXIST(400, "요청의 대상이 이미 존재합니다."),
    GLOBAL_METHOD_NOT_ALLOWED(405, "허용되지 않는 Method 입니다."),
    //Auth
    AUTH_TOKEN_NOT_FOUND(401, "인증 토큰을 찾을 수 없습니다."),
    AUTH_TOKEN_EXPIRED(401, "토큰이 만료되었습니다."),
    AUTH_TOKEN_INVALID(401, "올바른 토큰이 아닙니다."),
    AUTH_USER_NOT_FOUND(404, "등록된 유저를 찾을 수 없습니다."),
    AUTH_PASSWORD_NOT_CORRECT(401, "올바른 비밀번호가 아닙니다."),
    AUTH_FORBIDDEN(403, "접근 권한이 없습니다."),
    AUTH_CANNOT_GENERATE_TOKEN(400, "인증키를 생성 할 수 없습니다."),


    //Circle
    CIRCLE_ALREADY_FOLLOWED(400, "이미 팔로우중인 동아리 입니다."),
    CIRCLE_NOT_FOLLOWED(400, "팔로우 되지 않은 동아리 입니다."),
    CIRCLE_NOT_FOUND(404, "동아리를 찾을 수 없습니다."),
    CIRCLE_ALREADY_MEMBER(400, "이미 가입된 동아리 입니다."),

    //Board
    BOARD_CATEGORY_NOT_FOUND(404, "카테고리를 찾을 수 없습니다."),
    BOARD_POST_NOT_FOUND(404, "게시물을 찾을 수 없습니다."),
    BOARD_PARENT_COMMENT_NOT_FOUND(404, "부모 댓글을 찾을 수 없습니다."),
    //Other
    INTERNAL_SERVER_ERROR(500, "오류가 발생했습니다.");



    private final int statusCode;
    private final String message;
}
