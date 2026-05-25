package com.example.demo;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.model.Cita;
import com.example.demo.model.Especialidad;
import com.example.demo.model.Medico;
import com.example.demo.repository.CitaRepository;
import com.example.demo.repository.EspecialidadRepository;
import com.example.demo.repository.MedicoRepository;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    // Este bloque de código se ejecuta automáticamente apenas levantas el backend
    @Bean
    public CommandLineRunner cargarDatos(EspecialidadRepository espRepo, MedicoRepository medRepo, CitaRepository citaRepo) {
        return args -> {
            // Solo insertamos datos si la tabla de especialidades está vacía (count == 0)
            if (espRepo.count() == 0) {
                
                // 1. Creamos una Especialidad
                Especialidad esp1 = new Especialidad();
                esp1.setNombre("Cardiología");
                esp1.setDescripcion("Especialistas del corazón");
                espRepo.save(esp1); // Guardamos en MySQL

                // 2. Creamos un Médico y le asignamos la especialidad
                Medico med1 = new Medico();
                med1.setNombre("Gregory");
                med1.setApellidos("House");
                med1.setTelefono("987654321");
                med1.setEspecialidad(esp1); // Aquí se hace la relación
                medRepo.save(med1); // Guardamos en MySQL

                // 3. Creamos una Cita y le asignamos al médico
                Cita cita1 = new Cita();
                cita1.setNombrePaciente("Juan Pérez");
                cita1.setFecha(LocalDate.of(2026, 5, 26)); // Fecha de mañana
                cita1.setHora(LocalTime.of(10, 30)); // 10:30 AM
                cita1.setMedico(med1);
                cita1.setEstado("Pendiente");
                citaRepo.save(cita1); // Guardamos en MySQL

                System.out.println("-------------------------------------------------");
                System.out.println("¡DATOS DE PRUEBA INSERTADOS CON ÉXITO EN MYSQL!");
                System.out.println("-------------------------------------------------");
            }
        };
    }
}