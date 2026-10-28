# 🚖 Faster Bike Taxi Application System

A production-ready Bike Taxi Operations & Driver Onboarding Management Platform built with React, Spring Boot, and Vercel Serverless.

---

## 🌟 Features

- **Driver Onboarding & Application Management**: Fast multi-step driver registration with vehicle details, driving license, and emergency contact.
- **Operations Dashboard**: Real-time review console with application status lifecycle (`DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `DOCUMENT_VERIFICATION`, `BACKGROUND_CHECK`, `APPROVED`, `REJECTED`, `ON_HOLD`).
- **Document & Background Verification**: Verification workflow for driver documents and compliance audits.
- **Performance & Analytics**: Live ride metrics, completed/cancelled ride counters, customer ratings, earnings, and driver performance scoring.
- **Security & Audit Logs**: Detailed audit trail of all administrative actions and status updates with timestamps.
- **JWT Authentication & RBAC**: Role-based access control supporting `DRIVER` and `ADMIN` personas.

---

## 🚀 Hosting on Vercel

The project is structured with a **Dual-Architecture** design:

1. **Option 1: 100% Native Vercel Deployment (Zero External Server)**
   - Deploys the React SPA along with the Node.js Serverless API (`/api/index.js`).
   - Handles all auth, application CRUD, audit logs, and performance metrics without needing an external Java server running.
   - **Cost: $0 / Free Tier compatible.**

2. **Option 2: Hybrid Vercel (React Frontend) + Cloud Spring Boot Backend**
   - The React frontend is hosted on Vercel.
   - Set the environment variable `REACT_APP_API_URL` in Vercel to your Spring Boot backend URL (e.g., hosted on Render, Railway, or AWS).
   - Frontend automatically routes requests to your remote Spring Boot instance.

### Step-by-Step Vercel Deployment:

#### Method A: Via Vercel Web Dashboard (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New..."** -> **"Project"**.
3. Import your repository.
4. Keep the default settings:
   - **Framework Preset**: Create React App (or Other)
   - **Root Directory**: `./` (or leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `reactapp/build`
5. *(Optional)* If using external Spring Boot, add Environment Variable:
   - `REACT_APP_API_URL`: `https://your-springboot-backend.onrender.com`
6. Click **Deploy**. Your app will be live with full functionality!

#### Method B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🔑 Demo Accounts

For instant testing and evaluation on Vercel:

| Role | Username | Password | Access |
|---|---|---|---|
| **Admin** | `admin` | `admin123` | Full Operations Dashboard, Audit Logs, Status Updates, Document Verification |
| **Driver** | `driver1` | `driver123` | Fleet View, Application Submission, Personal Performance Stats |

*Tip: Quick login fill buttons are available directly on the Sign-in page!*

---

## 💻 Local Development

### 1. Frontend (React)
```bash
cd reactapp
npm install
npm start
```
Runs at: `http://localhost:8081`

### 2. Backend (Spring Boot)
```bash
cd springapp
mvn clean spring-boot:run
```
Runs at: `http://localhost:8080`

### 3. Running Backend via Docker
```bash
cd springapp
docker build -t faster-bike-taxi-backend .
docker run -p 8080:8080 faster-bike-taxi-backend
```

---

## 🧪 Testing

### React Frontend Tests (9/9 Passed)
```bash
cd reactapp
npm test -- --watchAll=false
```

### Spring Boot Backend Tests (20/20 Passed)
```bash
cd springapp
mvn test
```
