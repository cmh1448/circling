package ac.mju.turkey.circle.system.security.cache;

import ac.mju.turkey.circle.system.security.model.CircleUserDetails;

import java.util.Optional;

public interface SecurityCacheStorage {
    void store(CircleUserDetails user);

    void invalidateCache(String email);

    Optional<CircleUserDetails> findCache(String email);
}
