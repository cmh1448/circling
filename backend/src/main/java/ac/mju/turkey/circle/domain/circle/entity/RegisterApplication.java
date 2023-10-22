package ac.mju.turkey.circle.domain.circle.entity;

import ac.mju.turkey.circle.common.auditor.UserStampedEntity;
import ac.mju.turkey.circle.domain.circle.entity.enums.ApplicationState;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import static ac.mju.turkey.circle.domain.circle.entity.enums.ApplicationState.*;

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

    public ApplicationState status = WAITING;

    public void approve() {
        this.status = ApplicationState.APPROVED;
    }

    public void deny(){
        this.status = ApplicationState.DENIED;
    }

    public void canApprovedBy(CircleUserDetails user) {
        if(!this.circle.leader.getEmail().equals(user.getEmail()))
            throw new RestException(ErrorCode.AUTH_FORBIDDEN);
    }
}
