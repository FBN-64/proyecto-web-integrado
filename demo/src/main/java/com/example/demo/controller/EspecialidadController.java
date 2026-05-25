package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Especialidad;
import com.example.demo.repository.EspecialidadRepository;

@RestController
@RequestMapping("/api/especialidades")
@CrossOrigin(origins = "http://localhost:4200") // Permite que tu frontend Angular se conecte
public class EspecialidadController {

    @Autowired
    private EspecialidadRepository especialidadRepository; // Traemos nuestro DAO

    // Método para LISTAR todas las especialidades
    @GetMapping
    public List<Especialidad> listarTodas() {
        return especialidadRepository.findAll();
    }

    // Método para CREAR una nueva especialidad
    @PostMapping
    public Especialidad crearEspecialidad(@RequestBody Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }
}