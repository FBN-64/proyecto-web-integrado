package com.example.demo.controller;

import com.example.demo.model.Doctor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/doctores")
public class DoctorController {

    // LISTAR DOCTORES
    @GetMapping
    public List<Doctor> listarDoctores() {

        List<Doctor> doctores = new ArrayList<>();

        doctores.add(new Doctor(
                1,
                "Carlos Ruiz",
                "Pediatria"
        ));

        doctores.add(new Doctor(
                2,
                "Ana Torres",
                "Cardiologia"
        ));

        doctores.add(new Doctor(
                3,
                "Luis Ramos",
                "Dermatologia"
        ));

        return doctores;
    }

    // OBTENER DOCTOR POR ID
    @GetMapping("/{id}")
    public Doctor obtenerDoctor(@PathVariable int id) {

        return new Doctor(
                id,
                "Carlos Ruiz",
                "Pediatria"
        );
    }

    // REGISTRAR DOCTOR
    @PostMapping
    public String registrarDoctor() {

        return "Doctor registrado correctamente";
    }

    // ACTUALIZAR DOCTOR
    @PutMapping("/{id}")
    public String actualizarDoctor(@PathVariable int id) {

        return "Doctor actualizado: " + id;
    }

    // ELIMINAR DOCTOR
    @DeleteMapping("/{id}")
    public String eliminarDoctor(@PathVariable int id) {

        return "Doctor eliminado: " + id;
    }
}