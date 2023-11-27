package ac.mju.turkey.circle.system.configuration;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import redis.embedded.RedisServer;

@Configuration
@Profile("local")
public class LocalRedisConfig {
    public LocalRedisConfig(@Value("${spring.redis.source.port}") int redisPort) {
        this.redisServer = new RedisServer(redisPort);
    }
    private final RedisServer redisServer;

    @PostConstruct
    public void startRedis() {
        redisServer.start();
    }

    @PreDestroy
    public void stopRedis() {
        redisServer.stop();
    }
}
