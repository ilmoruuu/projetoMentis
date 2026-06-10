package upe.br.ProjetoMentis.controller.dtos.humorHistory;

import upe.br.ProjetoMentis.infra.enums.MoodType;

import java.util.UUID;

public record UpdateHumorHistoryDto(UUID id, MoodType moodType, String description) {
}
