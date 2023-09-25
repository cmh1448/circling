package ac.mju.turkey.circle.domain.user.repository;

import ac.mju.turkey.circle.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
