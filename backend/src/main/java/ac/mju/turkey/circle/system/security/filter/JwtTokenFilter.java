package ac.mju.turkey.circle.system.security.filter;

import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.provider.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final List<String> ignorePatterns = new ArrayList<>();
    private final List<String> includePatterns = new ArrayList<>();

    private final AntPathMatcher matcher = new AntPathMatcher();


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokenProvider.resolveToken(request);

        if(!isMatchingURI(request.getServletPath())) {
            filterChain.doFilter(request, response);
            return;
        }

        try{
            if(Objects.isNull(token))
                throw new RestException(ErrorCode.AUTH_TOKEN_NOT_FOUND);

            if (jwtTokenProvider.validateToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }catch (RestException ex) {
            SecurityContextHolder.clearContext();
            response.sendError(ex.getErrorCode().getStatusCode(), ex.getErrorCode().getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }

    public JwtTokenFilter ignorePattern(String matchURI) {
        ignorePatterns.add(matchURI);
        return this;
    }

    public JwtTokenFilter includePattern(String matchURI) {
        includePatterns.add(matchURI);
        return this;
    }

    public Boolean isMatchingURI(String servletPath) {
        if(includePatterns.stream().anyMatch(p -> matcher.match(p, servletPath))){
            return ignorePatterns.stream().noneMatch(p -> matcher.match(p, servletPath));
        }
        else
            return false;
    }
}
