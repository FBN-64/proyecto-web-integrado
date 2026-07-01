package com.example.demo.controller;

import com.example.demo.model.MensajeContacto;
import com.example.demo.repository.MensajeContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
public class Mensajecontactocontroller {

    @Autowired
    private MensajeContactoRepository repo;

    @GetMapping
    public List<MensajeContacto> listar() {
        return repo.findAll();
    }

    @PostMapping
    public MensajeContacto crear(@RequestBody MensajeContacto m) {
        m.setFechaRecibido(LocalDateTime.now());
        m.setLeido(false);
        return repo.save(m);
    }

    @PutMapping("/{id}/leido")
    public ResponseEntity<MensajeContacto> marcarLeido(@PathVariable Integer id) {
        return repo.findById(id).map(m -> {
            m.setLeido(true);
            return ResponseEntity.ok(repo.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }
}