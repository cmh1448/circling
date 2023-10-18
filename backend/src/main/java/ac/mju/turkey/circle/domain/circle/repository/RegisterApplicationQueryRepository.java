package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.QRegisterApplication;
import ac.mju.turkey.circle.domain.circle.entity.RegisterApplication;
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

    //CreatedBy (email PK)를 기준으로 신청서 1개를 찾아서 반환
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

}
