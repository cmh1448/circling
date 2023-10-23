package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CircleRepository extends JpaRepository<Circle, Long> {

    public Circle findByLeader(User leader);
}
