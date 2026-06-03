package upe.br.ProjetoMentis.controller.dtos.establishment;

import upe.br.ProjetoMentis.infra.enums.FederativeUnit;

public record CreateEstablismentDto(
        String establishmentName,
        String cnes,
        String city,
        FederativeUnit uf
) {
}
