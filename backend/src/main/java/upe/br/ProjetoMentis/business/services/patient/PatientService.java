package upe.br.ProjetoMentis.business.services.patient;

import upe.br.ProjetoMentis.controller.dtos.patient.CreatePatientDto;
import upe.br.ProjetoMentis.controller.dtos.patient.PatientResponseDto;
import upe.br.ProjetoMentis.controller.dtos.patient.UpdatePatientDto;

import java.util.List;
import java.util.UUID;

public interface PatientService {

    PatientResponseDto getPatientById(UUID id);
    List<PatientResponseDto> getAllPatients();
    PatientResponseDto createPatient(CreatePatientDto patient);
    PatientResponseDto updatePatient(UUID id, UpdatePatientDto patient);
    void deletePatient(UUID id);
}
