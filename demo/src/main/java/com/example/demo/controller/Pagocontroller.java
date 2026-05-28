package com.example.demo.controller;

import com.example.demo.model.Pago;
import com.example.demo.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class Pagocontroller {

    @Autowired
    private PagoRepository repo;

    @GetMapping
    public List<Pago> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtener(@PathVariable Integer id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pago crear(@RequestBody Pago p) {
        return repo.save(p);
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