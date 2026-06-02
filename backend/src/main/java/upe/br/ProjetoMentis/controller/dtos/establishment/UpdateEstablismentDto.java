package upe.br.ProjetoMentis.controller.dtos.establishment;

import upe.br.ProjetoMentis.infra.enums.FederativeUnit;

import java.util.UUID;

public record UpdateEstablismentDto(
        String establishmentName,
        String cnes,
        String city,
        FederativeUnit uf
) {
}
