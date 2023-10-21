package ac.mju.turkey.circle.domain.circle.entity;

import ac.mju.turkey.circle.common.auditor.UserStampedEntity;
import ac.mju.turkey.circle.domain.circle.entity.enums.ApplicationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import static ac.mju.turkey.circle.domain.circle.entity.enums.ApplicationType.*;

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

    public ApplicationType status = WAITING;

    public void approve() {
        this.status = ApplicationType.APPROVED;
    }

    public void deny(){
        this.status = ApplicationType.DENIED;
    }
}
