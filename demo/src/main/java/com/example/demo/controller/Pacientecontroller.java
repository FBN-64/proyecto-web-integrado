package com.example.demo.controller;

import com.example.demo.model.Paciente;
import com.example.demo.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class Pacientecontroller {

    @Autowired
    private PacienteRepository repo;

    @GetMapping
    public List<Paciente> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> obtener(@PathVariable Integer id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Paciente crear(@RequestBody Paciente p) {
        return repo.save(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizar(@PathVariable Integer id, @RequestBody Paciente datos) {
        return repo.findById(id).map(p -> {
            p.setNombre(datos.getNombre());
            p.setApellido(datos.getApellido());
            p.setApellidoMaterno(datos.getApellidoMaterno());
            p.setDni(datos.getDni());
            p.setTipoDocumento(datos.getTipoDocumento());
            p.setGenero(datos.getGenero());
            p.setFechaNacimiento(datos.getFechaNacimiento());
            p.setTelefono(datos.getTelefono());
            p.setEmail(datos.getEmail());
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
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