package com.aoo.hotelbookingproect.authservice.service;


import com.aoo.hotelbookingproect.authservice.entity.CustomUserDetails;
import com.aoo.hotelbookingproect.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

                var user = userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException(" User Not Found "));
                return new CustomUserDetails(user);
            }
        };
    }
}
