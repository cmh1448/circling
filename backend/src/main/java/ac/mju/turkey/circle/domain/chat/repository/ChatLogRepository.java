package ac.mju.turkey.circle.domain.chat.repository;


import ac.mju.turkey.circle.domain.chat.entity.ChatLog;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatLogRepository extends CrudRepository<ChatLog, String> {
    List<ChatLog> findByRoomName(String roomName);

    List<ChatLog> findAllByReceiverOrSenderEquals(String receiver, String sender);
}
