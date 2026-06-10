package upe.br.ProjetoMentis.business.services.checkin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upe.br.ProjetoMentis.controller.dtos.checkin.CreateCheckInDto;
import upe.br.ProjetoMentis.controller.dtos.checkin.CheckInResponseDto;
import upe.br.ProjetoMentis.controller.dtos.checkin.UpdateCheckInDto;
import upe.br.ProjetoMentis.infra.entities.CheckIn;
import upe.br.ProjetoMentis.infra.entities.Patient;
import upe.br.ProjetoMentis.infra.repositories.CheckInRepository;
import upe.br.ProjetoMentis.infra.repositories.PatientRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckInServiceImpl
        implements CheckInService {

    private final CheckInRepository repository;
    private final PatientRepository patientRepository;

    @Override
    public CheckInResponseDto createCheckIn(
            CreateCheckInDto dto) {

        Patient patient =
                patientRepository.findById(dto.patientId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Paciente não encontrado"));

        CheckIn checkIn = new CheckIn();

        checkIn.setStatus(dto.status());
        checkIn.setDate(LocalDate.now());
        checkIn.setPatient(patient);

        patient.setLastCheckin(LocalDate.now());

        return CheckInResponseDto.toDto(
                repository.save(checkIn));
    }

    @Override
    public CheckInResponseDto updateCheckIn(
            UpdateCheckInDto dto) {

        CheckIn checkIn =
                repository.findById(dto.id())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Check-in não encontrado"));

        checkIn.setStatus(dto.status());
        checkIn.setDate(dto.date());

        return CheckInResponseDto.toDto(
                repository.save(checkIn));
    }

    @Override
    public List<CheckInResponseDto> findAll() {
        return repository.findAll()
                .stream()
                .map(CheckInResponseDto::toDto)
                .toList();
    }

    @Override
    public CheckInResponseDto findById(
            UUID id) {

        return CheckInResponseDto.toDto(
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Check-in não encontrado"))
        );
    }

    @Override
    public List<CheckInResponseDto> findByPatient(
            UUID patientId) {

        return repository.findByPatientId(patientId)
                .stream()
                .map(CheckInResponseDto::toDto)
                .toList();
    }

    @Override
    public void delete(UUID id) {

        repository.deleteById(id);
    }
}