package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Cita;
import com.example.demo.repository.CitaRepository;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200") // Permite la conexión con tu frontend
public class CitaController {

    @Autowired
    private CitaRepository citaRepository;

    // Método para LISTAR todas las citas
    @GetMapping
    public List<Cita> listarTodas() {
        return citaRepository.findAll();
    }

    // Método para CREAR una nueva cita
    @PostMapping
    public Cita crearCita(@RequestBody Cita cita) {
        // Por defecto, toda cita nueva empieza en estado "Pendiente"
        if (cita.getEstado() == null || cita.getEstado().isEmpty()) {
            cita.setEstado("Pendiente");
        }
        return citaRepository.save(cita);
    }
}