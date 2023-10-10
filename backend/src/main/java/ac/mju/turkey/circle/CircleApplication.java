package ac.mju.turkey.circle;

import ac.mju.turkey.circle.system.auditor.CircleAuditorAware;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EnableJpaAuditing(auditorAwareRef = "circleAuditorAware")
public class CircleApplication {

	public static void main(String[] args) {
		SpringApplication.run(CircleApplication.class, args);
	}

}

