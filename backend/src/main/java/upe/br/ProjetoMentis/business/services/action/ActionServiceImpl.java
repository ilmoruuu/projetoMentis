package upe.br.ProjetoMentis.business.services.action;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upe.br.ProjetoMentis.controller.dtos.action.*;
import upe.br.ProjetoMentis.infra.entities.*;
import upe.br.ProjetoMentis.infra.repositories.*;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActionServiceImpl
        implements ActionService {

    private final ActionRepository repository;
    private final PatientRepository patientRepository;
    private final ProfessionalRepository professionalRepository;
    private final EstablishmentRepository establishmentRepository;
    private final DiagnosisRepository diagnosisRepository;

    @Override
    public ActionResponseDto createAction(
            CreateActionDto dto) {

        Patient patient =
                patientRepository.findById(dto.patientId())
                        .orElseThrow(() ->
                                new RuntimeException("Paciente não encontrado"));

        Professional professional =
                professionalRepository.findById(dto.professionalId())
                        .orElseThrow(() ->
                                new RuntimeException("Profissional não encontrado"));

        Establishment establishment =
                establishmentRepository.findById(dto.establishmentId())
                        .orElseThrow(() ->
                                new RuntimeException("Estabelecimento não encontrado"));

        Diagnosis diagnosis =
                diagnosisRepository.findById(dto.diagnosisId())
                        .orElseThrow(() ->
                                new RuntimeException("Diagnóstico não encontrado"));

        Actions action = new Actions();

        action.setCompetence(dto.competence());
        action.setActionCode(dto.actionCode());
        action.setDescription(dto.description());

        action.setPatient(patient);
        action.setProfessional(professional);
        action.setEstablishment(establishment);
        action.setDiagnosis(diagnosis);

        return ActionResponseDto.toDto(
                repository.save(action));
    }

    @Override
    public ActionResponseDto updateAction(
            UpdateActionDto dto) {

        Actions action =
                repository.findById(dto.id())
                        .orElseThrow(() ->
                                new RuntimeException("Ação não encontrada"));

        action.setCompetence(dto.competence());
        action.setActionCode(dto.actionCode());
        action.setDescription(dto.description());

        return ActionResponseDto.toDto(
                repository.save(action));
    }

    @Override
    public ActionResponseDto findById(UUID id) {

        return ActionResponseDto.toDto(
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Ação não encontrada")
                        )
        );
    }

    @Override
    public List<ActionResponseDto> findAll() {

        return repository.findAll()
                .stream()
                .map(ActionResponseDto::toDto)
                .toList();
    }

    @Override
    public List<ActionResponseDto> findByPatient(
            UUID patientId) {

        return repository.findByPatientId(patientId)
                .stream()
                .map(ActionResponseDto::toDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {

        repository.deleteById(id);
    }
}