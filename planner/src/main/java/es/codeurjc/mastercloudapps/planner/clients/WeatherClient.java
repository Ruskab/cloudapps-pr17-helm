package es.codeurjc.mastercloudapps.planner.clients;

import es.codeurjc.mastercloudapps.planner.grpc.GetWeatherRequest;
import es.codeurjc.mastercloudapps.planner.grpc.Weather;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

import static es.codeurjc.mastercloudapps.planner.grpc.WeatherServiceGrpc.WeatherServiceBlockingStub;

@Service
public class WeatherClient {

    @GrpcClient("weatherServer")
    private WeatherServiceBlockingStub client;

    @Async
    public CompletableFuture<String> getWeather(String city) {

        GetWeatherRequest request = GetWeatherRequest.newBuilder()
                .setCity(city)
                .build();

        Weather response = this.client.getWeather(request);

        return CompletableFuture.completedFuture(response.getWeather());
    }
}