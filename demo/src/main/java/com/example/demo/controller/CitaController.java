package com.example.demo.controller;

import com.example.demo.model.Cita;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/citas")
public class CitaController {

    // LISTAR TODAS LAS CITAS
    @GetMapping
    public List<Cita> listarCitas() {

        List<Cita> citas = new ArrayList<>();

        citas.add(new Cita(
                1,
                "Juan Perez",
                "Dr. Carlos Ruiz",
                "2026-05-24",
                "10:00 AM"
        ));

        citas.add(new Cita(
                2,
                "Maria Lopez",
                "Dra. Ana Torres",
                "2026-05-25",
                "11:30 AM"
        ));

        citas.add(new Cita(
                3,
                "Carlos Mendoza",
                "Dr. Luis Ramos",
                "2026-05-26",
                "03:00 PM"
        ));

        return citas;
    }

    // OBTENER CITA POR ID
    @GetMapping("/{id}")
    public Cita obtenerCitaPorId(@PathVariable int id) {

        return new Cita(
                id,
                "Juan Perez",
                "Dr. Carlos Ruiz",
                "2026-05-24",
                "10:00 AM"
        );
    }

    // REGISTRAR CITA
    @PostMapping
    public String registrarCita() {

        return "Cita registrada correctamente";
    }

    // ACTUALIZAR CITA
    @PutMapping("/{id}")
    public String actualizarCita(@PathVariable int id) {

        return "Cita actualizada: " + id;
    }

    // ELIMINAR CITA
    @DeleteMapping("/{id}")
    public String eliminarCita(@PathVariable int id) {

        return "Cita eliminada: " + id;
    }
}