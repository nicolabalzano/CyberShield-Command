FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# We will mount the code as a volume for development, 
# but copying it here is good practice for the image build.
COPY . .

CMD ["python", "app.py"]
