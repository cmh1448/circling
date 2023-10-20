package ac.mju.turkey.circle.common.pagination;


import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PagingQueryFactory {
    private final JPAQueryFactory queryFactory;

    public <T extends EntityPathBase<?>> PagingQuery<T> from(T entity) {

        return new PagingQuery<>(entity, queryFactory);
    }
}
