package com.example.demo.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "citas")
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Para simplificar, guardaremos el nombre del paciente directamente aquí.
    // Más adelante, si la profesora lo pide, esto podría ser otra relación @ManyToOne a una tabla "Paciente".
    @Column(name = "nombre_paciente", nullable = false, length = 150)
    private String nombrePaciente;

    @Column(nullable = false)
    private LocalDate fecha; // Formato: AAAA-MM-DD

    @Column(nullable = false)
    private LocalTime hora; // Formato: HH:MM:SS

    @Column(length = 50)
    private String estado; // Ejemplos: "Pendiente", "Atendida", "Cancelada"

    // La relación: Muchas citas (@ManyToOne) se asignan a un solo Médico
    @ManyToOne
    @JoinColumn(name = "medico_id", nullable = false)
    private Medico medico;
}