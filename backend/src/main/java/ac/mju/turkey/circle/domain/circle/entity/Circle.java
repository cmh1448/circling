package ac.mju.turkey.circle.domain.circle.entity;

import ac.mju.turkey.circle.common.auditor.UserStampedEntity;
import ac.mju.turkey.circle.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Circle extends UserStampedEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    @OneToOne(fetch = FetchType.LAZY)
    User leader;

    @OneToMany(mappedBy = "id.circle", fetch = FetchType.LAZY)
    List<Follower> followers = new ArrayList<>();
}
