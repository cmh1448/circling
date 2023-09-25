package ac.mju.turkey.circle.system.security.util;

import ac.mju.turkey.circle.system.security.model.CircleUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

public class JwtUtil {
    private static final String secret = "secret";
    private static String generateToken(CircleUserDetails token) {
        Claims claims = Jwts.claims().setSubject(token.getEmail());
        claims.setIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        claims.setExpiration(Date.from(LocalDateTime.now().plusDays(1).atZone(ZoneId.systemDefault()).toInstant()));

        return Jwts.builder()
                .setClaims(claims)
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();

    }

    private static String getEmailFromToken(String token) {
       return getClaimFromToken(token, Claims::getId);
    }

    private static Date getExpirationFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }


    public static <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    public static Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .build().parseClaimsJws(token)
                .getBody();

    }

    public static Boolean isTokenExpired(String token) {
        Date expiration = getExpirationFromToken(token);
        return expiration.before(new Date());
    }
}
