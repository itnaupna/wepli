package com.bit.jwt;

import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private final JwtAuthenticationEntryPoint unauthorizedHandler;

	// 정적 자원에 대해서는 Security 설정을 적용하지 않음
	 @Override
	 public void configure(WebSecurity web) {
	 	web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
	 }

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		// (1) 교차출처 리소스 공유(CORS) 설정
		.cors() //(1)
		.and()
		// (2)  CSRF(Cross Site Request Forgery) 사이트 간 요청 위조 설정
		.csrf() //(2)
		.disable()
		// 인증, 허가 에러 시 공통적으로 처리해주는 부분
		.exceptionHandling() //(3)
		.authenticationEntryPoint(unauthorizedHandler)

		//(4) Spring Security에서 session을 생성하거나 사용하지 않도록 설정
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

		// UsernamePasswordAuthenticationFilter보다 JwtAuthenticationFilter를 먼저 수행
		.and()
		.addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
		.authorizeRequests() // (5)

		// 인증 제외 url
		.antMatchers("/").permitAll()
		.antMatchers("/api/test").permitAll() // 
		.antMatchers("/api/**").permitAll() // 
        .antMatchers("/stage").permitAll()   // url 임시
        .antMatchers("/stage/room").permitAll()  // url 임시
        .antMatchers("/playlist").permitAll()  // url 임시
        .antMatchers("/playlist/detail").permitAll()  // url 임시
        .antMatchers("/api/lv0/**").hasRole("auth2") // auth2
        .antMatchers("/api/**/lv2/**").hasRole("auth2") // auth2
		 
		// 그 외 인증 필요
		.antMatchers("/**")
		.authenticated()

		// 시큐리티는 기본적으로 세션을 사용
		// 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	
	};

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		// 허용된 도메인
		configuration.addAllowedOrigin("*");
		// 허용된 HTTP 메서드
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
		configuration.addAllowedHeader("*");
		// 자격 증명 허용
		configuration.setAllowCredentials(true);
		// 사전 검증 요청의 유효 기간 (60분)
		configuration.setMaxAge(3600L);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}


	//비밀번호 암호화를 위한 Encoder 설정
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	
	
   
//    @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

//         http.csrf().disable().authorizeRequests()

//                 // 리소스 항목 제외
//                 .antMatchers("/static/**").permitAll()
// 				.antMatchers("/favicon.ico").permitAll()

//                 // 사용자 로그인 spring security 적용 제외 항목
//                 .antMatchers("/").permitAll()
//             	.antMatchers("/stage").permitAll()   // 임시
//             	.antMatchers("/stage/room").permitAll()  // 임시
//             	.antMatchers("/playlist").permitAll()  // 임시
//             	.antMatchers("/playlist/detail").permitAll()  // 임시
//             	.antMatchers("**/a2/**").hasRole("auth2") // auth2 문자 or 이메일 인증을 받은 사람만 허용가능 api

//                 // 그 외 항목 전부 인증 적용
//                 .anyRequest()
//                 .authenticated()
//                 .and()

//             	// 로그인하는 경우에 대해 설정
//             	.formLogin()
//                 	// 로그인 페이지를 제공하는 URL을 설정
//                 	.loginPage("/member/")
//                 	// 로그인 성공 URL을 설정
//                 	.successForwardUrl("/")
//                 	// 로그인 실패 URL을 설정
//                 	.failureForwardUrl("/login")
//                 	.permitAll()
//                 	.and()
//             	// 로그아웃 관련 처리
//             	.logout()
//                 	.logoutUrl("/logout")
//                 	.logoutSuccessUrl("/")
//                 	.invalidateHttpSession(true)
//                 	.deleteCookies("JSESSIONID")

//                 // exception 처리
// 				.and()
// 				.exceptionHandling()
// 				.authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증되지 않은 사용자 접근 시
		
// 				// Spring Security에서 session을 생성하거나 사용하지 않도록 설정
// 				.and()
// 				.sessionManagement()
// 				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		
// 				// JWT filter 적용
// 				.and()
// 				.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


//         return http.build();
//     }

    
}
 