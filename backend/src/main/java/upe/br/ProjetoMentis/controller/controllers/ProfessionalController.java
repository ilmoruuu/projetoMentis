package upe.br.ProjetoMentis.controller.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.professional.ProfessionalService;
import upe.br.ProjetoMentis.controller.dtos.professional.CreateProfessionalDto;
import upe.br.ProjetoMentis.controller.dtos.professional.ProfessionalResponseDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/professionals")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService professionalService;

    @PostMapping
    public ResponseEntity<ProfessionalResponseDto> createProfessional(@RequestBody @Valid CreateProfessionalDto dto) {
        ProfessionalResponseDto response = professionalService.createProfessional(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProfessionalResponseDto>> getProfessionals() {
        List<ProfessionalResponseDto> response = professionalService.getProfessionals();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDto> getProfessionalById(@PathVariable UUID id) {
        ProfessionalResponseDto response = professionalService.getProfessionalById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessionalResponseDto> updateProfessional(
            @PathVariable UUID id,
            @RequestBody @Valid CreateProfessionalDto dto) {

        ProfessionalResponseDto response = professionalService.updateProfessional(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessional(@PathVariable UUID id) {
        professionalService.deleteProfessional(id);
        return ResponseEntity.noContent().build();
    }
}
