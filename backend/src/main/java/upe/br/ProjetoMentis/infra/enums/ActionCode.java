package upe.br.ProjetoMentis.infra.enums;

import lombok.Getter;

@Getter
public enum ActionCode {

    C0301080208("03.01.08.020-8", "Atendimento Individual"),

    C0301080216("03.01.08.021-6", "Atendimento em Grupo"),

    C0301080224("03.01.08.022-4", "Atendimento em Família"),

    C0301080232("03.01.08.023-2", "Visita Domiciliar"),

    C0301080240("03.01.08.024-0", "Atividade Comunitária e/ou Grupal"),

    C0301080259("03.01.08.025-9", "Atendimento à Família"),

    C0301080267("03.01.08.026-7", "Acolhimento Inicial com Classificação de Risco"),

    C0301080275("03.01.08.027-5", "Elaboração de Projeto Terapêutico Singular"),

    C0301080283("03.01.08.028-3", "Atendimento de Urgência/Crise CAPS"),

    C0301080291("03.01.08.029-1", "Escuta Qualificada e Orientação"),

    C0301080305("03.01.08.030-5", "Oficina Terapêutica I (Cognição)"),

    C0301080313("03.01.08.031-3", "Oficina Terapêutica II (Expressão)"),

    C0301080321("03.01.08.032-1", "Redução de Danos - Individual"),

    C0301080330("03.01.08.033-0", "Redução de Danos - Grupal"),

    C0301080348("03.01.08.034-8", "Coordenação de Cuidados - Matriciamento");

    private final String code;
    private final String name;

    ActionCode(String code, String name) {
        this.code = code;
        this.name = name;
    }
}