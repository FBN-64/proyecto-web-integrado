package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "especialidades")
public class Especialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_especialidad")
    private Integer idEspecialidad;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String descripcion;

    @Column(name = "url_icono", length = 255)
    private String urlIcono;
}