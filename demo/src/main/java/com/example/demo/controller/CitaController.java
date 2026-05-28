package com.example.demo.controller;

import com.example.demo.model.Cita;
import com.example.demo.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/citas")

public class CitaController {

    @Autowired
    private CitaRepository repo;

    @GetMapping
    public List<Cita> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtener(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<Cita> porPaciente(@PathVariable Integer idPaciente) {
        return repo.findByPaciente_IdPaciente(idPaciente);
    }

    @GetMapping("/doctor/{idDoctor}")
    public List<Cita> porDoctor(@PathVariable Integer idDoctor) {
        return repo.findByDoctor_IdDoctor(idDoctor);
    }

    @PostMapping
    public Cita crear(@RequestBody Cita c) {
        if (c.getEstado() == null || c.getEstado().isEmpty())
            c.setEstado("confirmada");
        return repo.save(c);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cita> actualizar(@PathVariable Integer id, @RequestBody Cita datos) {
        return repo.findById(id).map(c -> {
            c.setPaciente(datos.getPaciente());
            c.setDoctor(datos.getDoctor());
            c.setFechaCita(datos.getFechaCita());
            c.setHoraInicio(datos.getHoraInicio());
            c.setEstado(datos.getEstado());
            return ResponseEntity.ok(repo.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!repo.existsById(id))
            return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}