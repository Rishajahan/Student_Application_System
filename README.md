student-application-system/
│── student_backend/ # Django backend
│── student-frontend/ # Next.js frontend
│── workflows/ # n8n workflow JSON file
│── postman_collection/ # Postman collection for API testing

## ⚙️ Backend Setup (Django)

# Go to backend folder
cd student_backend
# Create virtual environment
python -m venv venv
venv\Scripts\activate   # (Windows)
# source venv/bin/activate  # (Linux/Mac)
# Install dependencies
pip install -r requirements.txt
# Run migrations
python manage.py migrate
# Start backend server
python manage.py runserver
Backend runs at: http://127.0.0.1:8000/

Frontend Setup (Next.js)
# Go to frontend folder
cd student-frontend
# Install dependencies
npm install
# Run development server
npm run dev
Frontend runs at: http://localhost:3000/

Ngrok (Expose Backend API)
# Run this in a new terminal
ngrok http 8000
Copy the https://xxxx.ngrok-free.app URL from ngrok.
Update your frontend API calls and n8n webhook to use this URL instead of http://127.0.0.1:8000.

Start n8n:
in new terminal
n8n
Open http://localhost:5678 in browser.
Import the provided workflow JSON (final.json).
Update the webhook URL inside n8n with your ngrok URL.(backend/views.py)
Example:
https://xxxx.ngrok-free.app/api/webhook/n8n/
Activate the workflow. 

API Testing with Postman
Import the post.postman_collection.json file into Postman.
Test endpoints:
POST /api/applications/ → Submit a new application
GET /api/applications/ → View all applications

The admin dashboard is protected by a login form.
Default credentials (change in code if needed):
Username: admin
Password: admin123
