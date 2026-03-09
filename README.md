
# Weather Dashboard – DevOps Assignment 2

## Group Information
- **Nimna Wijerathne** - ITBIN-2313-0128 - Role: Frontend Developer
- **Demini Senarathna** - ITBIN-2313-0105 - Role: DevOps Engineer

## Project Description
A web-based weather dashboard that displays current weather and 5-day forecast using OpenWeatherMap API.

## Live Deployment
🔗 [Live URL](https://weather-dashboard-26.netlify.app)

## Technologies Used
- HTML5, CSS3, JavaScript
- OpenWeatherMap API
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Netlify (Hosting)

## Features
- Search weather by city
- Current weather details (temp, humidity, wind, pressure)
- 5-day forecast
- Responsive design

## Branch Strategy
- `main` – production branch
- `develop` – integration branch
- `feature/*` – feature development branches

## Individual Contributions
### Nimna Wijerathne (ITBIN-2313-0128)
- Frontend UI design and implementation
- Responsive layout with CSS
- Integration testing with API responses

### Demini Senarathna (ITBIN-2313-0105)
- JavaScript logic for API integration
- Error handling and data processing
- Docker containerization (Dockerfile, docker-compose.yml, .dockerignore)
- CI/CD pipeline configuration (GitHub Actions workflows)
- Deployment setup on Netlify

## Docker Setup
### Prerequisites
- Docker and Docker Compose installed
- Git

### Build and Run with Docker
```bash
# Clone the repository
git clone https://github.com/deminisenarathne-glitch/Weather-App.git
cd Weather-App

# Build the Docker image
docker build -t weather-app .

# Run the container

docker run -p 8080:80 weather-app
