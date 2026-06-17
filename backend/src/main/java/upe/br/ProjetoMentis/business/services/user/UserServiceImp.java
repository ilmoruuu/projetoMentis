package upe.br.ProjetoMentis.business.services.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import upe.br.ProjetoMentis.controller.dtos.user.CreateUserDto;
import upe.br.ProjetoMentis.controller.dtos.user.LoginDto;
import upe.br.ProjetoMentis.controller.dtos.user.UpdateUserDto;
import upe.br.ProjetoMentis.controller.dtos.user.UserResponseDto;
import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.repositories.UserRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserById(UUID id) {
        return userRepository.findById(id)
                .map(UserResponseDto::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDto getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserResponseDto::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o e-mail: " + email));
    }

    @Override
    @Transactional
    public UserResponseDto createUser(CreateUserDto user) {
        if (userRepository.existsByEmail(user.email())) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado no sistema");
        }

        User newUser = new User();
        newUser.setName(user.name());
        newUser.setEmail(user.email());
        newUser.setRole(user.role());

        User savedUser = userRepository.save(newUser);
        return UserResponseDto.toDto(savedUser);
    }

    @Override
    @Transactional
    public UserResponseDto updateUser(UUID id, UpdateUserDto user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com ID: " + id));

        this.validateEmailForUpdate(user.email(), id);

        existingUser.setName(user.name());
        existingUser.setEmail(user.email());

        return UserResponseDto.toDto(existingUser);
    }

    @Transactional(readOnly = true)
    public void validateEmailForUpdate(String newEmail, UUID currentUserId) {
        if (userRepository.existsByEmailAndIdNot(newEmail, currentUserId)) {
            throw new IllegalArgumentException("Este e-mail já está sendo utilizado por outro usuário.");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public void validateEmailUniqueness(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado no sistema.");
        }
    }

    @Override
    @Transactional
    public void login(LoginDto loginDto){
        if (!loginDto.email().equals("email.teste@gmail") || !loginDto.password().equals("1234")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "O Email ou senha estão incorretos");
        }
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        UserResponseDto dto = getUserById(id);
        User entity = UserResponseDto.toEntity(dto);

        userRepository.delete(entity);
    }
}