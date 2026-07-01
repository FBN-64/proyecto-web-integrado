package com.example.demo.config;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner createDefaultAdmin(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            usuarioRepository.findByNombreUsuario("admin").orElseGet(() -> {
                Usuario usuario = new Usuario();
                usuario.setNombreUsuario("admin");
                usuario.setEmail("admin@madrezoraida.local");
                usuario.setPassword(passwordEncoder.encode("admin123"));
                usuario.setRol(Usuario.Rol.admin);
                return usuarioRepository.save(usuario);
            });
        };
    }
}