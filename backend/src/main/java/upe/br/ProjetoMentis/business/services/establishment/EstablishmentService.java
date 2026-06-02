package upe.br.ProjetoMentis.business.services.establishment;

import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentCreateDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentEditDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentResponseDto;

import java.util.List;
import java.util.UUID;

public interface EstablishmentService {

    EstablismentResponseDto createEstablishment(EstablismentCreateDto establishment);

    EstablismentResponseDto editEstablishment(EstablismentEditDto establishment);

    EstablismentResponseDto findById(UUID id);

    List<EstablismentResponseDto> findAll();

    void delete(UUID id);
}