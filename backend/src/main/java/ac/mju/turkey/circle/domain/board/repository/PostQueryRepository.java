package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.common.pagination.PagingQueryFactory;
import ac.mju.turkey.circle.common.pagination.PagingQueryResult;
import ac.mju.turkey.circle.domain.board.dto.PostDto;
import ac.mju.turkey.circle.domain.board.entity.Category;
import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import static ac.mju.turkey.circle.domain.board.entity.QPost.post;
import static ac.mju.turkey.circle.domain.circle.entity.QFollower.follower;

@Repository
@RequiredArgsConstructor
public class PostQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final PagingQueryFactory pagingQueryFactory;

    public Page<PostDto.PaginationResponse> paginateByCategory(Category category, Pageable pageable) {
        PagingQueryResult<Post> result = pagingQueryFactory.from(post)
                .where(
                        post.category.eq(category)
                )
                .orderBy(post.createdAt.desc())
                .fetchPages(pageable, Post.class);

        return result.toPageImpl(PostDto.PaginationResponse::from);
    }

    public Page<PostDto.PaginationResponse> paginateByCircle(Circle circle, Pageable pageable) {
        PagingQueryResult<Post> found = pagingQueryFactory.from(post)
                .where(
                        post.circle.eq(circle)
                )
                .orderBy(post.createdAt.desc())
                .fetchPages(pageable, Post.class);


        return found.toPageImpl(PostDto.PaginationResponse::from);
    }

    public Page<PostDto.Response> paginateFeedsByUser(CircleUserDetails user, Pageable pageable) {
        PagingQueryResult<Post> found = pagingQueryFactory.from(post)
                .fetchJoin(post.category)
                .fetchJoin(post.createdBy)
                .fetchJoin(post.lastModifiedBy)
                .where(
                        post.circle.in(
                                JPAExpressions.select(follower.id.circle).from(follower)
                                        .where(
                                                follower.id.user.eq(user.getUser())
                                        )
                        )
                )
                .orderBy(post.createdAt.desc())
                .fetchPages(pageable, Post.class);

        return found.toPageImpl(PostDto.Response::from);
    }
}
