package ac.mju.turkey.circle.domain.notification.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;

@RedisHash(value = "notification")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Notification {
    @Id
    private String id;

    private String title;

    private String content;

    @Indexed
    private String targetEmail;

    private LocalDateTime createdAt;

    public static Notification of(String title, String content, String targetEmail) {
        return Notification.builder()
                .title(title)
                .content(content)
                .targetEmail(targetEmail)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
