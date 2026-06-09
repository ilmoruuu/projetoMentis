package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import upe.br.ProjetoMentis.infra.enums.MoodType;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "humor")
public class HumorHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Enumerated(EnumType.STRING)
    MoodType moodType;

    @Column(length = 340, nullable = false)
    String description;

    @Column(name = "register-date", nullable = false)
    LocalDateTime dateTime;
}
