package com.clients.domain.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    @NotNull
    private List<TelefoneEntity> listaTel;

    @Column(name = "is_active")
    private Boolean active = true;
}
