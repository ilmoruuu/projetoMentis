package upe.br.ProjetoMentis.controller.dtos.user;

import upe.br.ProjetoMentis.controller.dtos.patient.PatientResponseDto;
import upe.br.ProjetoMentis.controller.dtos.professional.ProfessionalResponseDto;
import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.enums.UserRole;

import java.util.UUID;

public record UserResponseDto(
        UUID id,
        UserRole role,
        String name,
        String email,
        PatientResponseDto patient,
        ProfessionalResponseDto professional
) {


    public static UserResponseDto toDto(User user) {

        return new UserResponseDto(
                user.getId(),
                user.getRole(),
                user.getName(),
                user.getEmail(),

                user.getPatient() != null
                        ? PatientResponseDto.toDto(user.getPatient())
                        : null,

                user.getProfessional() != null
                        ? ProfessionalResponseDto.toDto(user.getProfessional())
                        : null
        );
    }


    public static User toEntity(UserResponseDto dto) {

        User user = new User();

        user.setId(dto.id());
        user.setRole(dto.role());
        user.setName(dto.name());
        user.setEmail(dto.email());


        if(dto.patient() != null){
            user.setPatient(
                    PatientResponseDto.toEntity(dto.patient())
            );
        }


        if(dto.professional() != null){
            user.setProfessional(
                    ProfessionalResponseDto.toEntity(dto.professional())
            );
        }


        return user;
    }
}