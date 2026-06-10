package upe.br.ProjetoMentis.controller.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.humorHistory.HumorHistoryService;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.CreateHumorHistoryDto;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.HumorHistoryResponseDto;
import upe.br.ProjetoMentis.controller.dtos.humorHistory.UpdateHumorHistoryDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/humor-history")
@RequiredArgsConstructor
public class HumorHistoryController {

    private final HumorHistoryService service;

    @PostMapping
    public ResponseEntity<HumorHistoryResponseDto> create(
            @RequestBody CreateHumorHistoryDto dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createHumorHistory(dto));
    }

    @PutMapping
    public ResponseEntity<HumorHistoryResponseDto> update(
            @RequestBody UpdateHumorHistoryDto dto) {

        return ResponseEntity.ok(service.updateHumorHistory(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HumorHistoryResponseDto> findById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<HumorHistoryResponseDto>> findByPatient(
            @PathVariable UUID patientId) {

        return ResponseEntity.ok(
                service.findByPatient(patientId)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}