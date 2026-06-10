package upe.br.ProjetoMentis.controller.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.diagnosis.DiagnosisService;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.CreateDiagnosisDto;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.DiagnosisResponseDto;
import upe.br.ProjetoMentis.controller.dtos.diagnosis.UpdateDiagnosisDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/diagnosis")
@RequiredArgsConstructor
public class DiagnosisController {

    private final DiagnosisService service;

    @PostMapping
    public ResponseEntity<DiagnosisResponseDto>
    createDiagnosis(
            @RequestBody CreateDiagnosisDto dto) {

        return ResponseEntity.ok(
                service.createDiagnosis(dto));
    }

    @PutMapping
    public ResponseEntity<DiagnosisResponseDto>
    updateDiagnosis(
            @RequestBody UpdateDiagnosisDto dto) {

        return ResponseEntity.ok(
                service.updateDiagnosis(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiagnosisResponseDto>
    findById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<DiagnosisResponseDto>>
    findAll() {

        return ResponseEntity.ok(
                service.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    delete(
            @PathVariable UUID id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}