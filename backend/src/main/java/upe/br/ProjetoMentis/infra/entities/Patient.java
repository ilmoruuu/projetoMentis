package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import upe.br.ProjetoMentis.infra.enums.UserStatus;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @Column(name = "id_patient")
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id_user")
    private User user;

    @Column(nullable = false)
    private String cbo;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(length = 30)
    private String gender;

    @Column(length = 10)
    private String sex;

    @Column(length = 30)
    private String race;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Column(length = 30, nullable = false)
    private String city;

    @Column(length = 2, nullable = false)
    private String uf;

    @Column(length = 8, nullable = false)
    private String cep;

    @Column(length = 30, nullable = false)
    private String address;

    // Tem que ver oq isso significa
    private String sobriedade;

    @Column(name = "last_checkin", nullable = false)
    private LocalDate lastCheckin;
}
