package ac.mju.turkey.circle.domain.notification.controller;

import ac.mju.turkey.circle.domain.notification.dto.NotificationDto;
import ac.mju.turkey.circle.domain.notification.service.NotificationService;
import ac.mju.turkey.circle.domain.notification.service.SseService;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private final SseService sseService;
    private final NotificationService notificationService;

    @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@AuthenticationPrincipal CircleUserDetails user) {
        SseEmitter emitter = new SseEmitter();
        sseService.register(emitter, user);

        return ResponseEntity.ok(emitter);
    }

    @PostMapping("/send")
    public void send(@RequestBody NotificationDto.Request request) {
        notificationService.sendNotification(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        notificationService.deleteNotification(id);
    }

    @DeleteMapping("/my")
    public void deleteMy(@AuthenticationPrincipal CircleUserDetails user) {
        notificationService.deleteMyNotifications(user);
    }

    @GetMapping("/my")
    public List<NotificationDto.Response> my(@AuthenticationPrincipal CircleUserDetails user) {
        return notificationService.findMyNotifications(user);
    }
}
