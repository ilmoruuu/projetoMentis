package upe.br.ProjetoMentis.business.services.achievement;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import upe.br.ProjetoMentis.controller.dtos.achievement.AchievementResponseDto;
import upe.br.ProjetoMentis.controller.dtos.achievement.CreateAchievementDto;
import upe.br.ProjetoMentis.infra.entities.Achievement;
import upe.br.ProjetoMentis.infra.repositories.AchievementRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AchievementServiceImp implements AchievementService{

    private final AchievementRepository achievementRepository;

    @Override
    @Transactional(readOnly = true)
    public AchievementResponseDto getAchievementById(UUID id) {
        return achievementRepository.findById(id)
                .map(AchievementResponseDto::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Recompensa não encontrada com ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AchievementResponseDto> getAllAchievements() {
        return achievementRepository.findAll()
                .stream()
                .map(AchievementResponseDto::toDto)
                .toList();
    }

    @Override
    public AchievementResponseDto createAchievement(CreateAchievementDto achievement) {

        Achievement newAchievement = new Achievement();
        newAchievement.setDescription(achievement.description());
        newAchievement.setGoalInDays(achievement.goalInDays());

        return AchievementResponseDto.toDto(achievementRepository.save(newAchievement));
    }

    @Override
    public AchievementResponseDto updateAchievement(UUID id, CreateAchievementDto achievement) {
        Achievement existingAchievement = findById(id);

        existingAchievement.setDescription(achievement.description());
        existingAchievement.setGoalInDays(achievement.goalInDays());

        return AchievementResponseDto.toDto(existingAchievement);
    }

    @Override
    public void deleteAchievement(UUID id) {
        Achievement achievement = findById(id);

        achievementRepository.delete(achievement);
    }

    private Achievement findById(UUID id) {
        return achievementRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recompensa não encontrada com ID: " + id));
    }
}
