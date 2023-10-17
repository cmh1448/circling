package ac.mju.turkey.circle.domain.circle.entity;

import ac.mju.turkey.circle.common.auditor.UserStampedEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class RegisterApplication extends UserStampedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Circle circle;

    private String message;
}
