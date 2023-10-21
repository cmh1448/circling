package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.Follower;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static ac.mju.turkey.circle.domain.circle.entity.QFollower.follower;

@Repository
@RequiredArgsConstructor
public class FollowerQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<Follower> findListByFollowerEmail(String email) {
        return queryFactory.selectFrom(follower)
                .leftJoin(follower.id.user)
                .leftJoin(follower.id.circle)
                .where(
                        follower.id.user.email.eq(email)
                )
                .fetch();
    }

    public Follower findByFollowerEmail(String email) {
        return queryFactory.selectFrom(follower)
                .leftJoin(follower.id.user)
                .leftJoin(follower.id.circle)
                .where(
                        follower.id.user.email.eq(email)
                )
                .fetchFirst();
    }
}
