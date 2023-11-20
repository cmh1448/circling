package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.RegisterApplication;
import ac.mju.turkey.circle.domain.circle.entity.enums.ApplicationState;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static ac.mju.turkey.circle.domain.circle.entity.QRegisterApplication.registerApplication;

@Repository
@RequiredArgsConstructor
public class RegisterApplicationQueryRepository {
    private final JPAQueryFactory queryFactory;

    public List<RegisterApplication> findToApproveByUser(CircleUserDetails user) {
        return queryFactory.selectFrom(registerApplication)
                .where(
                        registerApplication.circle.leader.email.eq(user.getEmail()),
                        registerApplication.status.eq(ApplicationState.WAITING)
                )
                .fetch();
    }

    public Optional<RegisterApplication> findByEmail(String email) {
        return Optional.ofNullable(
                queryFactory.selectFrom(registerApplication)
                    .where(
                            registerApplication.createdBy.email.eq(email)
                    )
                    .fetchFirst()
        );
    }

    public List<RegisterApplication> findAll() {
        List<RegisterApplication> results = queryFactory
                .selectFrom(registerApplication)
                .fetch();

        return results;
    }

    public List<RegisterApplication> findToApproveByCircleId(Long id) {
        return queryFactory.selectFrom(registerApplication)
                .where(
                        registerApplication.circle.id.eq(id),
                        registerApplication.status.eq(ApplicationState.WAITING)
                )
                .fetch();
    }
}
