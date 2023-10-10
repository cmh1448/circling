package ac.mju.turkey.circle.domain.circle.dto;

import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class CircleDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Request {
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
    public static class Response {
        Long id;

        String name;

        String description;

        public static Response from(Circle circle) {
            return Response.builder()
                    .id(circle.getId())
                    .name(circle.getName())
                    .description(circle.getDescription())
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class DetailResponse {
        Long id;

        String name;

        String description;

        List<UserDto.UserResponse> members;

        public static DetailResponse from(Circle circle) {
            return DetailResponse.builder()
                    .id(circle.getId())
                    .name(circle.getName())
                    .description(circle.getDescription())
                    .build();
        }
    }
}