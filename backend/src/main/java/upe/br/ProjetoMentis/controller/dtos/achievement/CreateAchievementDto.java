package upe.br.ProjetoMentis.controller.dtos.achievement;

public record CreateAchievementDto(
        String description,
        Integer goalInDays
) {
}
