package ac.mju.turkey.circle.system.security.cache;

import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.Builder;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class SecurityCacheStorage {
    Map<String, CachedUser> cachedUsers = new HashMap<>();

    private LocalDateTime getExpiresTime() {
        return LocalDateTime.now().plusHours(2);
    }

    public void store(CircleUserDetails user) {
        cachedUsers.remove(user.getEmail());
        cachedUsers.put(user.getEmail(), CachedUser.of(user, getExpiresTime()));
    }

    public void invalidateCache(String email) {
        cachedUsers.remove(email);
    }

    public Optional<CircleUserDetails> findCache(String email) {
        Optional<CachedUser> found = Optional.ofNullable(cachedUsers.get(email));

        return found.map(cache -> cache.isExpired() ? null : cache.user);
    }

    @Getter
    @Builder
    private static class CachedUser {
        private CircleUserDetails user;
        private LocalDateTime expiresAt;

        public Boolean isExpired() {
            return this.expiresAt.isBefore(LocalDateTime.now());
        }

        public static CachedUser of(CircleUserDetails user, LocalDateTime expiresAt) {
            return CachedUser.builder()
                    .user(user)
                    .expiresAt(expiresAt)
                    .build();
        }
    }
}
