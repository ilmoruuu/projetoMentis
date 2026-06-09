package upe.br.ProjetoMentis.business.services.achievement;

import upe.br.ProjetoMentis.controller.dtos.achievement.AchievementResponseDto;
import upe.br.ProjetoMentis.controller.dtos.achievement.CreateAchievementDto;

import java.util.List;
import java.util.UUID;

public interface AchievementService {

    AchievementResponseDto getAchievementById(UUID id);
    List<AchievementResponseDto> getAllAchievements();
    AchievementResponseDto createAchievement(CreateAchievementDto achievement);
    AchievementResponseDto updateAchievement(UUID id, CreateAchievementDto achievement);
    void deleteAchievement(UUID id);
}
