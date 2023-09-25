package ac.mju.turkey.circle.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/test")
@RequiredArgsConstructor
public class TestController {

    @GetMapping("")
    public String test() {
        return "Hello World!";
    }
}
