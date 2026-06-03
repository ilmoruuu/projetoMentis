package upe.br.ProjetoMentis.business.services.establishment;

import upe.br.ProjetoMentis.controller.dtos.establishment.CreateEstablismentDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.UpdateEstablismentDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentResponseDto;

import java.util.List;
import java.util.UUID;

public interface EstablishmentService {

    EstablismentResponseDto createEstablishment(CreateEstablismentDto establishment);

    EstablismentResponseDto updateEstablishment(UUID id, UpdateEstablismentDto dto);

    EstablismentResponseDto findById(UUID id);

    List<EstablismentResponseDto> findAll();

    void delete(UUID id);
}