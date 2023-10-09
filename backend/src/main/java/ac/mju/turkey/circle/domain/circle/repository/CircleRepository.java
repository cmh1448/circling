package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.Circle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CircleRepository extends JpaRepository<Circle, Long> {
}
