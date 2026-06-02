package upe.br.ProjetoMentis.controller.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.establishment.EstablishmentService;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentCreateDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentEditDto;
import upe.br.ProjetoMentis.controller.dtos.establishment.EstablismentResponseDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/establishments")
@RequiredArgsConstructor
public class EstablishmentController {

    private final EstablishmentService establishmentService;

    @PostMapping("/create")
    public ResponseEntity<EstablismentResponseDto> create(
            @RequestBody EstablismentCreateDto dto) {

        EstablismentResponseDto response =
                establishmentService.createEstablishment(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<EstablismentResponseDto> update(
            @RequestBody EstablismentEditDto dto) {

        EstablismentResponseDto response =
                establishmentService.editEstablishment(dto);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstablismentResponseDto> findById(
            @PathVariable UUID id) {

        EstablismentResponseDto response =
                establishmentService.findById(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EstablismentResponseDto>> findAll() {

        List<EstablismentResponseDto> response =
                establishmentService.findAll();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id) {

        establishmentService.delete(id);

        return ResponseEntity.noContent().build();
    }
}