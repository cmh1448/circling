package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.domain.board.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
