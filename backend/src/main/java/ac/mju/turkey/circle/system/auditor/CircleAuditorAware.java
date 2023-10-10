package ac.mju.turkey.circle.system.auditor;

import ac.mju.turkey.circle.domain.user.entity.User;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CircleAuditorAware implements AuditorAware<User> {

    @Override @NonNull
    public Optional<User> getCurrentAuditor() {
        Authentication authentication =  SecurityContextHolder.getContext().getAuthentication();

        return Optional.ofNullable(authentication)
                .map(Authentication::getPrincipal)
                .map(CircleUserDetails.class::cast)
                .map(CircleUserDetails::getUser);
    }
}
