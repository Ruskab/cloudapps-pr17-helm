package es.codeurjc.mastercloudapps.planner.service;

import es.codeurjc.mastercloudapps.planner.clients.NotificationClient;
import es.codeurjc.mastercloudapps.planner.clients.TopoClient;
import es.codeurjc.mastercloudapps.planner.clients.WeatherClient;
import es.codeurjc.mastercloudapps.planner.models.EoloplantCreationRequest;
import es.codeurjc.mastercloudapps.planner.models.Eoloplant;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

@Service
public class PlannerService {

	@Autowired
	private NotificationClient notificationService;

	@Autowired
	private WeatherClient weatherClient;

	@Autowired
	private TopoClient topoClient;

	@Bean
	public Consumer<EoloplantCreationRequest> consumer() {
		System.out.println("Bean!");
		return request -> createNewEoloplant(request);
	}

	public void createNewEoloplant(EoloplantCreationRequest request) {

		Eoloplant eoloplant = new Eoloplant(request.getId(), request.getCity());

		CompletableFuture<String> weather = weatherClient.getWeather(request.getCity());
		CompletableFuture<String> landscape = topoClient.getLandscape(request.getCity());

		CompletableFuture<Void> allFutures = CompletableFuture.allOf(weather, landscape);

		eoloplant.advanceProgress();

		notificationService.notify(eoloplant);

		weather.thenAccept(w -> {
			eoloplant.addPlanning(w);
			notificationService.notify(eoloplant);
		});

		landscape.thenAccept(l -> {
			eoloplant.addPlanning(l);
			notificationService.notify(eoloplant);
		});

		allFutures.thenRun(() -> {
			simulateProcessWaiting();
			eoloplant.processPlanning();
			notificationService.notify(eoloplant);
		});
	}

	private void simulateProcessWaiting() {
		try {
			Thread.sleep((long) (Math.random() * 2000 + 1000));
		} catch (InterruptedException e) {}
	}
}
