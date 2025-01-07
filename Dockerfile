# Use Ubuntu as the base image
FROM ubuntu:22.04

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    NODE_VERSION=18 \
    FLASK_APP=server.main \
    FLASK_ENV=production

# Install dependencies: Python, Node.js, and system tools
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    python3.10-venv \
    git \
    && curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app
COPY requirements.txt ./requirements.txt
RUN pip3 install fastapi[standard]
RUN python3 -m venv venv && /bin/bash -c "pip install -r requirements.txt && source venv/bin/activate"


COPY . .
# Copy React client code, install Node.js dependencies, and build the React app
RUN npm install
RUN cd client && npm install && npm run build

EXPOSE 8000
EXPOSE 4173

CMD ["npm", "run", "start"]