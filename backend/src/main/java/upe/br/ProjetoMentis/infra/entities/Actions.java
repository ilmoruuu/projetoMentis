package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import upe.br.ProjetoMentis.infra.enums.ActionCode;

import java.time.YearMonth;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Actions {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_action")
    private UUID id;

    private YearMonth competence;

    @Enumerated(EnumType.STRING)
    private ActionCode actionCode;

    @Column(length = 340, nullable = true)
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_patient", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "id_professional", nullable = false)
    private Professional professional;

    @ManyToOne
    @JoinColumn(name = "id_establishment", nullable = false)
    private Establishment establishment;

    @ManyToOne
    @JoinColumn(name = "id_diagnosis", nullable = false)
    private Diagnosis diagnosis;

}
