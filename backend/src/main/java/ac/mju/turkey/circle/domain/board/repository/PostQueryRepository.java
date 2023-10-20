package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.common.pagination.PagingQueryFactory;
import ac.mju.turkey.circle.common.pagination.PagingQueryResult;
import ac.mju.turkey.circle.domain.board.dto.PostDto;
import ac.mju.turkey.circle.domain.board.entity.Category;
import ac.mju.turkey.circle.domain.board.entity.Post;
import ac.mju.turkey.circle.domain.board.entity.QCategory;
import ac.mju.turkey.circle.domain.board.entity.QPost;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import static ac.mju.turkey.circle.domain.board.entity.QPost.post;

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
}
