package com.example.demo.controller;

import com.example.demo.model.Horario;
import com.example.demo.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/horarios")
public class Horariocontroller {

    @Autowired
    private HorarioRepository repo;

    @GetMapping
    public List<Horario> listar() {
        return repo.findAll();
    }

    @GetMapping("/doctor/{idDoctor}")
    public List<Horario> porDoctor(@PathVariable Integer idDoctor) {
        return repo.findByDoctor_IdDoctor(idDoctor);
    }

    @PostMapping
    public Horario crear(@RequestBody Horario h) {
        return repo.save(h);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}