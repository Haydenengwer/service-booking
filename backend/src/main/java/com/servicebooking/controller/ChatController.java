package com.servicebooking.controller;

import com.servicebooking.model.ChatRequest;
import com.servicebooking.model.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @Value("${GOOGLE_API_KEY}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=";

    private static final String SYSTEM_PROMPT = """
            You are a friendly assistant for a home services booking platform.
            The platform offers these services:
            - Cleaning: Professional home cleaning services
            - Plumbing: Expert plumbing repairs and installations
            - Electrical: Licensed electrical services
            - HVAC: Heating, cooling, and ventilation services
            - Carpentry: Custom carpentry and woodwork
            - Painting: Interior and exterior painting services
            - Roofing: Roof repair and replacement
            - Landscaping: Lawn care and landscaping services

            Help users figure out which service they need, answer questions about what each service covers,
            and guide them toward submitting a booking. Be concise and conversational.
            When a user describes a problem, suggest the most relevant service and encourage them to click on it.
            """;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        // Gemini uses "user" / "model" roles (not "assistant")
        List<Map<String, Object>> contents = request.getMessages().stream()
                .map(msg -> Map.of(
                        "role", "assistant".equals(msg.getRole()) ? "model" : "user",
                        "parts", List.of(Map.of("text", msg.getContent()))
                ))
                .collect(Collectors.toList());

        // Prepend system prompt as first user/model exchange for compatibility
        List<Map<String, Object>> allContents = new ArrayList<>();
        allContents.add(Map.of("role", "user",  "parts", List.of(Map.of("text", SYSTEM_PROMPT))));
        allContents.add(Map.of("role", "model", "parts", List.of(Map.of("text", "Understood! I'm ready to help customers find the right home service."))));
        allContents.addAll(contents);

        Map<String, Object> body = new HashMap<>();
        body.put("contents", allContents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            Map<?, ?> response = restTemplate.postForObject(GEMINI_URL + apiKey, entity, Map.class);
            return ResponseEntity.ok(new ChatResponse(extractText(response)));
        } catch (HttpClientErrorException e) {
            log.error("Gemini API error {}: {}", e.getStatusCode(), e.getResponseBodyAsString());
            return ResponseEntity.ok(new ChatResponse("Sorry, the AI service returned an error. Please try again."));
        } catch (Exception e) {
            log.error("Unexpected error calling Gemini API", e);
            return ResponseEntity.ok(new ChatResponse("Sorry, something went wrong. Please try again."));
        }
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<?, ?> response) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "Sorry, I couldn't generate a response. Please try again.";
        }
    }
}
