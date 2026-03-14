package com.servicebooking.config;

import com.servicebooking.model.Service;
import com.servicebooking.repository.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedServices(ServiceRepository serviceRepository) {
        return args -> {
            if (serviceRepository.count() == 0) {
                serviceRepository.saveAll(List.of(
                    new Service(1L, "Cleaning", "Professional home cleaning services"),
                    new Service(2L, "Plumbing", "Expert plumbing repairs and installations"),
                    new Service(3L, "Electrical", "Licensed electrical services"),
                    new Service(4L, "HVAC", "Heating, cooling, and ventilation services"),
                    new Service(5L, "Carpentry", "Custom carpentry and woodwork"),
                    new Service(6L, "Painting", "Interior and exterior painting services"),
                    new Service(7L, "Roofing", "Roof repair and replacement"),
                    new Service(8L, "Landscaping", "Lawn care and landscaping services")
                ));
            }
        };
    }
}
