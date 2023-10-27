package ac.mju.turkey.circle.domain.board.service;

import ac.mju.turkey.circle.domain.board.dto.CommentDto;
import ac.mju.turkey.circle.domain.board.entity.Comment;
import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.board.repository.CommentQueryRepository;
import ac.mju.turkey.circle.domain.board.repository.CommentRepository;
import ac.mju.turkey.circle.domain.board.repository.PostRepository;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentQueryRepository commentQueryRepository;
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<CommentDto.TreeResponse> findCommentsByPost(Long postId) {
        Post foundPost = postRepository.findById(postId)
                .orElseThrow(() -> new RestException(ErrorCode.BOARD_POST_NOT_FOUND));


        return commentQueryRepository.findCommentsWithChildrenByPost(foundPost).stream()
                .map(CommentDto.TreeResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public CommentDto.Response createComment(CommentDto.Request request, Long postId) {
        Post foundPost = postRepository.findById(postId)
                .orElseThrow(() -> new RestException(ErrorCode.BOARD_POST_NOT_FOUND));

        Comment toSave = request.toEntity();
        toSave.setPost(foundPost);

        Comment saved = commentRepository.save(toSave);

        return CommentDto.Response.from(saved);
    }

    @Transactional
    public CommentDto.Response createReply(CommentDto.Request request, Long parentId) {
        Comment parent = commentQueryRepository.findById(parentId)
                .orElseThrow(() -> new RestException(ErrorCode.BOARD_PARENT_COMMENT_NOT_FOUND));

        Comment toSave = request.toEntity();
        toSave.setParent(parent);
        toSave.setPost(parent.getPost());

        Comment saved = commentRepository.save(toSave);

        return CommentDto.Response.from(saved);
    }

    @Transactional
    public CommentDto.Response updateComment(Long id, CommentDto.Request request) {
        Comment toUpdate = commentQueryRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        if(Objects.nonNull(request.getContent()))
            toUpdate.setContent(request.getContent());

        return CommentDto.Response.from(toUpdate);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment toDelete = commentQueryRepository.findById(commentId)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        if(toDelete.getChildren().isEmpty())
            commentRepository.delete(toDelete);
        else {
            toDelete.setIsDeleted(true);
        }

    }
}
