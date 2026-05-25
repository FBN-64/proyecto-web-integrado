package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Medico;
import com.example.demo.repository.MedicoRepository;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "http://localhost:4200") // Permite la conexión con Angular
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;

    // Método para LISTAR todos los médicos
    @GetMapping
    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    // Método para CREAR un nuevo médico
    @PostMapping
    public Medico crearMedico(@RequestBody Medico medico) {
        return medicoRepository.save(medico);
    }
}
