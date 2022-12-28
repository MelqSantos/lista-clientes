package com.clients.domain.repositories;

import com.clients.domain.models.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Integer> {

    public Optional<List<ClienteEntity>> findByEmailContainsIgnoreCase(String email);
}
