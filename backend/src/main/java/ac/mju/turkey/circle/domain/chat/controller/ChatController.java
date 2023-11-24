package ac.mju.turkey.circle.domain.chat.controller;

import ac.mju.turkey.circle.domain.chat.dto.ChatDto;
import ac.mju.turkey.circle.domain.chat.service.ChatService;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/logs/{email}/cached")
    public List<ChatDto.Response> findCachedChatLogs(@PathVariable String email, @AuthenticationPrincipal CircleUserDetails user) {
        return chatService.loadCachedChatLog(user.getEmail(), email);
    }

    @GetMapping("/logs/last")
    public List<ChatDto.LastMessageResponse> findLastMessages(@AuthenticationPrincipal CircleUserDetails user) {
        return chatService.loadLastMessages(user);
    }

    @GetMapping("/users/available")
    public List<UserDto.UserResponse> findAvailableUsers(@AuthenticationPrincipal CircleUserDetails user) {
        return chatService.findAvailableUsers(user);
    }
}
