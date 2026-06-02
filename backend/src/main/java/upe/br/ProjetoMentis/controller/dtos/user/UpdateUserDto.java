package upe.br.ProjetoMentis.controller.dtos.user;

import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.enums.UserRole;

public record UpdateUserDto(
        UserRole role,
        String name,
        String email
) {

    public static UpdateUserDto toDto(User user) {
        return new UpdateUserDto(
                user.getRole(),
                user.getName(),
                user.getEmail()
        );
    }

    public static User toEntity(UpdateUserDto dto) {
        User user = new User();
        user.setRole(dto.role());
        user.setName(dto.name());
        user.setEmail(dto.email());

        return user;
    }
}
