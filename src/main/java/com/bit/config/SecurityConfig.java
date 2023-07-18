package com.bit.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.AntPathMatcher;

import com.bit.jwt.JwtAuthenticationEntryPoint;
import com.bit.jwt.JwtRequestFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // 인증되지 않은 사용자 접근에 대한 handler
    @Autowired 
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    // JWT 요청 처리 필터
	@Autowired 
    private JwtRequestFilter jwtRequestFilter;

    // 정적 자원에 대한 Security 설정 적용 x
    // @Bean
    // public WebSecurityCustomizer configure() { 
    //     return (web) -> web.ignoring()
    //         .antMatchers("/resources/**")
    //         .antMatchers("/css/**")
    //         .antMatchers("/js/**")
    //         .antMatchers("/favicon*/**")
    //         .antMatchers("/img/**");
    // }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
                .requestMatchers(new AntPathRequestMatcher("/**")).permitAll())
        ;
        return http.build();

        // http.cors().and().csrf().disable() // csrf 보안 비활성화
        //     .antMatcher("/**").authorizeRequests()

        //     .antMatchers("/api/test", "/api/lv0/**").permitAll()
        //     .antMatchers("/api/lv2/**").hasRole("auth2") // auth2 문자 or 이메일 인증을 받은 사람만 허용가능 api

        //     // 위에 해당하지 않는 url은 security 인증 적용
        //     .anyRequest()
        //     .authenticated()

        //     // exception 처리
        //     .and()
        //     .exceptionHandling() // 인증되지 않은 사용자 접근시
        //         .authenticationEntryPoint(jwtAuthenticationEntryPoint)

        //     // Spring Security에서 session을 생성하거나 사용하지 않도록 설정
        //     .and()
        //     .sessionManagement()
        //         .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    
        //     // JWT filter 적용
        //     .and()
        //     .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        // return http.build();
    }
}
