package upe.br.ProjetoMentis.business.services.professional;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import upe.br.ProjetoMentis.business.services.user.UserService;
import upe.br.ProjetoMentis.controller.dtos.professional.CreateProfessionalDto;
import upe.br.ProjetoMentis.controller.dtos.professional.ProfessionalResponseDto;
import upe.br.ProjetoMentis.infra.entities.Professional;
import upe.br.ProjetoMentis.infra.entities.User;
import upe.br.ProjetoMentis.infra.enums.UserRole;
import upe.br.ProjetoMentis.infra.enums.UserStatus;
import upe.br.ProjetoMentis.infra.repositories.ProfessionalRepository;
import upe.br.ProjetoMentis.infra.repositories.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfessionalServiceImp implements ProfessionalService{

    private final ProfessionalRepository professionalRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public ProfessionalResponseDto getProfessionalById(UUID id) {
        return professionalRepository.findById(id)
                .map(ProfessionalResponseDto::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Profissional não encontrado com ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProfessionalResponseDto> getProfessionals() {
        return professionalRepository.findAll()
                .stream()
                .map(ProfessionalResponseDto::toDto)
                .toList();
    }

    @Override
    @Transactional
    public ProfessionalResponseDto createProfessional(CreateProfessionalDto professional) {
        userService.validateEmailUniqueness(professional.email());

        User user = new User();
        user.setEmail(professional.email());
        user.setName(professional.name());
        user.setRole(UserRole.PROFESSIONAL);
        user.setPassword(professional.password());

        Professional newProfessional = new Professional();
        newProfessional.setCrp(professional.crp());
        newProfessional.setStatus(UserStatus.ACTIVE);

        newProfessional.setUser(user);
        user.setProfessional(newProfessional);

        User savedUser = userRepository.save(user);

        return ProfessionalResponseDto.toDto(savedUser.getProfessional());
    }

    @Override
    @Transactional
    public ProfessionalResponseDto updateProfessional(UUID id, CreateProfessionalDto professional) {
        Professional existingProfessional = professionalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Profissonal não encontrado com ID: " + id));

        User user = existingProfessional.getUser();

        if (!user.getEmail().equals(professional.email())) {
            userService.validateEmailForUpdate(professional.email(), user.getId());

            user.setEmail(professional.email());
        }

        user.setName(professional.name());

        existingProfessional.setCrp(professional.crp());

        return ProfessionalResponseDto.toDto(existingProfessional);
    }

    @Override
    @Transactional
    public void deleteProfessional(UUID id) {
        Professional existingProfessional = professionalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Profissonal não encontrado com ID: " + id));

        userService.deleteUser(existingProfessional.getUser().getId());
        professionalRepository.delete(existingProfessional);
    }
}
