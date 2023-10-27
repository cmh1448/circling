package ac.mju.turkey.circle.domain.board.repository;

import ac.mju.turkey.circle.domain.board.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long > {
}
