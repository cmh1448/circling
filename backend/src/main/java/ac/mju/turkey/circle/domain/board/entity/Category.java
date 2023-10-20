package ac.mju.turkey.circle.domain.board.entity;

import ac.mju.turkey.circle.common.auditor.TimeStampedEntity;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class Category extends TimeStampedEntity {
    @Setter(AccessLevel.NONE)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Long priority;

    @ManyToOne(fetch = FetchType.LAZY)
    private Circle circle;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private List<Post> posts;
}
