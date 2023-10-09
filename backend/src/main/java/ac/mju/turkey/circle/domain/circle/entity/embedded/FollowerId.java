package ac.mju.turkey.circle.domain.circle.entity.embedded;

import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.user.entity.User;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class FollowerId implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Circle circle;

    public static FollowerId of(User user, Circle circle) {
        return FollowerId.builder()
                .user(user)
                .circle(circle)
                .build();
    }
}
