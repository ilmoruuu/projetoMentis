package upe.br.ProjetoMentis.business.services.action;

import upe.br.ProjetoMentis.controller.dtos.action.*;

import java.util.List;
import java.util.UUID;

public interface ActionService {

    ActionResponseDto createAction(CreateActionDto dto);

    ActionResponseDto updateAction(UpdateActionDto dto);

    ActionResponseDto findById(UUID id);

    List<ActionResponseDto> findAll();

    List<ActionResponseDto> findByPatient(UUID patientId);

    void delete(UUID id);
}