package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.domain.board.entity.Category;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ac.mju.turkey.circle.domain.board.entity.QCategory.category;

@Repository
@RequiredArgsConstructor
public class CategoryQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Category> findAllByCircle(Circle circle) {
        return queryFactory.selectFrom(category)
                .where(
                        category.circle.eq(circle)
                )
                .orderBy(category.priority.desc())
                .fetch();
    }
}
