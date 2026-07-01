package com.example.demo.controller;

import com.example.demo.model.Doctor;
import com.example.demo.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctores")
public class Doctorcontroller {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> listarTodos() {
        return doctorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> obtenerPorId(@PathVariable Integer id) {
        return doctorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/especialidad/{idEspecialidad}")
    public List<Doctor> porEspecialidad(@PathVariable Integer idEspecialidad) {
        return doctorRepository.findByEspecialidad_IdEspecialidad(idEspecialidad);
    }

    @PostMapping
    public Doctor crear(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> actualizar(@PathVariable Integer id, @RequestBody Doctor datos) {
        return doctorRepository.findById(id).map(doctor -> {
            doctor.setNombre(datos.getNombre());
            doctor.setApellido(datos.getApellido());
            doctor.setDni(datos.getDni());
            doctor.setTelefono(datos.getTelefono());
            doctor.setEmail(datos.getEmail());
            doctor.setEspecialidad(datos.getEspecialidad());
            doctor.setDescripcionCorta(datos.getDescripcionCorta());
            return ResponseEntity.ok(doctorRepository.save(doctor));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!doctorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        doctorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}