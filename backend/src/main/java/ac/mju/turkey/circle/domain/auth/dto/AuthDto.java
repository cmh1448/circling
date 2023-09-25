package ac.mju.turkey.circle.domain.auth.dto;

import ac.mju.turkey.circle.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

public class AuthDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class SignInRequest {
        private String email;
        private String password;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class SignUpRequest {
        private String email;

        private String firstName;

        private String lastName;

        private String nickName;

        private String password;

        public User toEntity(PasswordEncoder encoder) {
            return User.builder()
                    .email(email)
                    .firstName(firstName)
                    .lastName(lastName)
                    .nickName(nickName)
                    .password(encoder.encode(password))
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class TokenResponse {
        private String token;
        private LocalDateTime expireAt;

        public static TokenResponse of(String token, LocalDateTime expireAt) {
            return TokenResponse.builder()
                    .token(token)
                    .expireAt(expireAt)
                    .build();
        }
    }
}
