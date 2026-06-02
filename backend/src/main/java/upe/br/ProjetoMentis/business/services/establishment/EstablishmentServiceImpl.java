package upe.br.ProjetoMentis.business.services.establishment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentCreateDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentEditDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentResponseDto;
import upe.br.ProjetoMentis.infra.entities.Establishment;
import upe.br.ProjetoMentis.infra.repositories.EstablishmentRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EstablishmentServiceImpl implements EstablishmentService {

    private final EstablishmentRepository establishmentRepository;

    @Override
    public EstablismentResponseDto createEstablishment(
            EstablismentCreateDto dto) {

        Establishment establishment = new Establishment();

        establishment.setEstablishmentName(dto.establishmentName());
        establishment.setCnes(dto.cnes());
        establishment.setCity(dto.city());
        establishment.setUf(dto.uf());

        Establishment saved = establishmentRepository.save(establishment);

        return EstablismentResponseDto.toDto(saved);
    }

    @Override
    public EstablismentResponseDto editEstablishment(
            EstablismentEditDto dto) {

        Establishment establishment = establishmentRepository
                .findById(dto.id())
                .orElseThrow(() ->
                        new RuntimeException("Estabelecimento não encontrado"));

        establishment.setEstablishmentName(dto.establishmentName());
        establishment.setCnes(dto.cnes());
        establishment.setCity(dto.city());
        establishment.setUf(dto.uf());

        Establishment updated = establishmentRepository.save(establishment);

        return EstablismentResponseDto.toDto(updated);
    }

    @Override
    public EstablismentResponseDto findById(UUID id) {

        Establishment establishment = establishmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Estabelecimento não encontrado"));

        return EstablismentResponseDto.toDto(establishment);
    }

    @Override
    public List<EstablismentResponseDto> findAll() {

        return establishmentRepository.findAll()
                .stream()
                .map(EstablismentResponseDto::toDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {

        Establishment establishment = establishmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Estabelecimento não encontrado"));

        establishmentRepository.delete(establishment);
    }
}