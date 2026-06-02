package upe.br.ProjetoMentis.business.services.professional;

import upe.br.ProjetoMentis.controller.dtos.professional.CreateProfessionalDto;
import upe.br.ProjetoMentis.controller.dtos.professional.ProfessionalResponseDto;

import java.util.List;
import java.util.UUID;

public interface ProfessionalService {

    ProfessionalResponseDto getProfessionalById(UUID id);
    List<ProfessionalResponseDto> getProfessionals();
    ProfessionalResponseDto createProfessional(CreateProfessionalDto professional);

    // Aqui o CreateProfessionalDto é usado pq os campos para editar são os mesmos de criar
    ProfessionalResponseDto updateProfessional(UUID id, CreateProfessionalDto professional);
    void deleteProfessional(UUID id);
}
