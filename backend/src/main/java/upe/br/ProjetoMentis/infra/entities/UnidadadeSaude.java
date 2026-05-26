package upe.br.ProjetoMentis.infra.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "unidade_saude")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UnidadadeSaude {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome_estabelecimento;
    private String cnes;
    private String municipio;
    private String uf;
}
