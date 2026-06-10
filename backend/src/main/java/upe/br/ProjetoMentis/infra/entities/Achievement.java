package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "Achievement")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_achievement")
    private UUID id;

    @Column(nullable = false)
    private String description;

    @Column(name = "goal_in_days", nullable = false)
    private Integer goalInDays;

    @OneToMany(mappedBy = "achievement")
    private List<PatientAchievement> patientAchievements = new ArrayList<>();
}
