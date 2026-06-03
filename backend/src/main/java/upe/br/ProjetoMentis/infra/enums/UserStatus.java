package upe.br.ProjetoMentis.infra.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum UserStatus {
    ACTIVE("Active"),
    DEACTIVATE("Deactivate");

    @JsonValue
    private final String status;

    public static UserStatus fromValue(String status) {
        if (status == null) {
            return null;
        }

        return Stream.of(UserStatus.values())
                .filter(userStatus -> userStatus.getStatus().equalsIgnoreCase(status.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid user status: " + status));
    }
}
