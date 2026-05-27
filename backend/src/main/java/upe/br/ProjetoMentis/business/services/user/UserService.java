package upe.br.ProjetoMentis.business.services.user;

import upe.br.ProjetoMentis.controller.dtos.user.UserResponseDto;
import upe.br.ProjetoMentis.infra.entities.User;

import java.util.UUID;

public interface UserService {

    UserResponseDto getUserById(UUID id);
    UserResponseDto getUserByEmail(String email);
    void validateEmailUniqueness(String email);
    void deleteUser(UUID id);
}
