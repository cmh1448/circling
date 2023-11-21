package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.Follower;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static ac.mju.turkey.circle.domain.circle.entity.QFollower.follower;

@Repository
@RequiredArgsConstructor
public class FollowerQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Follower> findFollowingCirclesByEmail(String email) {
        return queryFactory.selectFrom(follower)
                .leftJoin(follower.id.user)
                .leftJoin(follower.id.circle)
                .where(
                        follower.id.user.email.eq(email),
                        follower.type.eq(FollowerType.FOLLOWER)
                )
                .fetch();
    }

    public Optional<Follower> findMemberedCircleByEmail(String email) {
        return Optional.ofNullable(
                queryFactory.selectFrom(follower)
                        .leftJoin(follower.id.user).fetchJoin()
                        .leftJoin(follower.id.circle).fetchJoin()
                        .where(
                                follower.id.user.email.eq(email),
                                follower.type.eq(FollowerType.MEMBER)
                        )
                        .fetchFirst()
        );
    }

    public List<Follower> findFollowersByCircleId(Long circleId) {
        return queryFactory.selectFrom(follower)
                .leftJoin(follower.id.user).fetchJoin()
                .leftJoin(follower.id.circle).fetchJoin()
                .where(
                        follower.id.circle.id.eq(circleId),
                        follower.type.eq(FollowerType.FOLLOWER)
                )
                .fetch();
    }

    public List<Follower> findMembersByCircleId(Long circleId) {
        return queryFactory.selectFrom(follower)
                .leftJoin(follower.id.user).fetchJoin()
                .leftJoin(follower.id.circle).fetchJoin()
                .where(
                        follower.id.circle.id.eq(circleId),
                        follower.type.eq(FollowerType.MEMBER)
                )
                .fetch();
    }
}
