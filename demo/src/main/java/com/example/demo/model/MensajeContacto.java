package com.example.demo.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "mensajes_contacto")
public class MensajeContacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje")
    private Integer idMensaje;

    @Column(name = "nombre_completo", length = 255)
    private String nombreCompleto;

    @Column(length = 255)
    private String email;

    @Column(length = 255)
    private String telefono;

    @Column(name = "motivo_consulta", length = 255)
    private String motivoConsulta;

    @Column(length = 255)
    private String mensaje;

    @Column(name = "fecha_recibido")
    private LocalDateTime fechaRecibido;

    @Column(nullable = false)
    private Boolean leido = false;
}
