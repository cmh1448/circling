package ac.mju.turkey.circle.domain.user.dto;

import ac.mju.turkey.circle.domain.user.entity.User;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class UserResponse {
        private String email;

        private String firstName;

        private String lastName;

        private String nickName;

        public static UserResponse from(User user) {
            return UserResponse.builder()
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .nickName(user.getNickName())
                    .build();
        }

        public static UserResponse from(CircleUserDetails user) {
            return UserResponse.builder()
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .nickName(user.getNickname())
                    .build();
        }
    }
}
