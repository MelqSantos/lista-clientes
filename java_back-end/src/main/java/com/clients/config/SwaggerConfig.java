package com.clients.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.responses.ApiResponse;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI springShopOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Lista de clientes")
                        .description("Sistema para controle de clientes.")
                        .version("v0.0.1")
                        .license(new License()
                                .name("Autor: Melqui Santos")
                                .url("https://linkedin.com/in/melquisedec-santos")))
                .externalDocs(new ExternalDocumentation()
                        .description("Github repo")
                        .url("https://github.com/MelqSantos/lista-clientes"));
    }

    private ApiResponse createApiResponse(String message) {

        return new ApiResponse().description(message);

    }

}
