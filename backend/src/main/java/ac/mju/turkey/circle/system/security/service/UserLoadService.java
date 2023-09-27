package ac.mju.turkey.circle.system.security.service;

import ac.mju.turkey.circle.domain.user.entity.User;
import ac.mju.turkey.circle.domain.user.repository.UserRepository;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.cache.LocalSecurityCacheStorage;
import ac.mju.turkey.circle.system.security.cache.SecurityCacheStorage;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserLoadService {
    private final UserRepository userRepository;
    private final SecurityCacheStorage cacheStorage;

    public CircleUserDetails loadUserByEmail(String email) {
        Optional<CircleUserDetails> cached = cacheStorage.findCache(email);

        if(cached.isPresent())
            return cached.get();

        User found = userRepository.findById(email)
                .orElseThrow(() -> new RestException(ErrorCode.AUTH_USER_NOT_FOUND));

        CircleUserDetails toReturn = CircleUserDetails.from(found);
        cacheStorage.store(toReturn);

        return toReturn;
    }
}
