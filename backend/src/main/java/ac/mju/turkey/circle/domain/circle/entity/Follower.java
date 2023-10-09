package ac.mju.turkey.circle.domain.circle.entity;

import ac.mju.turkey.circle.common.auditor.UserStampedEntity;
import ac.mju.turkey.circle.domain.circle.entity.embedded.FollowerId;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class Follower extends UserStampedEntity {
    @EmbeddedId
    private FollowerId id;

    @Enumerated(EnumType.STRING)
    private FollowerType type;

    public static Follower of(FollowerId id, FollowerType type) {
        return Follower.builder()
                .id(id)
                .type(type)
                .build();
    }
}
