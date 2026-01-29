package com.vishalkumar.ServiceRegistry;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Eureka Server does not need context load test")
class ServiceRegistryApplicationTests {

	@Test
	void contextLoads() {
	}

}
