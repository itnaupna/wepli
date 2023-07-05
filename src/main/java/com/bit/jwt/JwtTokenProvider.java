package com.bit.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.bit.dto.TokenDto;
import com.bit.service.TokenService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider {
    
    private static String secret = "wepli";

    // 30 분
    public static final long JWT_TOKEN_VALIDITY = 1000 * 60 * 30;

    // token으로 사용자 id(nick) 조회
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getId);
    }

    // token으로 사용자 속성정보 조회
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
	    final Claims claims = getAllClaimsFromToken(token);
	    return claimsResolver.apply(claims);
	}

    // 모든 token에 대한 사용자 속성정보 조회
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

    // 토큰 만료일자 조회
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

    // nick을 입력받아 accessToken 생성
	public String generateAccessToken(String nick) {
		return generateAccessToken(nick, new HashMap<>());
	}

    // nick, 속성정보를 이용해 accessToken 생성
	public String generateAccessToken(String nick, Map<String, Object> claims) {
		return doGenerateAccessToken(nick, claims);
	}

    // JWT accessToken 생성
	private String doGenerateAccessToken(String nick, Map<String, Object> claims) {
		String accessToken = Jwts.builder()
				.setClaims(claims)
				.setId(nick)
				.setIssuedAt(new Date(System.currentTimeMillis()))
                //access 토큰 유효기한 30분
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		
		return accessToken;
	}

    // nick을 입력받아 refreshToken 생성
	public String generateRefreshToken(String nick) {
		return doGenerateRefreshToken(nick);
	}
	
	// JWT refreshToken 생성
	private String doGenerateRefreshToken(String nick) {
		String refreshToken = Jwts.builder()
				.setId(nick)
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 2 * 24)) // 24시간
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		
		return refreshToken;
	}
    
    // nick을 입력받아 accessToken, refreshToken 생성
	public Map<String, String> generateTokenSet(String nick) {
		return generateTokenSet(nick, new HashMap<>());
	}
	
	// nick, 속성정보를 이용해 accessToken, refreshToken 생성
	public Map<String, String> generateTokenSet(String nick, Map<String, Object> claims) {
		return doGenerateTokenSet(nick, claims);
	}
	
	// JWT accessToken, refreshToken 생성
	private Map<String, String> doGenerateTokenSet(String nick, Map<String, Object> claims) {
		Map<String, String> tokens = new HashMap<String, String>();
		
		String accessToken = Jwts.builder()
				.setClaims(claims)
				.setId(nick)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))// 30분
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		
		String refreshToken = Jwts.builder()
				.setId(nick)
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 2 * 24)) // 24시간
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		
		tokens.put("accessToken", accessToken);
		tokens.put("refreshToken", refreshToken);
		return tokens;
	}

    // JWT refreshToken 만료체크 후 재발급
	public Boolean reGenerateRefreshToken(String nick) throws Exception {
		log.info("[reGenerateRefreshToken] refreshToken 재발급 요청");
		
		// DB에서 refreshToken 정보 조회
        TokenService tokenService = new TokenService();
        TokenDto tDto = tokenService.getToken(nick);
		// ... DB 조회 부분
		
		// refreshToken 정보가 존재하지 않는 경우
		if(tDto == null) {
			log.info("[reGenerateRefreshToken] refreshToken 정보가 존재하지 않습니다.");
			return false;
		}
		
		// refreshToken 만료 여부 체크
		try {
			String refreshToken = tDto.getToken().substring(7);
			Jwts.parser().setSigningKey(secret).parseClaimsJws(refreshToken);
			log.info("[reGenerateRefreshToken] refreshToken이 만료되지 않았습니다.");
			return true;
		} catch(ExpiredJwtException e) { // refreshToken이 만료된 경우 재발급
			tDto.setToken("Bearer " + generateRefreshToken(nick));
			// DB에서 refreshToken 정보 수정
            tokenService.updateToken(nick, tDto.getToken());
			log.info("[reGenerateRefreshToken] refreshToken 재발급 완료 : {}", "Bearer " + generateRefreshToken(nick));
			return true;
		} catch(Exception e) { // 그 외 예외처리
			log.error("[reGenerateRefreshToken] refreshToken 재발급 중 문제 발생 : {}", e.getMessage());
			return false;
		}
	}

    // 토근 검증
	public Boolean validateToken(String token, Map<String, Object> auth) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return true;
		} catch (SignatureException e) {
			log.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			log.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			log.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			log.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}
}
