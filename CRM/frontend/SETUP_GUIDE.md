
# NexusCRM: Local Setup Guide (Frontend + PHP Backend)

Follow these steps to get your professional CRM environment running locally.

## Step 1: Frontend Setup (React)
1. **Initialize Project**:
   ```bash
   npm create vite@latest nexus-crm -- --template react-ts
   cd nexus-crm
   npm install react-router-dom lucide-react
   ```
2. **Copy Files**: Place all the provided `.tsx`, `.ts`, and `.json` files into the `src` folder of your new project.
3. **Configure API**: Open `src/config/appConfig.ts` and ensure `API_BASE_URL` is set to `http://localhost:8000/api`.
4. **Run**: 
   ```bash
   npm run dev
   ```

## Step 2: Backend Setup (Laravel)
1. **Create Laravel App**:
   ```bash
   composer create-project laravel/laravel crm-backend
   cd crm-backend
   ```
2. **Install Sanctum (Auth)**:
   ```bash
   php artisan install:api
   ```
3. **Generate Code**: 
   - Open your favorite AI (Gemini).
   - Give it the `BACKEND_INSTRUCTION.md` file found in this project.
   - Ask: "Generate the Laravel Migrations, Models, and API Controllers for this CRM based on the attached specification."
4. **Environment**: Update `.env` with your database credentials (DB_DATABASE=nexus_crm).
5. **Database**:
   ```bash
   php artisan migrate
   ```
6. **Serve**:
   ```bash
   php artisan serve
   ```

## Step 3: Connection
Once both are running, go to `http://localhost:5173`. Your React frontend will now be making real API calls to your Laravel backend!
