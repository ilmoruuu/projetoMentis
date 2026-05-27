package upe.br.ProjetoMentis.business.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import upe.br.ProjetoMentis.infra.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

}
