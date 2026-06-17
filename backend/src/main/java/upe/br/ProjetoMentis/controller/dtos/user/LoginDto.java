package upe.br.ProjetoMentis.controller.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginDto(
        @NotBlank(message = "O email não pode estar vazio")
        @Email(message = "Email inválido")
        String email,
        @NotBlank(message = "A senha deve ser preenchida")
        String password
) {
}
