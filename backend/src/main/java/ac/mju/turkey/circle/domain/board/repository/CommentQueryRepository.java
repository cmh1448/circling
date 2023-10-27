package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.domain.board.entity.Comment;
import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.board.entity.QComment;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static ac.mju.turkey.circle.domain.board.entity.QComment.comment;

@Repository
@RequiredArgsConstructor
public class CommentQueryRepository {
    private final JPAQueryFactory queryFactory;

    public Optional<Comment> findCommentWithChildren(Long commentId) {
        QComment children = new QComment("children");

        return Optional.ofNullable(
                queryFactory.selectFrom(comment)
                        .leftJoin(comment.children, children).fetchJoin()
                        .where(
                                comment.id.eq(commentId),
                                notDeleted()
                        )
                        .fetchFirst()
        );
    }

    public List<Comment> findCommentsWithChildrenByPost(Post post) {
        QComment children = new QComment("children");

        return queryFactory.selectFrom(comment)
                .leftJoin(comment.children, children).fetchJoin()
                .leftJoin(comment.createdBy).fetchJoin()
                .leftJoin(comment.lastModifiedBy).fetchJoin()
                .distinct()
                .where(
                        comment.post.eq(post),
                        comment.parent.isNull(),
                        notDeleted().or(comment.children.isNotEmpty())
                )
                .fetch();
    }

    public Optional<Comment> findById(Long id) {
        return Optional.ofNullable(
                queryFactory.selectFrom(comment)
                        .leftJoin(comment.createdBy).fetchJoin()
                        .leftJoin(comment.lastModifiedBy).fetchJoin()
                        .distinct()
                        .where(
                                comment.id.eq(id),
                                notDeleted()
                        )
                        .fetchFirst()
        );
    }

    private static BooleanExpression notDeleted() {
        return comment.isDeleted.isFalse();
    }


}
