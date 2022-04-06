package es.codeurjc.mastercloudapps.planner.clients;

import es.codeurjc.mastercloudapps.planner.models.Eoloplant;
import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;

import java.util.function.Supplier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class NotificationClient {

	private static Logger LOG = LoggerFactory.getLogger(NotificationClient.class);

	EmitterProcessor<Eoloplant> processor = EmitterProcessor.create();

	public void notify(Eoloplant eoloplant) {
		LOG.info("eoloplantCreationProgressNotifications: "+eoloplant);
		processor.onNext(eoloplant);
	}

	@Bean
	public Supplier<Flux<Eoloplant>> producer() {
		return () -> this.processor;
	}
}
