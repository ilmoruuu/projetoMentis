package upe.br.ProjetoMentis.controller.dtos.humorHistory;

import upe.br.ProjetoMentis.infra.enums.MoodType;

import java.util.UUID;

public record CreateHumorHistoryDto(UUID patientId, MoodType moodType, String description) {

}
