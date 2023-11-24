package ac.mju.turkey.circle.domain.chat.websocket;

import ac.mju.turkey.circle.domain.chat.service.ChatService;
import ac.mju.turkey.circle.domain.chat.websocket.dto.MessageDto;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import ac.mju.turkey.circle.system.security.provider.JwtTokenProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ChatWebsocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatService chatService;

    HashMap<String, Connection> connections = new HashMap<>();


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)  {
        try{
        if(connections.containsKey(session.getId()))
            handleAuthenticatedConnection(session, message);
        else
            handleWaitingConnection(session, message);
        }catch (IOException ignored){
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        connections.remove(session.getId());
    }

    private void handleWaitingConnection(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload();
        try {
            authenticateConnection(session, payload);

        } catch (JsonProcessingException e) {
                session.sendMessage(new TextMessage("ERROR: 올바른 연결 요청이 아닙니다."));
        } catch (Exception e) {
                session.sendMessage(new TextMessage("ERROR: 연결에 실패하였습니다."));
        }
    }

    private void authenticateConnection(WebSocketSession session, String payload) throws JsonProcessingException {
        MessageDto.HandshakeRequest request = objectMapper.readValue(payload, MessageDto.HandshakeRequest.class);

        String token = request.getJwtToken();
        CircleUserDetails user = (CircleUserDetails) jwtTokenProvider.getAuthentication(token).getPrincipal();

        //authenticate complete
        connections.put(session.getId(), Connection.of(user, session));
    }


    private void handleAuthenticatedConnection(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload();
        try {
            MessageDto.Request request = objectMapper.readValue(payload, MessageDto.Request.class);

            List<Connection> receiverConnections = connections.values().stream()
                    .filter(connection -> connection.getUser().getEmail().equals(request.getReceiver()) || connection.getUser().getEmail().equals(connections.get(session.getId()).getUser().getEmail()))
                    .toList();



            receiverConnections.forEach(connection -> {
                try {
                    connection.getSession().sendMessage(new TextMessage(objectMapper.writeValueAsString(MessageDto.Response.builder()
                            .content(request.getContent())
                            .sender(connections.get(session.getId()).getUser().getEmail())
                            .build())));
                } catch (IOException ignored) {}
            });

            chatService.saveChatLog(request, connections.get(session.getId()).getUser());
        } catch (JsonProcessingException e) {
            session.sendMessage(new TextMessage("ERROR: 올바른 연결 요청이 아닙니다."));
        }
    }

}
