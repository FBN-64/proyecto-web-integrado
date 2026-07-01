package com.example.demo.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pacientes")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_paciente")
    private Integer idPaciente;

    @Column(length = 255, unique = true)
    private String dni;

    @Column(name = "tipo_documento", length = 255)
    private String tipoDocumento;

    @Column(length = 255)
    private String nombre;

    @Column(length = 255)
    private String apellido;

    @Column(name = "apellido_materno", length = 255)
    private String apellidoMaterno;

    @Column(length = 255)
    private String genero;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(length = 255)
    private String telefono;

    @Column(length = 255)
    private String email;
}