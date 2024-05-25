package com.aoo.hotelbookingproect.authservice.config;

import com.aoo.hotelbookingproect.authservice.entity.EnumRole;
import com.aoo.hotelbookingproect.authservice.entity.User;
import com.aoo.hotelbookingproect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
    private final PasswordEncoder passwordEncoder;
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository){
        User admin1 = User.builder()
                .firstName("admin1")
                .lastName("aoo")
                .email("admin1@gmail.com")
                .role(EnumRole.ADMIN)
                .password(passwordEncoder.encode("admin1"))
                .build();

        User admin2 = User.builder()
                .firstName("admin2")
                .lastName("aoo")
                .role(EnumRole.ADMIN)
                .email("admin2@gmail.com")
                .password(passwordEncoder.encode("admin2"))
                .build();

        return args -> {
            log.info("Preloading " + userRepository.save(admin1));
            log.info("Preloading " + userRepository.save(admin2));
        };
    }
}
