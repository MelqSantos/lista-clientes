package com.clients.domain.repositories;

import com.clients.domain.models.TelefoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TelefoneRepository extends JpaRepository<TelefoneEntity, Integer> {
}
