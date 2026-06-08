package upe.br.ProjetoMentis.business.services.patient;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import upe.br.ProjetoMentis.business.services.user.UserService;
import upe.br.ProjetoMentis.controller.dtos.patient.CreatePatientDto;
import upe.br.ProjetoMentis.controller.dtos.patient.PatientResponseDto;
import upe.br.ProjetoMentis.controller.dtos.patient.UpdatePatientDto;
import upe.br.ProjetoMentis.controller.dtos.user.CreateUserDto;
import upe.br.ProjetoMentis.controller.dtos.user.UserResponseDto;
import upe.br.ProjetoMentis.infra.entities.Patient;
import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.enums.UserRole;
import upe.br.ProjetoMentis.infra.enums.UserStatus;
import upe.br.ProjetoMentis.infra.repositories.PatientRepository;
import upe.br.ProjetoMentis.infra.repositories.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientServiceImp implements PatientService{

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public PatientResponseDto getPatientById(UUID id) {
        return patientRepository.findById(id)
                .map(PatientResponseDto::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado com o ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PatientResponseDto> getAllPatients() {
        return patientRepository.findAll()
                .stream().map(PatientResponseDto::toDto)
                .toList();
    }

    @Override
    @Transactional
    public PatientResponseDto createPatient(CreatePatientDto patient) {

        userService.validateEmailUniqueness(patient.email());

        User user = new User();
        user.setName(patient.name());
        user.setEmail(patient.email());
        user.setRole(UserRole.PATIENT);

        Patient newPatient = new Patient();
        newPatient.setCbo(patient.cbo());
        newPatient.setDateOfBirth(patient.dateOfBirth());
        newPatient.setGender(patient.gender());
        newPatient.setSex(patient.sex());
        newPatient.setRace(patient.race());
        newPatient.setCity(patient.city());
        newPatient.setUf(patient.uf());
        newPatient.setCep(patient.cep());
        newPatient.setSobriety(patient.sobriety());
        newPatient.setAddress(patient.address());

        newPatient.setLastCheckin(LocalDate.now());
        newPatient.setStatus(UserStatus.ACTIVE);

        newPatient.setUser(user);
        user.setPatient(newPatient);

        User newUser = userRepository.save(user);

        return PatientResponseDto.toDto(newUser.getPatient());
    }

    @Override
    @Transactional
    public PatientResponseDto updatePatient(UUID id, UpdatePatientDto patient) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado com ID: " + id));

        User user = existingPatient.getUser();

        if (!user.getEmail().equals(patient.email())) {
            userService.validateEmailForUpdate(patient.email(), user.getId());

            user.setEmail(patient.email());
        }

        user.setName(patient.name());

        existingPatient.setCbo(patient.cbo());
        existingPatient.setDateOfBirth(patient.dateOfBirth());
        existingPatient.setGender(patient.gender());
        existingPatient.setSex(patient.sex());
        existingPatient.setRace(patient.race());
        existingPatient.setCity(patient.city());
        existingPatient.setUf(patient.uf());
        existingPatient.setCep(patient.cep());
        existingPatient.setAddress(patient.address());
        existingPatient.setSobriety(patient.sobriety());

        return PatientResponseDto.toDto(existingPatient);
    }

    @Override
    @Transactional
    public void deletePatient(UUID id) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado com ID: " + id));

        userService.deleteUser(existingPatient.getUser().getId());
        patientRepository.delete(existingPatient);
    }
}
