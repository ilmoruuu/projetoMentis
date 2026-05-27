package upe.br.ProjetoMentis.controller.dtos.professional;

import upe.br.ProjetoMentis.infra.entities.Professional;
import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.enums.UserRole;
import upe.br.ProjetoMentis.infra.enums.UserStatus;

import java.util.UUID;

public record ProfessionalResponseDto(
        UUID id,
        UserRole role,
        String name,
        String email,
        String cbo,
        UserStatus status
) {

    public static ProfessionalResponseDto toDto(Professional professional) {
        return new ProfessionalResponseDto(
                professional.getId(),
                professional.getUser().getRole(),
                professional.getUser().getName(),
                professional.getUser().getEmail(),
                professional.getCbo(),
                professional.getStatus()
        );
    }

    public static Professional toEntity(ProfessionalResponseDto dto) {
        if (dto == null) return null;

        User user = new User();
        user.setId(dto.id());
        user.setRole(dto.role());
        user.setName(dto.name());
        user.setEmail(dto.email());

        Professional professional = new Professional();
        professional.setId(dto.id());
        professional.setUser(user);
        professional.setCbo(dto.cbo());
        professional.setStatus(dto.status());

        user.setProfessional(professional);

        return professional;
    }
}
