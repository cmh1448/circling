package ac.mju.turkey.circle.system.security.model;

import ac.mju.turkey.circle.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.AuthenticatedPrincipal;

import java.util.HashMap;

@SuperBuilder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CircleUserDetails implements AuthenticatedPrincipal {
    private String email;
    private String firstName;
    private String lastName;
    private String nickname;

    @JsonIgnore
    @Override
    public String getName() {
        return firstName + " " + lastName;
    }

    public HashMap<String, Object> toClaimMap() {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("firstName", firstName);
        claims.put("lastName", lastName);
        claims.put("nickname", nickname);

        return claims;
    }

    public static CircleUserDetails from(Claims claims) {
        return CircleUserDetails.builder()
                .email(claims.get("email", String.class))
                .firstName(claims.get("firstName", String.class))
                .lastName(claims.get("lastName", String.class))
                .nickname(claims.get("nickname", String.class))
                .build();
    }

    public static CircleUserDetails from(User user) {
        return CircleUserDetails.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .nickname(user.getNickName())
                .build();
    }
}
