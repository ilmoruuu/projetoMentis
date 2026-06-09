package upe.br.ProjetoMentis.business.services.patientAchievement;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import upe.br.ProjetoMentis.controller.dtos.achievement.CreateAchievementDto;
import upe.br.ProjetoMentis.controller.dtos.patientAchievement.CreatePatientAchievementDto;
import upe.br.ProjetoMentis.controller.dtos.patientAchievement.PatientAchievementDto;
import upe.br.ProjetoMentis.infra.entities.PatientAchievement;
import upe.br.ProjetoMentis.infra.entities.PatientAchievementId;
import upe.br.ProjetoMentis.infra.repositories.PatientAchievementRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientAchievementServiceImp implements PatientAchievementService {

    private final PatientAchievementRepository patientAchievementRepository;

    @Override
    @Transactional(readOnly = true)
    public PatientAchievementDto getPatientAchievementById(UUID achievementId, UUID patientId) {

        PatientAchievementId compositeId = new PatientAchievementId(patientId, achievementId);

        return patientAchievementRepository.findById(compositeId)
                .map(PatientAchievementDto::toDto)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Relação Paciente-Conquista não encontrada para o Paciente ID: " + patientId + " e Conquista ID: " + achievementId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatientAchievementDto> getAllPatientAchievementByAchievementId(UUID achievementId) {
        return patientAchievementRepository.findById_AchievementId(achievementId)
                .stream()
                .map(PatientAchievementDto::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatientAchievementDto> getAllPatientAchievementByPatientId(UUID patientId) {
        return patientAchievementRepository.findById_PatientId(patientId)
                .stream()
                .map(PatientAchievementDto::toDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatientAchievementDto> getAllPatientAchievement() {
        return patientAchievementRepository.findAll()
                .stream()
                .map(PatientAchievementDto::toDto)
                .toList();
    }

    @Override
    @Transactional
    public PatientAchievementDto assignAchievementToPatient(CreatePatientAchievementDto dto) {
        if (hasPatientAchievement(dto.patientId(), dto.achievementId())) {
            throw new IllegalStateException("Este paciente já possui esta conquista desbloqueada.");
        }

        PatientAchievementDto patientAchievementDto = new PatientAchievementDto(
                dto.patientId(),
                dto.achievementId(),
                LocalDate.now()
        );

        PatientAchievement entity = PatientAchievementDto.toEntity(patientAchievementDto);

        PatientAchievement savedEntity = patientAchievementRepository.save(entity);
        return PatientAchievementDto.toDto(savedEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasPatientAchievement(UUID patientId, UUID achievementId) {
        PatientAchievementId compositeId = new PatientAchievementId(patientId, achievementId);
        return patientAchievementRepository.existsById(compositeId);
    }

    @Override
    @Transactional(readOnly = true)
    public Integer countAchievementsByPatientId(UUID patientId) {
        long count = patientAchievementRepository.countById_PatientId(patientId);
        return (int) count;
    }
}
