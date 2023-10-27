package ac.mju.turkey.circle.domain.board.dto;

import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class PostDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Request {
        private String title;

        private String content;

        public Post toEntity() {
            return Post.builder()
                    .title(title)
                    .content(content)
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

        private String content;

        private Long comments;

        private CategoryDto.Response category;

        private LocalDateTime createdAt;

        private UserDto.UserResponse createdBy;

        private LocalDateTime lastModifiedAt;

        private UserDto.UserResponse lastModifiedBy;

        public static Response from(Post post) {
            return Response.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .category(CategoryDto.Response.from(post.getCategory()))
                    .content(post.getContent())
                    .comments((long) post.getComments().size())
                    .category(CategoryDto.Response.from(post.getCategory()))
                    .createdAt(post.getCreatedAt())
                    .createdBy(UserDto.UserResponse.from(post.getCreatedBy()))
                    .lastModifiedAt(post.getLastModifiedAt())
                    .lastModifiedBy(UserDto.UserResponse.from(post.getLastModifiedBy()))
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class PaginationResponse {
        private Long id;

        private String title;

        private Long comments;

        private LocalDateTime createdAt;

        private UserDto.UserResponse createdBy;

        private LocalDateTime lastModifiedAt;

        private UserDto.UserResponse lastModifiedBy;

        public static PaginationResponse from(Post post) {
            return PaginationResponse.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .comments((long) post.getComments().size())
                    .createdAt(post.getCreatedAt())
                    .createdBy(UserDto.UserResponse.from(post.getCreatedBy()))
                    .lastModifiedAt(post.getLastModifiedAt())
                    .lastModifiedBy(UserDto.UserResponse.from(post.getLastModifiedBy()))
                    .build();
        }
    }
}
