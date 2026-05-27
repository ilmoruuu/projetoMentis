package upe.br.ProjetoMentis.infra.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    PATIENT("Patient"),
    PROFESSIONAL("Professional"),
    ADMIN("Admin");

    @JsonValue
    private final String role;

    public static UserRole fromValue(String value) {
        if (value == null) {
            return null;
        }

        return Stream.of(UserRole.values())
                .filter(enumValue -> enumValue.getRole().equalsIgnoreCase(value.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user role:" + value));
    }
}
