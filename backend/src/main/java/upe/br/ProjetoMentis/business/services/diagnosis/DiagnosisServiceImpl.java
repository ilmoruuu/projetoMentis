package upe.br.ProjetoMentis.business.services.diagnosis;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.CreateDiagnosisDto;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.DiagnosisResponseDto;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.UpdateDiagnosisDto;
import upe.br.ProjetoMentis.infra.entities.Diagnosis;
import upe.br.ProjetoMentis.infra.repositories.DiagnosisRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DiagnosisServiceImpl
        implements DiagnosisService {

    private final DiagnosisRepository repository;

    @Override
    public DiagnosisResponseDto createDiagnosis(CreateDiagnosisDto dto) {

        Diagnosis diagnosis = new Diagnosis();

        diagnosis.setCid10_principal(
                dto.cid10Principal());

        diagnosis.setCid10_secondary(
                dto.cid10Secondary());

        diagnosis.setObservation(
                dto.observation());

        return DiagnosisResponseDto.toDto(repository.save(diagnosis));
    }

    @Override
    public DiagnosisResponseDto updateDiagnosis(
            UpdateDiagnosisDto dto) {

        Diagnosis diagnosis =
                repository.findById(dto.id())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Diagnóstico não encontrado"));

        diagnosis.setCid10_principal(
                dto.cid10Principal());

        diagnosis.setCid10_secondary(
                dto.cid10Secondary());

        diagnosis.setObservation(
                dto.observation());

        return DiagnosisResponseDto
                .toDto(repository.save(diagnosis));
    }

    @Override
    public DiagnosisResponseDto findById(
            UUID id) {

        return DiagnosisResponseDto.toDto(
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Diagnóstico não encontrado"))
        );
    }

    @Override
    public List<DiagnosisResponseDto> findAll() {

        return repository.findAll()
                .stream()
                .map(DiagnosisResponseDto::toDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {

        repository.deleteById(id);
    }
}