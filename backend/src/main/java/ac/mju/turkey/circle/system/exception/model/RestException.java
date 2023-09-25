package ac.mju.turkey.circle.system.exception.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RestException extends RuntimeException{
    private ErrorCode errorCode;
}
