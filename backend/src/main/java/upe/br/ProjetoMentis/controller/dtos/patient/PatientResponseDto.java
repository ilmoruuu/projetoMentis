package upe.br.ProjetoMentis.controller.dtos.patient;

import upe.br.ProjetoMentis.controller.dtos.user.UserResponseDto;
import upe.br.ProjetoMentis.infra.entities.Patient;
import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.enums.UserRole;
import upe.br.ProjetoMentis.infra.enums.UserStatus;

import java.time.LocalDate;
import java.util.UUID;

public record PatientResponseDto(
        UUID id,
        // Dados de User
        UserRole role,
        String name,
        String email,
        // Dados de Patient
        String cbo,
        LocalDate dateOfBirth,
        String gender,
        String sex,
        String race,
        String observation,
        UserStatus status,
        String city,
        String uf,
        String cep,
        String address,
        String sobriedade,
        LocalDate lastCheckin
) {

    public static PatientResponseDto toDto(Patient patient) {
        User user = patient.getUser();

        return new PatientResponseDto(
                patient.getId(),
                user.getRole(),
                user.getName(),
                user.getEmail(),
                patient.getCbo(),
                patient.getDateOfBirth(),
                patient.getGender(),
                patient.getSex(),
                patient.getRace(),
                patient.getObservation(),
                patient.getStatus(),
                patient.getCity(),
                patient.getUf(),
                patient.getCep(),
                patient.getAddress(),
                patient.getSobriedade(),
                patient.getLastCheckin()
        );
    }

    public static Patient toEntity(PatientResponseDto dto) {
        if (dto == null) return null;

        User user = new User();
        user.setId(dto.id());
        user.setRole(dto.role());
        user.setName(dto.name());
        user.setEmail(dto.email());

        Patient patient = new Patient();
        patient.setId(dto.id());
        patient.setUser(user);
        patient.setCbo(dto.cbo());
        patient.setDateOfBirth(dto.dateOfBirth());
        patient.setGender(dto.gender());
        patient.setSex(dto.sex());
        patient.setRace(dto.race());
        patient.setObservation(dto.observation());
        patient.setStatus(dto.status());
        patient.setCity(dto.city());
        patient.setUf(dto.uf());
        patient.setCep(dto.cep());
        patient.setAddress(dto.address());
        patient.setSobriedade(dto.sobriedade());
        patient.setLastCheckin(dto.lastCheckin());

        user.setPatient(patient);

        return patient;
    }
}
