package ac.mju.turkey.circle.domain.board.dto;

import ac.mju.turkey.circle.domain.board.entity.Category;
import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.circle.dto.CircleDto;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class CategoryDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Request {
        private String title;

        private Long priority;

        public Category toEntity() {
            return Category.builder()
                    .priority(priority)
                    .title(title)
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Response {
        private Long id;

        private String title;

        private Long priority;

        private CircleDto.Response circle;

        private LocalDateTime createdAt;


        private LocalDateTime lastModifiedAt;

        public static Response from(Category category) {
            return Response.builder()
                    .id(category.getId())
                    .title(category.getTitle())
                    .circle(CircleDto.Response.from(category.getCircle()))
                    .priority(category.getPriority())
                    .createdAt(category.getCreatedAt())
                    .lastModifiedAt(category.getLastModifiedAt())
                    .build();
        }
    }
}
