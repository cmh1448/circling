package ac.mju.turkey.circle.domain.notification.service;

import ac.mju.turkey.circle.domain.notification.dto.NotificationDto;
import ac.mju.turkey.circle.domain.notification.observer.NotificationObserver;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
@RequiredArgsConstructor
public class SseService {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final NotificationService notificationService;

    public SseEmitter register(SseEmitter emitter, CircleUserDetails user) {
        this.emitters.add(emitter);

        emitter.onCompletion(() -> {
            this.emitters.remove(emitter);
            notificationService.unsubscribe(user.getEmail());
        });

        emitter.onTimeout(emitter::complete);

        NotificationObserver observer = NotificationObserver.of(user.getEmail(), (it) -> {
            try {
                emitter.send(SseEmitter.event().id("notification").data(NotificationDto.Response.from(it)));
            } catch (Exception e) {
                try {

                    emitter.complete();
                } catch (Exception ignored) {
                    this.emitters.remove(emitter);
                }
            }
        }, () -> {
            try {
                emitter.send(SseEmitter.event().id("update").build());
            } catch (IOException e) {
                try {

                    emitter.complete();
                } catch (Exception ignored) {
                    this.emitters.remove(emitter);
                }
            }
        });

        notificationService.subscribe(observer);

        try {
            emitter.send(SseEmitter.event().id("connected").build());
        } catch (IOException e) {
            emitter.complete();
        }

        return emitter;
    }
}
