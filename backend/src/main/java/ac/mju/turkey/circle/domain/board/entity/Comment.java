package ac.mju.turkey.circle.domain.board.entity;

import ac.mju.turkey.circle.common.auditor.UserStampedEntity;
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
public class Comment extends UserStampedEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long id;

    Boolean isDeleted;

    @Column(length = 10000)
    String content;

    @ManyToOne(fetch = FetchType.LAZY)
    Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    Comment parent;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    List<Comment> children;
}
