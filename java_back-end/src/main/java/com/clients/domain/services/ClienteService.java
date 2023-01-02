package com.clients.domain.services;

import com.clients.domain.models.AddressEntity;
import com.clients.domain.models.ClienteEntity;
import com.clients.domain.models.TelefoneEntity;
import com.clients.domain.repositories.ClienteRepository;
import com.clients.domain.repositories.TelefoneRepository;
import com.clients.exceptions.ObjNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository cliRepository;

    @Autowired
    private TelefoneRepository telRepository;

    public List<ClienteEntity> getAll(){
        return cliRepository.findAll();
    }

    public ClienteEntity getById(int id){
        return cliRepository.findById(id)
                .orElseThrow( () -> new ObjNotFoundException("Elemento com ID " + id +" não foi localizado"));
    }

    public List<ClienteEntity> getByEmail(String email){

        var resp = cliRepository.findByEmailContainsIgnoreCase(email);

        if(!resp.get().isEmpty()){
            return resp.get();
        }
        else {
            throw new ObjNotFoundException("Email " + email + " não foi localizado");
        }
    }

    public ClienteEntity create(ClienteEntity cliente){

        List<TelefoneEntity> listaTel = cliente.getListaTel();
        cliente.setActive(true);
        var resp = cliRepository.save(cliente);

        if(!listaTel.isEmpty()){

            listaTel.forEach(el ->{
                el.setId_cliente(resp.getId());
            });
            telRepository.saveAll(listaTel);
        }

        return resp;
    }

    public ClienteEntity update(int id, ClienteEntity cliente){

        Optional<ClienteEntity> opt = cliRepository.findById(id);

        if(opt.isPresent()){
            ClienteEntity cliUpdate = opt.get();
            AddressEntity cliAddress = cliente.getEndereco();
            AddressEntity addressUpdate = cliUpdate.getEndereco();

            // Atualização Endereço do cliente
            if(cliAddress != null){
                addressUpdate.setCep(cliAddress.getCep() != null ? cliAddress.getCep() : addressUpdate.getCep() );
                addressUpdate.setEndereco(cliAddress.getEndereco() != null ? cliAddress.getEndereco() : addressUpdate.getEndereco() );
                addressUpdate.setBairro(cliAddress.getBairro() != null ? cliAddress.getBairro() : addressUpdate.getBairro() );
                addressUpdate.setCidade(cliAddress.getCidade() != null ? cliAddress.getCidade() : addressUpdate.getCidade() );
                addressUpdate.setComplemento(cliAddress.getComplemento() != null ? cliAddress.getComplemento() : addressUpdate.getComplemento() );
            } else {
                addressUpdate = cliUpdate.getEndereco();
            }

            // Atualização do Cliente
            if(cliente != null){
                cliUpdate.setNome(cliente.getNome() != null ? cliente.getNome() : cliUpdate.getNome() );
                cliUpdate.setEmail(cliente.getEmail() != null ? cliente.getEmail() : cliUpdate.getEmail() );
                cliUpdate.setEndereco(addressUpdate);
                cliUpdate.setListaTel(cliente.getListaTel() != null ? cliente.getListaTel() : cliUpdate.getListaTel());
                cliUpdate.setActive(cliente.getActive());
                telRepository.deleteByIdCliente(id);
                telRepository.saveAll(cliUpdate.getListaTel());
            }

            var cliCreated = cliRepository.save(cliUpdate);

            cliUpdate.getListaTel().forEach(el -> {
                el.setId_cliente(cliCreated.getId());
            });
            telRepository.saveAll(cliUpdate.getListaTel());

            return cliCreated;
        } else {
            return null;
        }
    }

    public void delete(int id){

        Optional<ClienteEntity> opt = cliRepository.findById(id);

        if(opt.isPresent()){
            cliRepository.deleteById(id);
            telRepository.deleteByIdCliente(opt.get().getListaTel().get(0).getId_cliente());
        } else {
            throw new ObjNotFoundException("Elemento com ID " + id +" não foi localizado");
        }

    }
}
