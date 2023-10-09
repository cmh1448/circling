package ac.mju.turkey.circle.domain.circle.dto;

import ac.mju.turkey.circle.domain.circle.entity.Follower;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FollowerDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Response {
        CircleDto.Response circle;

        FollowerType type;

        public static Response from(Follower follower) {
            return Response.builder()
                    .circle(CircleDto.Response.from(follower.getId().getCircle()))
                    .type(follower.getType())
                    .build();
        }
    }
}
