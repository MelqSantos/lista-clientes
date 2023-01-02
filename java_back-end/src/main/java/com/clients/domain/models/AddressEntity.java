package com.clients.domain.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

@Data
@Embeddable
public class AddressEntity {

    @NotBlank
    @Column(name = "nr_cep")
    private String cep;

    @NotBlank
    @Column(name = "nm_endereco")
    private String endereco;

    @NotBlank
    @Column(name = "nm_bairro")
    private String bairro;

    @Column(name = "nm_complemento")
    private String complemento;

    @NotBlank
    @Column(name = "nm_cidade")
    private String cidade;
}
