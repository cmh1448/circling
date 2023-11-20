package ac.mju.turkey.circle.domain.circle.dto;

import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.entity.RegisterApplication;
import ac.mju.turkey.circle.domain.circle.entity.enums.ApplicationState;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class CircleDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class CreateRequest {
        String name;
        String description;


        public Circle toEntity() {
            return Circle.builder()
                    .name(name)
                    .description(description)
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class RegisterRequest {
        String message;

        public RegisterApplication toEntity(Circle circle) {
            return RegisterApplication.builder()
                    .circle(circle)
                    .message(message)
                    .build();
        }
    }


    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Response {
        Long id;

        String name;

        String description;

        UserDto.UserResponse leader;

        public static Response from(Circle circle) {
            return Response.builder()
                    .id(circle.getId())
                    .name(circle.getName())
                    .description(circle.getDescription())
                    .leader(UserDto.UserResponse.from(circle.getLeader()))
                    .build();
        }
    }

    @NoArgsConstructor
    @Data
    @Builder
    public static class DetailResponse {
        @QueryProjection
        public DetailResponse(Long id, String name, String description, Long followers, Long members) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.followers = followers;
            this.members = members;
        }

        Long id;

        String name;

        String description;

        Long followers;

        Long members;


        public static DetailResponse from(Circle circle) {
            return DetailResponse.builder()
                    .id(circle.getId())
                    .name(circle.getName())
                    .description(circle.getDescription())
                    .followers((long) circle.getFollowers().size())
                    .members(circle.getFollowers().stream()
                            .filter(m -> m.getType().equals(FollowerType.MEMBER))
                            .count()
                    )
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class RegisterResponse {
        Long id;

        CircleDto.Response circle;

        String message;

        UserDto.UserResponse createdBy;

        LocalDateTime createdAt;

        ApplicationState status;

        UserDto.UserResponse lastModifiedBy;

        LocalDateTime lastModifiedAt;

        public static RegisterResponse from(RegisterApplication register) {
            return RegisterResponse.builder()
                    .id(register.getId())
                    .circle(Response.from(register.getCircle()))
                    .message(register.getMessage())
                    .createdBy(UserDto.UserResponse.from(register.getCreatedBy()))
                    .status(register.getStatus())
                    .createdAt(register.getCreatedAt())
                    .lastModifiedBy(UserDto.UserResponse.from(register.getLastModifiedBy()))
                    .lastModifiedAt(register.getLastModifiedAt())
                    .build();

        }
    }
}
