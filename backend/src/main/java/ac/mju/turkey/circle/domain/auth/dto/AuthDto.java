package ac.mju.turkey.circle.domain.auth.dto;

import ac.mju.turkey.circle.domain.user.dto.UserDto;
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
        private UserDto.UserResponse user;
        private String token;
        private LocalDateTime expireAt;

        public static TokenResponse of(String token, User user, LocalDateTime expireAt) {
            return TokenResponse.builder()
                    .user(UserDto.UserResponse.from(user))
                    .token(token)
                    .expireAt(expireAt)
                    .build();
        }
    }
}
