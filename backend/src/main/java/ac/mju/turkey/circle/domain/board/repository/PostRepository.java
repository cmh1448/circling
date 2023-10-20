package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.domain.board.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
