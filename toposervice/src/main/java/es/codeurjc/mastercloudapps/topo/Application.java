package es.codeurjc.mastercloudapps.topo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.policy.AlwaysRetryPolicy;
import org.springframework.retry.support.RetryTemplate;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		RetryTemplate template = new RetryTemplate();
		AlwaysRetryPolicy policy = new AlwaysRetryPolicy();

		template.setRetryPolicy(policy);
		template.execute(context ->
			{
				SpringApplication.run(Application.class, args);
				return true;
			});
	}
}