package ac.mju.turkey.circle.system.exception.filter;

import ac.mju.turkey.circle.system.exception.dto.ErrorDto;
import ac.mju.turkey.circle.system.exception.model.RestException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;



@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);
        }catch (RestException exception) {
            ObjectMapper mapper = new ObjectMapper();
            log.error("{Rest Exception}: " + exception.getErrorCode().getMessage());

            response.setStatus(exception.getErrorCode().getStatusCode());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            response.getWriter().write(mapper.writeValueAsString(ErrorDto.ErrorResponse.from(exception.getErrorCode())));
        }
    }
}
