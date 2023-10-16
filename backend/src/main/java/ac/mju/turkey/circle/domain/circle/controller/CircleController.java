package ac.mju.turkey.circle.domain.circle.controller;

import ac.mju.turkey.circle.domain.circle.dto.CircleDto;
import ac.mju.turkey.circle.domain.circle.dto.FollowerDto;
import ac.mju.turkey.circle.domain.circle.service.CircleService;
import ac.mju.turkey.circle.domain.circle.service.FollowService;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/circles")
public class CircleController {
    private final CircleService circleService;
    private final FollowService followService;

    @GetMapping
    public List<CircleDto.DetailResponse> findAll() {
        return circleService.findAll();
    }

    @GetMapping("/{id}")
    public CircleDto.DetailResponse findById(@PathVariable Long id) {
        return circleService.findById(id);
    }

    @PostMapping
    public CircleDto.Response create(@RequestBody CircleDto.Request request) {
        return circleService.createCircle(request);
    }

    @PatchMapping("/{id}")
    public CircleDto.Response updateById(@PathVariable Long id, @RequestBody CircleDto.Request request) {
        return circleService.updateById(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        circleService.deleteById(id);
    }

    @PostMapping("/{id}/follow")
    public FollowerDto.Response follow(@PathVariable Long id, @AuthenticationPrincipal CircleUserDetails user) {
        return followService.follow(id, user);
    }

    @PostMapping("/{id}/unfollow")
    public void unfollow(@PathVariable Long id, @AuthenticationPrincipal CircleUserDetails user) {
        followService.unfollow(id, user);
    }

    @GetMapping("/my/followed")
    public List<FollowerDto.Response> findFollowedCircles(@AuthenticationPrincipal CircleUserDetails user) {
        return followService.findFollowedCircles(user);
    }
}
