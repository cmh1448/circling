package ac.mju.turkey.circle.domain.auth.controller;

import ac.mju.turkey.circle.domain.auth.dto.AuthDto;
import ac.mju.turkey.circle.domain.auth.service.AuthService;
import ac.mju.turkey.circle.domain.user.dto.UserDto;
import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-in")
    public AuthDto.TokenResponse signIn(@RequestBody AuthDto.SignInRequest request) {
        return authService.signIn(request);
    }

    @PostMapping("/sign-up")
    public UserDto.UserResponse signUp(@RequestBody AuthDto.SignUpRequest request) {
        return authService.signUp(request);
    }

    @GetMapping("/auth-test")
    public UserDto.UserResponse test(@AuthenticationPrincipal CircleUserDetails userDetails) {
        return UserDto.UserResponse.from(userDetails);
    }
}
