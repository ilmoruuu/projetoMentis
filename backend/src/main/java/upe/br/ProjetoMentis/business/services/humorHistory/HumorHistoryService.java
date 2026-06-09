package upe.br.ProjetoMentis.business.services.humorHistory;

import upe.br.ProjetoMentis.controller.dtos.humorHistory.CreateHumorHistoryDto;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.HumorHistoryResponseDto;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.UpdateHumorHistoryDto;

import java.util.List;
import java.util.UUID;

public interface HumorHistoryService {

    HumorHistoryResponseDto createHumorHistory(CreateHumorHistoryDto dto);

    HumorHistoryResponseDto updateHumorHistory(UpdateHumorHistoryDto dto);

    HumorHistoryResponseDto findById(UUID id);

    List<HumorHistoryResponseDto> findByPatient(UUID patientId);

    void delete(UUID id);
}