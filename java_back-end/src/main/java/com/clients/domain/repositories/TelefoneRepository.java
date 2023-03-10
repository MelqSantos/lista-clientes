package com.clients.domain.repositories;

import com.clients.domain.models.TelefoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TelefoneRepository extends JpaRepository<TelefoneEntity, Integer> {

    @Modifying
    @Transactional
    @Query(value = "delete from telefone where id_cliente = :id", nativeQuery = true)
    public void deleteByIdCliente(int id);
}
