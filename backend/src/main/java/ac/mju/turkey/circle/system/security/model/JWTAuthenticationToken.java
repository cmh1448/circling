package ac.mju.turkey.circle.system.security.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Setter
@Getter
public class JWTAuthenticationToken extends AbstractAuthenticationToken {
    private String token;

    private CircleUserDetails user;

    public JWTAuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    public static JWTAuthenticationToken of(String token, CircleUserDetails user) {
        JWTAuthenticationToken authToken = new JWTAuthenticationToken(Collections.singletonList(new SimpleGrantedAuthority("noting")));

        authToken.setToken(token);
        authToken.setUser(user);

        return authToken;
    }
}
