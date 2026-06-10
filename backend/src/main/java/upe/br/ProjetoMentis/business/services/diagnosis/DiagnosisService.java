package upe.br.ProjetoMentis.business.services.diagnosis;

import upe.br.ProjetoMentis.controller.dtos.diagnosis.CreateDiagnosisDto;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.DiagnosisResponseDto;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.UpdateDiagnosisDto;

import java.util.List;
import java.util.UUID;

public interface DiagnosisService {

    DiagnosisResponseDto createDiagnosis(
            CreateDiagnosisDto dto);

    DiagnosisResponseDto updateDiagnosis(
            UpdateDiagnosisDto dto);

    DiagnosisResponseDto findById(
            UUID id);

    List<DiagnosisResponseDto> findAll();

    void delete(UUID id);
}