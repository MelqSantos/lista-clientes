package com.clients.controllers;

import com.clients.domain.models.ClienteEntity;
import com.clients.domain.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping
    public ResponseEntity<List<ClienteEntity>> getAll(){
        return ResponseEntity.ok().body(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteEntity> getById(@PathVariable int id){
        return ResponseEntity.ok().body(service.getById(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<ClienteEntity>> getByEmail(@PathVariable String email){
        return ResponseEntity.ok().body(service.getByEmail(email));
    }

    @PostMapping
    public ResponseEntity<ClienteEntity> create(@RequestBody ClienteEntity cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(cliente));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClienteEntity> update(@RequestBody ClienteEntity cliente, @PathVariable int id){
        return ResponseEntity.ok().body(service.update(id, cliente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id){
        service.delete(id);

        return ResponseEntity.ok().build();
    }




}
