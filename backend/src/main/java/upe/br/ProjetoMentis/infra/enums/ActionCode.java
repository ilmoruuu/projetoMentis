package upe.br.ProjetoMentis.infra.enums;

public enum ActionCode {
    C0301080208 ("Atendimento Individual"),

    C0301080216 ("Atendimento em Grupo"),

    // Família
    C0301080224 ("Atendimento em Família"),
    C0301080259 ("Atendimento à Família"),

    C0301080232 ("Visita Domiciliar"),

    C0301080267 ("Acolhimento Inicial com Classificação de Risco"),

    C0301080275 ("Elaboração de Projeto Terapêutico Singular"),

    C0301080283 ("Atendimento de Urgência/Crise CAPS"),

    C0301080291 ("Escuta Qualificada e Orientação"),

    C0301080305 ("Oficina Terapêutica I (Cognição)"),

    C0301080313 ("Oficina Terapêutica II (Expressão)"),

    // Redução de Danos
    C0301080321 ("Redução de Danos - Individual"),
    C0301080330 ("Redução de Danos - Grupal"),

    C0301080240 ("Atividade Comunitária e/ou Grupal"),

    C0301080348 ("Coordenação de Cuidados - Matriciamento");


    private final String name;

    private ActionCode(final String name) {
        this.name = name;
    }
}
