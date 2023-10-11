package ac.mju.turkey.circle.system.configuration;


import ac.mju.turkey.circle.domain.auth.dto.AuthDto;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import ac.mju.turkey.circle.domain.user.entity.User;
import ac.mju.turkey.circle.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Component
@RequiredArgsConstructor
public class DefaultDataLoader implements CommandLineRunner {
    private final Environment environment;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Transactional
    @Override
    public void run(String... args) throws Exception {
        createDefaultAdminAccount();
    }

    private void createDefaultAdminAccount() {
        Optional<User> found = userRepository.findById("admin");
        if(found.isEmpty()) {
            AuthDto.SignUpRequest request = AuthDto.SignUpRequest.builder()
                    .email("admin")
                    .firstName("Admin")
                    .lastName("Circling")
                    .nickName("admin")
                    .password("root")
                    .build();

            userRepository.save(request.toEntity(passwordEncoder));
        }
    }
}
