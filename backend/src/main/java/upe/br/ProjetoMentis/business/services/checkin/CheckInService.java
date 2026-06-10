package upe.br.ProjetoMentis.business.services.checkin;

import upe.br.ProjetoMentis.controller.dtos.checkin.CreateCheckInDto;
import upe.br.ProjetoMentis.controller.dtos.checkin.CheckInResponseDto;
import upe.br.ProjetoMentis.controller.dtos.checkin.UpdateCheckInDto;

import java.util.List;
import java.util.UUID;

public interface CheckInService {

    CheckInResponseDto createCheckIn(CreateCheckInDto dto);

    CheckInResponseDto updateCheckIn(UpdateCheckInDto dto);

    List<CheckInResponseDto> findAll();

    CheckInResponseDto findById(UUID id);

    List<CheckInResponseDto> findByPatient(UUID patientId);

    void delete(UUID id);
}