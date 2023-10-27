package ac.mju.turkey.circle.domain.board.dto;

import ac.mju.turkey.circle.domain.board.entity.Comment;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CommentDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Builder
    public static class Request {
        String content;

        public Comment toEntity() {
            return Comment.builder()
                    .content(content)
                    .isDeleted(false)
                    .build();
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @SuperBuilder
    public static class Response {
        Long id;
        String content;
        Long parentId;
        Boolean isDeleted;

        LocalDateTime createdAt;
        UserDto.UserResponse createdBy;
        LocalDateTime lastModifiedAt;
        UserDto.UserResponse lastModifiedBy;

        public static Response from(Comment comment) {
            return Response.builder()
                    .id(comment.getId())
                    .content(!comment.getIsDeleted() ? comment.getContent() : null)
                    .parentId(Optional.ofNullable(comment.getParent()).map(Comment::getId).orElse(null))
                    .isDeleted(comment.getIsDeleted())
                    .createdAt(comment.getCreatedAt())
                    .createdBy(UserDto.UserResponse.from(comment.getCreatedBy()))
                    .lastModifiedAt(comment.getLastModifiedAt())
                    .lastModifiedBy(UserDto.UserResponse.from(comment.getLastModifiedBy()))
                    .build();
        }
    }

    @EqualsAndHashCode(callSuper = true)
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @SuperBuilder
    public static class TreeResponse extends Response {
        List<TreeResponse> children = new ArrayList<>();

        public static TreeResponse from(Comment comment) {
            return TreeResponse.builder()
                    .id(comment.getId())
                    .content(!comment.getIsDeleted() ? comment.getContent() : null)
                    .parentId(Optional.ofNullable(comment.getParent()).map(Comment::getId).orElse(null))
                    .isDeleted(comment.getIsDeleted())
                    .createdAt(comment.getCreatedAt())
                    .createdBy(UserDto.UserResponse.from(comment.getCreatedBy()))
                    .lastModifiedAt(comment.getLastModifiedAt())
                    .lastModifiedBy(UserDto.UserResponse.from(comment.getLastModifiedBy()))
                    .children(comment.getChildren().stream().map(TreeResponse::from).toList())
                    .build();
        }
    }
}
