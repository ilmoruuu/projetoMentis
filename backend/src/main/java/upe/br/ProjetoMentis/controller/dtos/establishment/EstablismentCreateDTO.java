package upe.br.ProjetoMentis.controller.dtos.establishment;

import upe.br.ProjetoMentis.infra.enums.FederativeUnit;

public record EstablismentCreateDTO(
        String establishmentName,
        String cnes,
        String city,
        FederativeUnit uf
) {
}
