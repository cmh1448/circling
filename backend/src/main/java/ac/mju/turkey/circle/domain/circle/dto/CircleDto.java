package ac.mju.turkey.circle.domain.circle.dto;

import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import com.querydsl.core.annotations.QueryProjection;
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

        String message;

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
}
