package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "doctores")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_doctor")
    private Integer idDoctor;

    @Column(length = 255)
    private String dni;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String apellido;

    @ManyToOne
    @JoinColumn(name = "id_especialidad")
    private Especialidad especialidad;

    // Campo redundante en la BD, lo mantenemos por compatibilidad
    @Column(length = 255)
    private String especialidadNombre;

    @Column(length = 255)
    private String telefono;

    @Column(length = 255)
    private String email;

    @Column(name = "descripcion_corta", length = 255)
    private String descripcionCorta;

    @Column(length = 255)
    private String biografia;

    @Column(name = "url_imagen", length = 255)
    private String urlImagen;
}