package com.example.demo.repository;

import com.example.demo.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Integer> {
    List<Cita> findByPaciente_IdPaciente(Integer idPaciente);

    List<Cita> findByDoctor_IdDoctor(Integer idDoctor);
}