package upe.br.ProjetoMentis.controller.dtos.user;

import upe.br.ProjetoMentis.infra.entities.User;

public record UpdateUserDto(
        String name,
        String email
) {

    public static UpdateUserDto toDto(User user) {
        return new UpdateUserDto(
                user.getName(),
                user.getEmail()
        );
    }

    public static User toEntity(UpdateUserDto dto) {
        User user = new User();

        user.setName(dto.name());
        user.setEmail(dto.email());

        return user;
    }
}
