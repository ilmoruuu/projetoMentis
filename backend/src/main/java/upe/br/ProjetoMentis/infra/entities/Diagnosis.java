package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import upe.br.ProjetoMentis.infra.enums.Cid10;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_diagnosis")
    private UUID id;

    @Enumerated(EnumType.STRING)
    private Cid10 cid10_principal;

    @Enumerated
    private Cid10 cid10_secondary;

    @Column(length = 340, nullable = true)
    private String observation;

    @OneToMany(mappedBy = "diagnosis")
    private List<Actions> actions;
}
