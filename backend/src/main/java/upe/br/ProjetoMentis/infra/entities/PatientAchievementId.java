package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.util.UUID;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class PatientAchievementId {

    @Column(name = "id_patient")
    private UUID patientId;

    @Column(name = "id_achievement")
    private UUID achievementId;
}

