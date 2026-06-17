package upe.br.ProjetoMentis.business.services.user;

import upe.br.ProjetoMentis.controller.dtos.user.CreateUserDto;
import upe.br.ProjetoMentis.controller.dtos.user.LoginDto;
import upe.br.ProjetoMentis.controller.dtos.user.UpdateUserDto;
import upe.br.ProjetoMentis.controller.dtos.user.UserResponseDto;

import java.util.UUID;

public interface UserService {

    UserResponseDto getUserById(UUID id);
    UserResponseDto getUserByEmail(String email);
    UserResponseDto createUser(CreateUserDto user);
    UserResponseDto updateUser(UUID id, UpdateUserDto user);
    void validateEmailUniqueness(String email);
    void validateEmailForUpdate(String newEmail, UUID currentUserId);
    void login(LoginDto loginDto);
    void deleteUser(UUID id);
}
