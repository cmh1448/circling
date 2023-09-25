package ac.mju.turkey.circle.system.security.filter;

import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import ac.mju.turkey.circle.system.security.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Slf4j
public class JWTAuthenticationFilter extends BasicAuthenticationFilter {
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        Authentication authentication = getAuthenticationFromRequest(request);

        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);

        chain.doFilter(request, response);
    }

    private Authentication getAuthenticationFromRequest(HttpServletRequest request) {
        String token = parseTokenFromAuthHeader(request.getHeader("Authorization"))
                .orElseThrow(() -> new RestException(ErrorCode.AUTH_TOKEN_NOT_FOUND));

        if(JwtUtil.isTokenExpired(token))
            throw new RestException(ErrorCode.AUTH_TOKEN_EXPIRED);

        Claims claims;
        try {
            claims = JwtUtil.getAllClaimsFromToken(token);
        }catch (JwtException exception) {
            throw new RestException(ErrorCode.AUTH_TOKEN_EXPIRED);
        }

        return new UsernamePasswordAuthenticationToken(CircleUserDetails.from(claims), null);
    }

    private Optional<String> parseTokenFromAuthHeader(String authHeader) {
        if(Objects.isNull(authHeader) || authHeader.startsWith("Bearer "))
            return Optional.empty();

        String token = authHeader.substring(7);

        return Optional.of(token);
    }
}
