package ac.mju.turkey.circle.domain.chat.websocket;

import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Connection {
    private CircleUserDetails user;
    private WebSocketSession session;

    public static Connection of(CircleUserDetails user, WebSocketSession session) {
        return Connection.builder()
                .user(user)
                .session(session)
                .build();
    }
}
