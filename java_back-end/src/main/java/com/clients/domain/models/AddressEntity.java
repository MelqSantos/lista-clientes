package com.clients.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

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
