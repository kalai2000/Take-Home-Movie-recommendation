#  Use an official lightweight Python image
FROM python:3.11-slim

#  Set working directory
WORKDIR /app

#  Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#  Copy environment variables
COPY .env .env

#  Copy your FastAPI app code
COPY ./app ./app

#  Expose FastAPI's default port
EXPOSE 8000

#  Run app with live reload for dev
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]