package ac.mju.turkey.circle.domain.notification.service;

import ac.mju.turkey.circle.domain.notification.dto.NotificationDto;
import ac.mju.turkey.circle.domain.notification.entity.Notification;
import ac.mju.turkey.circle.domain.notification.observer.NotificationObserver;
import ac.mju.turkey.circle.domain.notification.repository.NotificationRedisRepository;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final NotificationRedisRepository notificationRedisRepository;
    private final HashMap<String, NotificationObserver> observers = new HashMap<>();

    public void sendNotification(String title, String content, String targetEmail) {
        notificationRedisRepository.save(Notification.of(title, content, targetEmail));

        notifyObservers(Notification.of(title, content, targetEmail));
    }

    public void sendNotification(NotificationDto.Request request) {
        sendNotification(request.getTitle(), request.getContent(), request.getTargetEmail());
    }

    private void notifyObservers(Notification notification) {
        observers.values().stream()
                .filter(observer -> observer.getEmail().equals(notification.getTargetEmail()))
                .forEach(observer -> observer.getOnNotificationArrival().accept(notification));
    }

    public void deleteNotification(String id) {
        notificationRedisRepository.deleteById(id);
    }

    public List<NotificationDto.Response> findMyNotifications(CircleUserDetails user) {
         return notificationRedisRepository.findByTargetEmail(user.getEmail()).stream()
                 .map(NotificationDto.Response::from)
                 .toList();
    }

    public void subscribe(NotificationObserver observer) {
        observers.put(observer.getId(), observer);
    }

    public void unsubscribe(String id) {
        observers.remove(id);
    }
}
