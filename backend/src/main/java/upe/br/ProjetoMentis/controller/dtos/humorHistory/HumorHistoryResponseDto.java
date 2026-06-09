package upe.br.ProjetoMentis.controller.dtos.humorHistory;

import upe.br.ProjetoMentis.infra.entities.HumorHistory;
import upe.br.ProjetoMentis.infra.enums.MoodType;

import java.time.LocalDateTime;
import java.util.UUID;

public record HumorHistoryResponseDto(
        UUID id,
        UUID patientId,
        MoodType moodType,
        String description,
        LocalDateTime dateTime
) {

    public static HumorHistoryResponseDto toDto(
            HumorHistory humor) {

        return new HumorHistoryResponseDto(
                humor.getId(),
                humor.getPatient().getId(),
                humor.getMoodType(),
                humor.getDescription(),
                humor.getDateTime()
        );
    }
}
