package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import upe.br.ProjetoMentis.infra.enums.UserStatus;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "professional")
public class Professional {

    @Id
    @Column(name = "professional_id")
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String cbo;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @ManyToOne
    @JoinColumn(name="id_establishment")
    private Establishment establishment;
}
