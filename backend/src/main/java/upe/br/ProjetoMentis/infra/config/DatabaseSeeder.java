package upe.br.ProjetoMentis.infra.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import upe.br.ProjetoMentis.business.services.patient.PatientService;
import upe.br.ProjetoMentis.business.services.professional.ProfessionalService;
import upe.br.ProjetoMentis.business.services.user.UserService;
import upe.br.ProjetoMentis.controller.dtos.patient.CreatePatientDto;
import upe.br.ProjetoMentis.controller.dtos.professional.CreateProfessionalDto;
import upe.br.ProjetoMentis.controller.dtos.user.CreateUserDto;
import upe.br.ProjetoMentis.infra.enums.UserRole;
import upe.br.ProjetoMentis.infra.repositories.UserRepository;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PatientService patientService;
    private final ProfessionalService professionalService;

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail("patient@mentis.com")){

            CreatePatientDto patientDto = new CreatePatientDto(
                    "Fulano de Cicrano",
                    "patient@mentis.com",
                    "123456",
                    "2235-05",
                    LocalDate.of(1990, 5, 15),
                    "Cisgênero",
                    "Masculino",
                    "Parda",
                    "Recife",
                    "PE",
                    "50000000",
                    "Rua das Flores, 123",
                    "Sóbrio"
            );

            CreateUserDto userPatient = new CreateUserDto(
                    UserRole.PATIENT,
                    "Fulano de Cicrano",
                    "patient@mentis.com",
                    "123456",
                    patientDto,
                    null
            );

            patientService.createPatient(patientDto);
        }

        if (!userRepository.existsByEmail("psicologo@mentis.com")) {

            CreateProfessionalDto profissional = new CreateProfessionalDto(
                    "Dr. João Silva",
                    "psicologo@mentis.com",
                    "123456",
                    "CRP-04/12345"
            );

            CreateUserDto userProfissional = new CreateUserDto(
                    UserRole.PROFESSIONAL,
                    "Dr. João Silva",
                    "psicologo@mentis.com",
                    "123456",
                    null,
                    profissional
            );

            professionalService.createProfessional(profissional);
        }
    }
}