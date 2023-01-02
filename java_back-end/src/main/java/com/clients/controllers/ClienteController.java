package com.clients.controllers;

import com.clients.domain.models.ClienteEntity;
import com.clients.domain.services.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*")
@RequestMapping("/clients")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping
    @Operation(summary = "Listar todos os clientes", description = "Retorna todos os clientes")
    public ResponseEntity<List<ClienteEntity>> getAll(){
        return ResponseEntity.ok().body(service.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Listar cliente por ID", description = "Retorna um cliente pelo identificador")
    public ResponseEntity<ClienteEntity> getById(@PathVariable int id){
        return ResponseEntity.ok().body(service.getById(id));
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Listar cliente por email", description = "Retorna um ou mais clientes pelo email")
    public ResponseEntity<List<ClienteEntity>> getByEmail(@PathVariable String email){
        return ResponseEntity.ok().body(service.getByEmail(email));
    }

    @PostMapping
    @Operation(summary = "Adicionar um novo cliente", description = "Adiciona um novo cliente")
    public ResponseEntity<ClienteEntity> create(@Valid @RequestBody ClienteEntity cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(cliente));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Editar um cliente", description = "Edita um cliente existente")
    public ResponseEntity<ClienteEntity> update(@RequestBody ClienteEntity cliente, @PathVariable int id){
        return ResponseEntity.ok().body(service.update(id, cliente));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um cliente", description = "Deleta um cliente existente")
    public ResponseEntity<Void> delete(@PathVariable int id){
        service.delete(id);

        return ResponseEntity.ok().build();
    }




}
