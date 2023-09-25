package ac.mju.turkey.circle.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "CIRCLE_USER")
@Getter
@Setter
public class User {
    @Id
    private String email;

    private String firstName;

    private String lastName;

    private String nickName;

    private String password;
}
