package ac.mju.turkey.circle.system.security.model;

import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.AuthenticatedPrincipal;

import java.util.HashMap;

@SuperBuilder
@Getter
public class CircleUserDetails implements AuthenticatedPrincipal {
    private final String email;
    private final String realName;
    private final String nickname;

    @Override
    public String getName() {
        return email;
    }

    public HashMap<String, Object> toClaimMap() {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("realName", realName);
        claims.put("nickname", nickname);

        return claims;
    }

    public static CircleUserDetails from(Claims claims) {
        return CircleUserDetails.builder()
                .email(claims.get("email", String.class))
                .realName(claims.get("realName", String.class))
                .nickname(claims.get("nickname", String.class))
                .build();
    }
}
