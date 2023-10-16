package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.CircleMemberRegister;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CircleMemberRegisterRepository extends JpaRepository<CircleMemberRegister, Long> {
}
