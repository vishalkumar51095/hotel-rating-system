package com.vishalkumar.gateway;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Eureka Server does not need context load test")
class ApiGatewayApplicationTests {

	@Test
	void contextLoads() {
	}

}
