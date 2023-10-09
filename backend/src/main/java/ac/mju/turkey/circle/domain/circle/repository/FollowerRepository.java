package ac.mju.turkey.circle.domain.circle.repository;

import ac.mju.turkey.circle.domain.circle.entity.Follower;
import ac.mju.turkey.circle.domain.circle.entity.embedded.FollowerId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, FollowerId> {
}
