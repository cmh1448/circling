package ac.mju.turkey.circle.system.exception.handler;

import ac.mju.turkey.circle.system.exception.dto.ErrorDto;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler({HttpMessageConversionException.class})
    public ResponseEntity<ErrorDto.ErrorResponse> handleRestException(HttpMessageConversionException exception) {
//        log.error("{Internal Exception}: " + exception.getMessage());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorDto.ErrorResponse.from(ErrorCode.GLOBAL_BAD_REQUEST));
    }

    @ExceptionHandler({HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<ErrorDto.ErrorResponse> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException exception) {

        return ResponseEntity
                .status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(ErrorDto.ErrorResponse.from(ErrorCode.GLOBAL_METHOD_NOT_ALLOWED));
    }

    @ExceptionHandler({RestException.class})
    public ResponseEntity<ErrorDto.ErrorResponse> handleRestException(RestException exception) {
        log.error("{Rest Exception}: " + exception.getErrorCode().getMessage());

        return ResponseEntity
                .status(exception.getErrorCode().getStatusCode())
                .body(ErrorDto.ErrorResponse.from(exception.getErrorCode()));
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorDto.ErrorResponse> handleException(Exception exception) {
        log.error("{Internal Exception}: " + exception.getMessage(), exception);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorDto.ErrorResponse.from(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}
