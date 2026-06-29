# 🐉 Game of Thrones — Westeros Website

A fully immersive, nature-themed, 3D Game of Thrones fan website built with HTML, CSS, and JavaScript. Served via Nginx inside Docker.

## Features
- 🌿 Nature dark theme (forest greens, gold, ice blue)
- 🃏 3D flip cards for all Great Houses
- ✨ Firefly & snowflake particle system
- 🗺️ Interactive map of Westeros
- 🧙 Character showcase with tilt 3D effect
- 🖼️ Hover gallery with reveal animations
- 📜 Typewriter quote animation
- 🐉 Dragon easter egg (click the dragon!)
- 📱 Fully responsive

## Run with Docker
```bash
docker build -t got-website .
docker run -d -p 8080:80 got-website
```
Open → http://localhost:8080
