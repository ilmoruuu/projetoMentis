package upe.br.ProjetoMentis.infra.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
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

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail("patient@mentis.com")){

            CreatePatientDto patientDto = new CreatePatientDto(
                    "Fulano de Cicrano",
                    "fulano.cicrano@email.com",
                    "2235-05",
                    LocalDate.of(1990, 5, 15),
                    "Cisgênero",
                    "Masculino",
                    "Parda",
                    "Recife",
                    "PE",
                    "50000-000",
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

            userService.createUser(userPatient);
        }

        if (!userRepository.existsByEmail("psicologo@mentis.com")) {

            CreateProfessionalDto profissional = new CreateProfessionalDto(
                    "Dr. João Silva",
                    "psicologo@mentis.com",
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

            userService.createUser(userProfissional);
        }
    }
}