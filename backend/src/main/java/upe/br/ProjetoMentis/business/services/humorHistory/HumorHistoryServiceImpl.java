package upe.br.ProjetoMentis.business.services.humorHistory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.CreateHumorHistoryDto;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.HumorHistoryResponseDto;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.UpdateHumorHistoryDto;
import upe.br.ProjetoMentis.infra.entities.HumorHistory;
import upe.br.ProjetoMentis.infra.entities.Patient;
import upe.br.ProjetoMentis.infra.repositories.HumorHistoryRepository;
import upe.br.ProjetoMentis.infra.repositories.PatientRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HumorHistoryServiceImpl implements HumorHistoryService {

    private final HumorHistoryRepository repository;
    private final PatientRepository patientRepository;

    @Override
    public HumorHistoryResponseDto createHumorHistory (CreateHumorHistoryDto dto) {

        Patient patient = patientRepository.findById(dto.patientId())
                .orElseThrow(() ->
                        new RuntimeException("Paciente não encontrado"));

        HumorHistory humor = new HumorHistory();

        humor.setPatient(patient);
        humor.setMoodType(dto.moodType());
        humor.setDescription(dto.description());
        humor.setDateTime(LocalDateTime.now());

        return HumorHistoryResponseDto
                .toDto(repository.save(humor));
    }

    @Override
    public HumorHistoryResponseDto updateHumorHistory (UpdateHumorHistoryDto dto) {

        HumorHistory humor = repository.findById(dto.id())
                .orElseThrow(() ->
                        new RuntimeException("Registro não encontrado"));

        humor.setMoodType(dto.moodType());
        humor.setDescription(dto.description());

        return HumorHistoryResponseDto
                .toDto(repository.save(humor));
    }

    @Override
    public HumorHistoryResponseDto findById(UUID id) {

        return HumorHistoryResponseDto.toDto(
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Registro não encontrado"))
        );
    }

    @Override
    public List<HumorHistoryResponseDto> findByPatient(
            UUID patientId) {

        return repository.findByPatientId(patientId)
                .stream()
                .map(HumorHistoryResponseDto::toDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {

        repository.deleteById(id);
    }
}