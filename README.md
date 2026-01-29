# Hotel Rating System

A backend-focused microservices application built using Spring Boot, designed to demonstrate scalable, secure, and high-availability system architecture.

## Tech Stack
- Java 17
- Spring Boot
- REST APIs
- JWT Authentication
- PostgreSQL / MySQL
- Docker
- React (Architecture Visualization)

## Architecture Overview
The system follows a microservices-based architecture with an API Gateway, Service Registry, and independent services for Users, Hotels, and Ratings.  
Each microservice owns its database to ensure loose coupling and scalability.

A React-based frontend is used to visually demonstrate the architecture, request flow, and service interactions.

## Key Features
- Secure REST APIs with JWT-based authentication
- Role-based access control (RBAC)
- User, Hotel, and Rating management services
- Service discovery and centralized configuration
- Database isolation per microservice
- Dockerized backend services

## Frontend
- Built using React
- Material UI for components
- React Hooks and Routing
- Used for architecture visualization and API interaction

## Future Enhancements
- Two-Factor Authentication (2FA) using Google Authenticator (TOTP)
- Integration of Message Queues (Kafka / RabbitMQ) for:
  - Event-driven communication
  - Real-time hotel activity tracking
  - Location-based event processing
- CI/CD pipeline automation using GitHub Actions
- API Gateway enhancements (rate limiting, monitoring)
- Caching using Redis for improved performance
- Deployment on Kubernetes (K8s) with High Availability

## Purpose
This project is intended as a learning, demonstration, and portfolio project showcasing real-world backend development practices and system design.
