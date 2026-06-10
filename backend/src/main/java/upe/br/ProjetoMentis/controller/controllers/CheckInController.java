package upe.br.ProjetoMentis.controller.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.checkin.CheckInService;
import upe.br.ProjetoMentis.controller.dtos.checkin.CreateCheckInDto;
import upe.br.ProjetoMentis.controller.dtos.checkin.CheckInResponseDto;
import upe.br.ProjetoMentis.controller.dtos.checkin.UpdateCheckInDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/checkins")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService service;

    @PostMapping
    public ResponseEntity<CheckInResponseDto>
    createCheckIn(
            @RequestBody CreateCheckInDto dto) {

        return ResponseEntity.ok(
                service.createCheckIn(dto));
    }

    @PutMapping
    public ResponseEntity<CheckInResponseDto>
    updateCheckIn(
            @RequestBody UpdateCheckInDto dto) {

        return ResponseEntity.ok(
                service.updateCheckIn(dto));
    }

    @GetMapping
    public ResponseEntity<List<CheckInResponseDto>> findAll() {
        return ResponseEntity.ok(
                service.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheckInResponseDto>
    findById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                service.findById(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<CheckInResponseDto>>
    findByPatient(
            @PathVariable UUID patientId) {

        return ResponseEntity.ok(
                service.findByPatient(patientId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    delete(
            @PathVariable UUID id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}