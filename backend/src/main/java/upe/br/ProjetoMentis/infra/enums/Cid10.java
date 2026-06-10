package upe.br.ProjetoMentis.infra.enums;

public enum Cid10 {
    F100("F10.0", "Intoxicação aguda por álcool"),
    F101("F10.1", "Uso nocivo de álcool"),
    F102("F10.2", "Síndrome de dependência de álcool"),

    // Opioides
    F110("F11.0", "Intoxicação aguda por opioides"),
    F111("F11.1", "Uso nocivo de opioides"),
    F112("F11.2", "Síndrome de dependência de opioides"),

    // Canabinoides
    F120("F12.0", "Intoxicação aguda por canabinoides"),
    F121("F12.1", "Uso nocivo de canabinoides"),
    F122("F12.2", "Síndrome de dependência de canabinoides"),

    // Sedativos e hipnóticos
    F130("F13.0", "Intoxicação aguda por sedativos"),
    F131("F13.1", "Uso nocivo de sedativos"),
    F132("F13.2", "Síndrome de dependência de sedativos"),

    // Cocaína
    F140("F14.0", "Intoxicação aguda por cocaína"),
    F141("F14.1", "Uso nocivo de cocaína"),
    F142("F14.2", "Síndrome de dependência de cocaína"),

    // Outros estimulantes
    F150("F15.0", "Intoxicação aguda por estimulantes"),
    F151("F15.1", "Uso nocivo de estimulantes"),
    F152("F15.2", "Síndrome de dependência de estimulantes"),

    // Tabaco
    F170("F17.0", "Intoxicação aguda por tabaco"),
    F171("F17.1", "Uso nocivo de tabaco"),
    F172("F17.2", "Síndrome de dependência de tabaco"),

    // Transtornos psicóticos
    F200("F20.0", "Esquizofrenia paranoide"),
    F201("F20.1", "Esquizofrenia hebefrênica"),

    // Humor
    F310("F31.0", "Transtorno afetivo bipolar"),
    F320("F32.0", "Episódio depressivo leve"),
    F321("F32.1", "Episódio depressivo moderado"),
    F322("F32.2", "Episódio depressivo grave"),

    // Ansiedade
    F400("F40.0", "Agorafobia"),
    F410("F41.0", "Transtorno do pânico"),
    F411("F41.1", "Transtorno de ansiedade generalizada"),

    // TOC
    F420("F42.0", "Transtorno obsessivo-compulsivo"),

    // Estresse e trauma
    F431("F43.1", "Transtorno de estresse pós-traumático"),

    // Consequências
    X650("X65", "Auto-intoxicação voluntária por álcool"),
    X660("X66", "Auto-intoxicação voluntária por solventes"),
    X680("X68", "Auto-intoxicação voluntária por pesticidas");

    private final String code;
    private final String description;

    Cid10(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
