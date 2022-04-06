package es.codeurjc.mastercloudapps.topo.service;

import es.codeurjc.mastercloudapps.topo.model.City;
import es.codeurjc.mastercloudapps.topo.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Random;

@Service
public class TopoService {

    @Autowired
    private CityRepository cityRepository;

    public Mono<City> getCity(String id) {
        return this.cityRepository.findByIdIgnoreCase(id)
                .delayElement(Duration.ofMillis(1000 + new Random().nextInt(2000)))
                .switchIfEmpty(
                        Mono.error(new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "City with id " + id + " not found")));
    }
}
