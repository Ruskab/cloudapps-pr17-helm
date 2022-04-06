package es.codeurjc.mastercloudapps.planner.clients;

import org.springframework.beans.factory.annotation.Value;
import es.codeurjc.mastercloudapps.planner.models.LandscapeResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Service
public class TopoClient {

    @Value("${TOPO_HOST:localhost}")
    private String TOPO_HOST;
    @Value("${TOPO_PORT:8181}")
    private int TOPO_PORT;

    @Async
    public CompletableFuture<String> getLandscape(String city) {
        
        RestTemplate restTemplate = new RestTemplate();

        String url = "http://"+TOPO_HOST+":"+TOPO_PORT+"/api/topographicdetails/" + city;
        
        LandscapeResponse response = restTemplate.getForObject(url, LandscapeResponse.class);
        
        return CompletableFuture.completedFuture(response.getLandscape());
    }
}
