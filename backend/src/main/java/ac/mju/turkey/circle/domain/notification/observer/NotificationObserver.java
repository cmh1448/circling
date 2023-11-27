package ac.mju.turkey.circle.domain.notification.observer;


import ac.mju.turkey.circle.domain.notification.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;
import java.util.function.Consumer;

@AllArgsConstructor(access = lombok.AccessLevel.PRIVATE)
@Builder
@Getter
public class NotificationObserver {
    String id;
    String email;
    Consumer<Notification> onNotificationArrival;
    Runnable onNotificationsUpdated;

    public static NotificationObserver of(String email, Consumer<Notification> consumer, Runnable onNotificationsUpdated) {
        return NotificationObserver.builder()
                .id(UUID.randomUUID().toString())
                .email(email)
                .onNotificationArrival(consumer)
                .onNotificationsUpdated(onNotificationsUpdated)
                .build();
    }
}
