# 🐳 Docker Demo — Beginner's Guide

A simple web app to learn the basics of Docker: **build an image** and **run a container**.

---

## 📁 Project Structure

```
docker-demo/
├── Dockerfile     ← Instructions for building the image
└── index.html     ← Our web app (a simple HTML page)
```

---

## 🧠 Key Concepts (Quick Reference)

| Term          | Simple Meaning                                              |
|---------------|-------------------------------------------------------------|
| **Image**     | A snapshot/template of your app (like a ZIP file)          |
| **Container** | A running instance of an image (like an open app)          |
| **Dockerfile**| A recipe that tells Docker how to build your image         |
| **Port**      | A door through which your app talks to the outside world   |

---

## 🚀 Hands-On Steps

### Step 1 — Make sure Docker is installed
```bash
docker --version
# Expected output: Docker version 24.x.x, build ...
```

---

### Step 2 — Build the Docker image
```bash
docker build -t my-web-app .
```

**Breaking it down:**
- `docker build` → build an image
- `-t my-web-app` → give it the name (tag) `my-web-app`
- `.` → use the Dockerfile in the **current folder**

✅ You'll see Docker going through each step (FROM, COPY, EXPOSE, CMD).

---

### Step 3 — Run the container
```bash
docker run -d -p 8080:80 my-web-app
```

**Breaking it down:**
- `docker run` → start a new container
- `-d` → run in the background (detached mode)
- `-p 8080:80` → map your machine's port **8080** → container's port **80**
- `my-web-app` → the image to use

---

### Step 4 — Open your browser
Go to 👉 **http://localhost:8080**

You should see the Docker demo web page! 🎉

---

## 🔍 Useful Commands to Explore

```bash
# See all running containers
docker ps

# See ALL containers (including stopped ones)
docker ps -a

# See all images on your machine
docker images

# Stop a running container (replace <id> with the container ID)
docker stop <container-id>

# Remove a stopped container
docker rm <container-id>

# Remove an image
docker rmi my-web-app

# See logs from a running container
docker logs <container-id>
```

---

## 💡 What's Actually Happening?

```
Your Browser                  Your Machine              Docker Container
     |                             |                           |
     |  http://localhost:8080      |                           |
     |---------------------------->|                           |
     |                     Port mapping                        |
     |                    8080 → 80                           |
     |                             |-------------------------->|
     |                             |     Nginx serves          |
     |                             |     index.html            |
     |                             |<--------------------------|
     |<----------------------------|                           |
     |   HTML page displayed!      |                           |
```

---

## 🧪 Try This Challenge

1. Edit `index.html` — change the title or color.
2. Rebuild the image: `docker build -t my-web-app .`
3. Stop the old container and run a new one.
4. Refresh your browser — see the changes!

> **Why do you need to rebuild?** Because the image is a snapshot taken at build time. Changes to files on your machine don't automatically appear inside a container. (That's what *volumes* are for — a topic for next time!)

---

## 📌 Summary of Commands

```bash
docker build -t my-web-app .        # Build the image
docker run -d -p 8080:80 my-web-app # Run the container
docker ps                           # Check running containers
docker stop <id>                    # Stop the container
```
