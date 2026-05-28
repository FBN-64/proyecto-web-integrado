package com.example.demo.controller;

import com.example.demo.model.Especialidad;
import com.example.demo.repository.EspecialidadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/especialidades")

public class Especialidadcontroller {

    @Autowired
    private EspecialidadRepository repo;

    @GetMapping
    public List<Especialidad> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Especialidad> obtener(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Especialidad crear(@RequestBody Especialidad e) {
        return repo.save(e);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Especialidad> actualizar(@PathVariable Integer id, @RequestBody Especialidad datos) {
        return repo.findById(id).map(e -> {
            e.setNombre(datos.getNombre());
            e.setDescripcion(datos.getDescripcion());
            e.setUrlIcono(datos.getUrlIcono());
            return ResponseEntity.ok(repo.save(e));
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