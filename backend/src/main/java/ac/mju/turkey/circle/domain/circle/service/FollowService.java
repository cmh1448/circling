package ac.mju.turkey.circle.domain.circle.service;

import ac.mju.turkey.circle.domain.circle.dto.FollowerDto;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.entity.Follower;
import ac.mju.turkey.circle.domain.circle.entity.embedded.FollowerId;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.circle.repository.CircleRepository;
import ac.mju.turkey.circle.domain.circle.repository.FollowerQueryRepository;
import ac.mju.turkey.circle.domain.circle.repository.FollowerRepository;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final CircleRepository circleRepository;
    private final FollowerRepository followerRepository;
    private final FollowerQueryRepository followerQueryRepository;

    @Transactional
    public FollowerDto.Response follow(Long circleId, CircleUserDetails user) {
        Circle found = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        FollowerId followerId = FollowerId.of(user.getUser(), found);

        cannotFollowAlreadyFollowed(followerId);

        Follower toSave = Follower.of(followerId, FollowerType.FOLLOWER);
        Follower saved = followerRepository.save(toSave);

        return FollowerDto.Response.from(saved);
    }

    private void cannotFollowAlreadyFollowed(FollowerId followerId) {
        if(followerRepository.existsById(followerId))
            throw new RestException(ErrorCode.CIRCLE_ALREADY_FOLLOWED);
    }

    @Transactional
    public void unfollow(Long circleId, CircleUserDetails user) {
        Circle found = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        FollowerId followerId = FollowerId.of(user.getUser(), found);
        Follower toDelete = followerRepository.findById(followerId)
                .orElseThrow(() -> new RestException(ErrorCode.CIRCLE_NOT_FOLLOWED));

        followerRepository.delete(toDelete);
    }

    @Transactional(readOnly = true)
    public List<FollowerDto.Response> findFollowedCircles(CircleUserDetails user) {
        List<Follower> founds = followerQueryRepository.findByFollowerEmail(user.getEmail());

        return founds.stream()
                .map(FollowerDto.Response::from)
                .toList();
    }
}
