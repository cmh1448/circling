package ac.mju.turkey.circle.domain.user.service;

import ac.mju.turkey.circle.domain.user.entity.User;
import ac.mju.turkey.circle.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

}
