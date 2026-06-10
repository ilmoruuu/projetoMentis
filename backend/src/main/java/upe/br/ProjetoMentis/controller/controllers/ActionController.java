package upe.br.ProjetoMentis.controller.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.action.ActionService;
import upe.br.ProjetoMentis.controller.dtos.action.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/actions")
@RequiredArgsConstructor
public class ActionController {

    private final ActionService service;

    @PostMapping
    public ResponseEntity<ActionResponseDto>
    createAction(
            @RequestBody CreateActionDto dto) {

        return ResponseEntity.ok(
                service.createAction(dto));
    }

    @PutMapping
    public ResponseEntity<ActionResponseDto>
    updateAction(
            @RequestBody UpdateActionDto dto) {

        return ResponseEntity.ok(
                service.updateAction(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActionResponseDto>
    findById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                service.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<ActionResponseDto>>
    findAll() {

        return ResponseEntity.ok(
                service.findAll());
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<ActionResponseDto>>
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