package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import upe.br.ProjetoMentis.infra.enums.FederativeUnit;

import java.util.List;
import java.util.UUID;

@Entity
@Table (name = "unidade_saude")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Establishment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column (name = "id_establishment")
    private UUID id;

    private String establishmentName;
    private String cnes;
    private String city;

    @Enumerated(EnumType.STRING)
    private FederativeUnit uf;

    @OneToMany(mappedBy = "establishment")
    private List<Patient> patients;

    @OneToMany(mappedBy = "establishment" )
    private List<Professional> professionals;

    @OneToMany(mappedBy = "establishment")
    private List<Actions> actions;

}
