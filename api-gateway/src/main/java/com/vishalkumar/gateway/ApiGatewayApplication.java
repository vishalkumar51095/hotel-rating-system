package com.vishalkumar.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user-service", r -> r.path("/users/**")
                        .uri("lb://USER-SERVICE"))
                .route("hotel-service", r -> r.path("/hotels/**", "/staffs/**")
                        .uri("lb://HOTEL-SERVICE"))
                .route("rating-service", r -> r.path("/ratings/**")
                        .uri("lb://RATING-SERVICE"))
                .route("auth-service", r -> r.path("/auth/**") // <--- Add this
                        .uri("lb://AUTH-SERVICE"))
                .build();
    }



}
