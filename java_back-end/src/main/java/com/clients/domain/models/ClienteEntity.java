package com.clients.domain.models;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
@Table(name = "cliente")
public class ClienteEntity {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Column(name = "nm_cliente")
    private String nome;

    @NotBlank
    @Column(name = "nm_email")
    private String email;

    @Valid
    @NotNull
    @Embedded
    private AddressEntity endereco;

    @OneToMany(mappedBy = "id_cliente")
    private List<TelefoneEntity> listaTel;
}
