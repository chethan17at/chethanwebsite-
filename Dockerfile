# ============================================================
#  DOCKERFILE — Step-by-step guide for beginners
# ============================================================
#
#  A Dockerfile is like a RECIPE for building your container.
#  Docker reads each line from top to bottom and follows the
#  instructions to create your image.
#
#  BUILD the image :  docker build -t my-web-app .
#  RUN a container :  docker run -d -p 8080:80 my-web-app
#  VIEW in browser :  http://localhost:8080
# ============================================================


# ----------------------------------------------------------
# STEP 1 — Choose a base image
# ----------------------------------------------------------
# Every Docker image starts FROM another image.
# Think of it like choosing the operating system + software
# already pre-installed for you.
#
# Here we use "nginx:alpine":
#   • nginx  → a lightweight web server (serves HTML files)
#   • alpine → a tiny Linux distro (~5 MB), keeps image small
# ----------------------------------------------------------
FROM nginx:alpine


# ----------------------------------------------------------
# STEP 2 — Copy our app files into the container
# ----------------------------------------------------------
# COPY <source-on-your-machine>  <destination-inside-container>
#
# Nginx serves files from /usr/share/nginx/html by default.
# So we copy our index.html there.
# ----------------------------------------------------------
COPY index.html /usr/share/nginx/html/index.html


# ----------------------------------------------------------
# STEP 3 — Expose a port
# ----------------------------------------------------------
# This tells Docker (and other developers) that this container
# listens on port 80 inside.
#
# NOTE: This does NOT publish the port to your machine yet.
#       That happens with the  -p  flag when you run the container.
#       e.g.  -p 8080:80  means:
#             your laptop port 8080  →  container port 80
# ----------------------------------------------------------
EXPOSE 80


# ----------------------------------------------------------
# STEP 4 — Start the server
# ----------------------------------------------------------
# CMD is the command that runs when the container starts.
#
# "nginx -g daemon off;" starts Nginx in the foreground.
# Docker needs the process to stay in the foreground —
# if it exits, the container stops.
# ----------------------------------------------------------
CMD ["nginx", "-g", "daemon off;"]
