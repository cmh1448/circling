package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.dto.CircleDto;
import ac.mju.turkey.circle.domain.circle.dto.QCircleDto_DetailResponse;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ac.mju.turkey.circle.domain.circle.entity.QCircle.*;
import static ac.mju.turkey.circle.domain.circle.entity.QFollower.follower;

@Repository
@RequiredArgsConstructor
public class CircleQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<CircleDto.DetailResponse> findAll() {

        return queryFactory.select(new QCircleDto_DetailResponse(
                circle.id,
                circle.name,
                circle.description,
                Expressions.asNumber(
                        JPAExpressions.select(follower.count()).from(follower)
                                .where(
                                        follower.id.circle.eq(circle)
                                )
                ),
                Expressions.asNumber(
                    JPAExpressions.select(follower.count()).from(follower)
                            .where(
                                    follower.id.circle.eq(circle),
                                    follower.type.eq(FollowerType.MEMBER)
                            )
                )
                )).from(circle)
                .fetch();
    }
}
