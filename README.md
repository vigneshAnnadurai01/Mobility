# Aravindha's "v" Mobility 🚗

A modern, responsive cab booking website for **Aravindha's "v" Mobility**, providing reliable cab services across Coimbatore and Tamil Nadu.

## 🚕 About

**Aravindha's "v" Mobility** provides 24/7 cab services for local and outstation travel.

* 📍 Service Area: Coimbatore & All Over Tamil Nadu
* 🚗 Vehicle: Maruti Suzuki Ertiga
* 🕐 Availability: 24/7
* 📞 Phone: 7824983827
* 💬 WhatsApp: 7824983827
* 💰 Pricing: Contact for pricing

## ✨ Features

* Responsive mobile-friendly design
* Local cab booking
* Outstation booking
* Airport pickup & drop
* One-way trips
* Round trips
* Custom booking/enquiry
* WhatsApp booking
* Direct phone calling
* Route distance calculator
* Travel time estimation
* Toll information
* Toll-avoiding route option
* Interactive route map
* Customer booking ID generation
* Booking management
* Admin dashboard
* Booking calendar
* Customer review submission
* Review moderation
* SEO-friendly pages

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* FastAPI
* Python
* SQLite for local development
* PostgreSQL for production

### APIs

The application can integrate with external APIs for:

* Geocoding
* Route calculation
* Distance and travel time
* Toll information
* Maps

API keys are stored using environment variables and are **not committed to GitHub**.

## 📁 Project Structure

```text
aravindhas-v-mobility/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

> The exact folder structure may vary depending on the current project implementation.

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/aravindhas-v-mobility.git
cd aravindhas-v-mobility
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

### 4. Backend

If the project contains a FastAPI backend:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

## 🔐 Environment Variables

Create a `.env` file for local development.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000

# Add required API keys here
# ROUTING_API_KEY=
# GEOCODING_API_KEY=
# TOLL_API_KEY=
```

**Never commit `.env` files or API keys to GitHub.**

## 📱 Customer Booking Flow

```text
Customer visits website
        ↓
Selects service / trip type
        ↓
Enters pickup & destination
        ↓
Calculates route
        ↓
Views distance / travel time / toll information
        ↓
Submits booking enquiry
        ↓
Booking ID generated
        ↓
Customer contacts via WhatsApp / Phone
        ↓
Owner confirms booking
```

## 🧑‍💼 Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
View Bookings
     ↓
Check Booking Details
     ↓
Manage Booking Status
     ↓
View Booking Calendar
     ↓
Manage Customer Reviews
```

## 📞 Contact

**Aravindha's "v" Mobility**

📍 Coimbatore, Tamil Nadu, India

🚗 Maruti Suzuki Ertiga

📞 **7824983827**

💬 **WhatsApp: 7824983827**

🕐 **Available 24/7**

## 🌐 Services

* Local Cab
* Outstation Cab
* Airport Pickup
* Airport Drop
* One Way
* Round Trip
* Custom Booking / Enquiry

## 🔒 Security

The project follows basic security practices:

* API keys stored in environment variables
* `.env` excluded from Git
* Admin authentication
* Backend validation
* Input validation for booking forms
* No sensitive credentials committed to the repository

## 📦 Deployment

The application is designed to support free/low-cost deployment.

Possible deployment architecture:

```text
Customer
   ↓
Frontend
   ↓
Vercel / Cloudflare Pages
   ↓
Backend API
   ↓
FastAPI
   ↓
PostgreSQL
```

Environment variables should be configured separately in the production hosting platform.

## 📄 License

This project is intended for **Aravindha's "v" Mobility** business use.

© 2026 Aravindha's "v" Mobility. All rights reserved.
