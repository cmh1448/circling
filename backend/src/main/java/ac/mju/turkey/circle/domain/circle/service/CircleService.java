package ac.mju.turkey.circle.domain.circle.service;

import ac.mju.turkey.circle.domain.circle.dto.CircleDto;
import ac.mju.turkey.circle.domain.circle.dto.FollowerDto;
import ac.mju.turkey.circle.domain.circle.entity.Circle;
import ac.mju.turkey.circle.domain.circle.entity.CircleMemberRegister;
import ac.mju.turkey.circle.domain.circle.entity.Follower;
import ac.mju.turkey.circle.domain.circle.entity.embedded.FollowerId;
import ac.mju.turkey.circle.domain.circle.entity.enums.FollowerType;
import ac.mju.turkey.circle.domain.circle.repository.*;
import ac.mju.turkey.circle.system.exception.model.ErrorCode;
import ac.mju.turkey.circle.system.exception.model.RestException;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CircleService {
    private final CircleRepository circleRepository;
    private final CircleQueryRepository circleQueryRepository;
    private final FollowerRepository followerRepository;
    private final FollowerQueryRepository followerQueryRepository;
    private final CircleMemberRegisterRepository circleMemberRegisterRepository;

    @Transactional
    public CircleDto.Response createCircle(CircleDto.Request request) {
        Circle toSave = request.toEntity();

        Circle saved = circleRepository.save(toSave);

        return CircleDto.Response.from(saved);
    }

    @Transactional
    public CircleDto.Response updateById(Long id, CircleDto.Request request) {
        Circle found = circleRepository.findById(id)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        if(Objects.nonNull(request.getName()))
            found.setName(request.getName());

        if(Objects.nonNull(request.getDescription()))
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
    public CircleDto.Response registerMember(Long circleId, CircleUserDetails user, CircleDto.Request requestDto) {
        Circle foundCircle = circleRepository.findById(circleId)
                .orElseThrow(() -> new RestException(ErrorCode.GLOBAL_NOT_FOUND));

        CircleMemberRegister register = CircleMemberRegister.builder()
                .circle(foundCircle)
                .message(requestDto.getMessage())
                .build();

        circleMemberRegisterRepository.save(register);  // 신청 정보 저장

        return CircleDto.Response.from(foundCircle);
    }

}
