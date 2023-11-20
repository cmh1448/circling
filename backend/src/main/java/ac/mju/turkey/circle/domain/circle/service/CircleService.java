package ac.mju.turkey.circle.domain.circle.service;

import ac.mju.turkey.circle.domain.circle.dto.CircleDto;
import ac.mju.turkey.circle.domain.circle.dto.FollowerDto;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.entity.Follower;
import ac.mju.turkey.circle.domain.circle.entity.RegisterApplication;
import ac.mju.turkey.circle.domain.circle.entity.embedded.FollowerId;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.circle.repository.*;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CircleService {
    private final CircleRepository circleRepository;
    private final CircleQueryRepository circleQueryRepository;
    private final FollowerRepository followerRepository;
    private final FollowerQueryRepository followerQueryRepository;
    private final RegisterApplicationQueryRepository registerApplicationQueryRepository;
    private final RegisterApplicationRepository registerApplicationRepository;

    @Transactional
    public CircleDto.Response createCircle(CircleDto.CreateRequest request, CircleUserDetails user) {
        Circle toSave = request.toEntity();
        toSave.setLeader(user.getUser());

        Circle saved = circleRepository.save(toSave);

        return CircleDto.Response.from(saved);
    }

    @Transactional
    public CircleDto.Response updateById(Long id, CircleDto.CreateRequest request) {
        Circle found = circleRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        if (Objects.nonNull(request.getName()))
            found.setName(request.getName());

        if (Objects.nonNull(request.getDescription()))
            found.setDescription(request.getDescription());

        return CircleDto.Response.from(found);
    }

    @Transactional(readOnly = true)
    public CircleDto.DetailResponse findById(Long id) {
        Circle found = circleRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        return CircleDto.DetailResponse.from(found);
    }

    @Transactional
    public void deleteById(Long id) {
        Circle found = circleRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        circleRepository.delete(found);
    }

    @Transactional(readOnly = true)
    public List<CircleDto.DetailResponse> findAll() {
        return circleQueryRepository.findAll();
    }

    @Transactional
    public CircleDto.RegisterResponse registerMember(Long circleId, CircleUserDetails user, CircleDto.RegisterRequest request) {
        Circle foundCircle = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        RegisterApplication toSave = request.toEntity(foundCircle);

        RegisterApplication saved = registerApplicationRepository.save(toSave);// 신청 정보 저장

        return CircleDto.RegisterResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public CircleDto.RegisterResponse getRegister(CircleUserDetails user) {
        RegisterApplication found = registerApplicationQueryRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));


        return CircleDto.RegisterResponse.from(found);

    }

    @Transactional(readOnly = true)
    public List<CircleDto.RegisterResponse> getRegisterApplications(Long id, CircleUserDetails user) {
        List<RegisterApplication> found = registerApplicationQueryRepository.findAll();

        return found.stream()
                .map(CircleDto.RegisterResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void approveRegistration(Long id, CircleUserDetails user) {
        RegisterApplication found = registerApplicationRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        found.canApprovedBy(user);
        found.approve();

        makeApplicantAsMember(found);
    }

    @Transactional(readOnly = true)
    public List<CircleDto.RegisterResponse> findToApproves(CircleUserDetails user) {
        List<RegisterApplication> found = registerApplicationQueryRepository.findToApproveByUser(user);

        return found.stream()
                .map(CircleDto.RegisterResponse::from)
                .toList();
    }

    private void makeApplicantAsMember(RegisterApplication found) {
        FollowerId followerId = FollowerId.of(found.getCreatedBy(), found.getCircle());

        Optional<Follower> alreadyExisted = followerRepository.findById(followerId);

        if(alreadyExisted.isEmpty()) {
            Follower toSave = Follower.of(followerId, FollowerType.MEMBER);
            followerRepository.save(toSave);
        } else {
            alreadyExisted.get().setType(FollowerType.MEMBER);
        }
    }

    @Transactional(readOnly = true)
    public FollowerDto.Response findMemberedCircle(CircleUserDetails user) {

        Follower found = followerQueryRepository.findMemberedCircleByEmail(user.getEmail())
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        return FollowerDto.Response.from(found);
    }

    @Transactional(readOnly = true)
    public List<FollowerDto.Response> findMembersByCircleId(Long circleId) {
        List<Follower> founds = followerQueryRepository.findMembersByCircleId(circleId);

        return founds.stream()
                .map(FollowerDto.Response::from)
                .toList();
    }
}
