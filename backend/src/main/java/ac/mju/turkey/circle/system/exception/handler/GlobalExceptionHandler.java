package ac.mju.turkey.circle.system.exception.handler;

import ac.mju.turkey.circle.system.exception.dto.ErrorDto;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler({RestException.class})
    public ResponseEntity<ErrorDto.ErrorResponse> handleRestException(RestException exception) {
        log.error("{Rest Exception}: " + exception.getErrorCode().getMessage());

        return ResponseEntity
                .status(exception.getErrorCode().getStatusCode())
                .body(ErrorDto.ErrorResponse.from(exception.getErrorCode()));
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorDto.ErrorResponse> handleException(Exception exception) {
        log.error("{Internal Exception}: " + exception.getMessage());

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorDto.ErrorResponse.from(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}
