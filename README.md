# Home Services Booking Platform

A full-stack web application that allows customers to browse, select, and book home services. Built with React + TypeScript on the frontend and Spring Boot + SQL Server on the backend.

---

## What the App Does

The platform enables customers to:

- **Browse Services** — View a grid of available home services (Cleaning, Plumbing, Electrical, HVAC, Carpentry, Painting, Roofing, Landscaping)
- **Book a Service** — Fill out a booking form with their name, email, zip code, and a description of their issue
- **Receive Confirmation** — See a success page with their booking details and what to expect next

The backend persists all bookings to a SQL Server database and seeds the services list on startup.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 18.2.0 |
| Language (Frontend) | TypeScript | 5.2.2 |
| Build Tool | Vite | 5.4.21 |
| Routing | React Router DOM | 7.13.1 |
| UI Library | Material-UI (MUI) | 7.3.9 |
| Backend Framework | Spring Boot | 3.4.3 |
| Language (Backend) | Java | 17 |
| ORM | Spring Data JPA / Hibernate | — |
| Database | Microsoft SQL Server | local |
| Build Tool (Backend) | Gradle | — |

---

## Project Structure

```
Service-booking/
├── frontend/                        # React TypeScript app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Service listing page
│   │   │   ├── ServiceDetails.tsx   # Booking form page
│   │   │   └── Success.tsx          # Confirmation page
│   │   ├── services/
│   │   │   └── api.ts               # API service layer
│   │   ├── types/
│   │   │   └── service.ts           # TypeScript interfaces
│   │   ├── App.tsx                  # Router + theme setup
│   │   └── theme.ts                 # MUI custom theme
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                         # Spring Boot app
    └── src/main/java/com/servicebooking/
        ├── controller/
        │   ├── ServiceController.java
        │   └── BookingController.java
        ├── model/
        │   ├── Service.java
        │   └── Booking.java
        ├── repository/
        │   ├── ServiceRepository.java
        │   └── BookingRepository.java
        └── config/
            ├── CorsConfig.java
            └── DataSeeder.java
```

---

## Setup

### Prerequisites

- Node.js 18+
- Java 17+
- Gradle (or use the included `./gradlew` wrapper)
- Microsoft SQL Server running locally on port `1433`

---

### SQL Server Setup

Create the database and tables. Hibernate (`ddl-auto=update`) will auto-create the tables on first run, but you can also create them manually:

```sql
CREATE DATABASE ServiceBookingDB;
GO

USE ServiceBookingDB;
GO

CREATE TABLE services (
    id          BIGINT PRIMARY KEY IDENTITY(1,1),
    name        NVARCHAR(255) NOT NULL,
    description NVARCHAR(255) NOT NULL
);

CREATE TABLE bookings (
    id                BIGINT PRIMARY KEY IDENTITY(1,1),
    service_name      NVARCHAR(255) NOT NULL,
    issue_description NVARCHAR(500) NOT NULL,
    name              NVARCHAR(255) NOT NULL,
    zip_code          NVARCHAR(20)  NOT NULL,
    email             NVARCHAR(255) NOT NULL,
    created_at        DATETIME2     NOT NULL DEFAULT SYSDATETIME()
);
```

> The `DataSeeder` component auto-populates the `services` table with 8 records on application startup if it is empty.

Default SQL Server credentials configured in `application.properties`:

| Setting | Value |
|---|---|
| Host | `localhost:1433` |
| Database | `ServiceBookingDB` |
| Username | `sa` |
| Password | `Pass@word1` |

---

### Backend Setup

```bash
cd backend

# Build and run with Gradle wrapper
./gradlew bootRun

# Or on Windows
gradlew.bat bootRun
```

The API will start at `http://localhost:8080`.

To build a standalone JAR:

```bash
./gradlew build
java -jar build/libs/service-booking-0.0.1-SNAPSHOT.jar
```

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`.

Vite proxies all `/api/*` requests to `http://localhost:8080`, so no CORS issues in development.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## API Reference

Base URL: `http://localhost:8080/api`

### GET /api/services

Returns all available services.

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Cleaning",
    "description": "Professional home cleaning services"
  },
  {
    "id": 2,
    "name": "Plumbing",
    "description": "Expert plumbing repairs and installations"
  }
]
```

---

### POST /api/bookings

Creates a new booking.

**Request Body**
```json
{
  "serviceName": "Cleaning",
  "issueDescription": "Need a full house deep clean before moving in.",
  "name": "Jane Smith",
  "zipCode": "90210",
  "email": "jane@example.com"
}
```

**Response** `201 Created`
```json
{
  "id": 1,
  "serviceName": "Cleaning",
  "issueDescription": "Need a full house deep clean before moving in.",
  "name": "Jane Smith",
  "zipCode": "90210",
  "email": "jane@example.com",
  "createdAt": "2024-03-14T09:30:00"
}
```

---

### GET /api/bookings

Returns all bookings.

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "serviceName": "Cleaning",
    "issueDescription": "Need a full house deep clean before moving in.",
    "name": "Jane Smith",
    "zipCode": "90210",
    "email": "jane@example.com",
    "createdAt": "2024-03-14T09:30:00"
  }
]
```

---

## Network Call Flow

```
User opens app
  └── GET /api/services
        Frontend requests all services from the backend
        Backend queries the services table
        Returns Service[] — displayed as clickable cards on the Home page

User clicks a service card
  └── Navigates to /service/:id (no network call, data passed via router state)

User submits the booking form
  └── POST /api/bookings
        Frontend sends BookingFormData as JSON
        Backend validates, saves to bookings table, returns created Booking with id + createdAt
        Frontend navigates to /success and displays the booking confirmation
```

### CORS

The backend allows requests from `http://localhost:5173` on all `/api/**` routes for methods GET, POST, PUT, DELETE.

---

## Available Scripts

### Frontend (`/frontend`)

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start Vite dev server on port 5173 |
| Build | `npm run build` | Type-check + production build |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | Run ESLint |

### Backend (`/backend`)

| Script | Command | Description |
|---|---|---|
| Run | `./gradlew bootRun` | Start Spring Boot on port 8080 |
| Build | `./gradlew build` | Compile and package as JAR |
| Test | `./gradlew test` | Run unit tests |

---

## License

MIT
