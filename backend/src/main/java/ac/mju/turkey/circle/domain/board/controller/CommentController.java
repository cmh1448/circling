package ac.mju.turkey.circle.domain.board.controller;

import ac.mju.turkey.circle.domain.board.dto.CommentDto;
import ac.mju.turkey.circle.domain.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/posts/{postId}/comments")
    public List<CommentDto.TreeResponse> findCommentsByPost(@PathVariable Long postId) {
        return commentService.findCommentsByPost(postId);
    }

    @PostMapping("/posts/{postId}/comments")
    public CommentDto.Response createCommentOnPost(@PathVariable Long postId, @RequestBody CommentDto.Request request) {
        return commentService.createComment(request, postId);
    }

    @PostMapping("/comments/{commentId}")
    public CommentDto.Response createReplyOnComment(@PathVariable Long commentId, @RequestBody CommentDto.Request request) {
        return commentService.createReply(request, commentId);
    }

    @PatchMapping("/comments/{commentId}")
    public CommentDto.Response updateComment(@PathVariable Long commentId, @RequestBody CommentDto.Request request) {
        return commentService.updateComment(commentId, request);
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }
}
