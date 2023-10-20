package ac.mju.turkey.circle.common.pagination;

import ac.mju.turkey.circle.domain.board.entity.Post;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class PagingQuery<E extends EntityPathBase<?>> {
    List<Predicate> where = new ArrayList<>();
    List<OrderSpecifier<?>> orderBy = new ArrayList<>();
    EntityPathBase<?> entity;

    JPAQueryFactory queryFactory;

    public PagingQuery(E entity, JPAQueryFactory queryFactory) {
        this.entity = entity;
        this.queryFactory = queryFactory;
    }


    public PagingQuery<E> where(Predicate predict) {
        if(!where.isEmpty())
            throw new IllegalStateException("where절을 여러번 반복 할 수 없습니다.");

        this.where.add(predict);

        return this;
    }

    public PagingQuery<E> where(Predicate... predict) {
        if(!where.isEmpty())
            throw new IllegalStateException("where절을 여러번 반복 할 수 없습니다.");

        this.where.addAll(List.of(predict));

        return this;
    }

    public PagingQuery<E> orderBy(OrderSpecifier<?> orderSpecifier) {
        if(!this.orderBy.isEmpty())
            throw new IllegalStateException("OrderBy절을 여러번 반복 할 수 없습니다.");

        this.orderBy.add(orderSpecifier);

        return this;
    }

    public PagingQuery<E> orderBy(OrderSpecifier<?>... orderSpecifier) {
        if(!this.orderBy.isEmpty())
            throw new IllegalStateException("OrderBy절을 여러번 반복 할 수 없습니다.");

        this.orderBy.addAll(List.of(orderSpecifier));

        return this;
    }

    public <K> PagingQueryResult<K> fetchPages(Pageable pageable, Class<K> entityClass) {
        List<?> result = queryFactory.selectFrom(entity)
                .where(
                        where.toArray(new Predicate[0])
                )
                .orderBy(
                        orderBy.toArray(new OrderSpecifier[0])
                )
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long count = queryFactory.select(entity.count()).from(entity)
                .where(
                        where.toArray(new Predicate[0])
                )
                .fetchFirst();

        return new PagingQueryResult<>(result.stream().map(entityClass::cast).toList(), count, pageable);
    }


}
