package ac.mju.turkey.circle.domain.notification.repository;

import ac.mju.turkey.circle.domain.notification.entity.Notification;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NotificationRedisRepository extends CrudRepository<Notification, String> {
    List<Notification> findByTargetEmail(String email);

}
