# GENDER REPORTING SYSTEM

### _Empowering Justice through Secure and Anonymous Incident Reporting_

![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=for-the-badge)

## 📌 Project Identity

The **Gender Reporting System** is a professional-grade platform built to solve the critical problem of under-reporting in gender-based violence and harassment. By providing a secure, anonymous, and guided reporting environment, it lowers the barrier for victims and informants to seek help while ensuring that law enforcement and administrators have structured data to investigate incidents effectively.

## 🛠 Tech Stack Overview

| Category             | Technology                                                                  |
| :------------------- | :-------------------------------------------------------------------------- |
| **Framework**        | [Laravel 11](https://laravel.com/) (PHP 8.2+)                               |
| **Frontend**         | [React 19](https://react.dev/) with [Inertia.js](https://inertiajs.com/)    |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                               |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand)                                |
| **UI Components**    | [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/) |
| **Styling**          | [Tailwind CSS v4](https://tailwindcss.com/)                                 |
| **Icons**            | [Lucide React](https://lucide.dev/)                                         |
| **Authentication**   | [Laravel Fortify](https://laravel.com/docs/11.x/fortify)                    |

## ✨ Key Features

1.  **Anonymous Reporting Flow:** Victims can choose to remain fully anonymous, automatically skipping informant identification steps while maintaining legal validity.
2.  **6-Step Incident Stepper:** A guided, structured process for documenting Informants, Victims, Accused Details, and Incident Specifics with real-time validation.
3.  **UUID-Based Secure Tracking:** Every report generates a unique, non-sequential tracking ID (UUID) allowing users to monitor progress without a permanent account.
4.  **Quick Exit Safety Mechanism:** A "panic button" that instantly redirects the user to a neutral site (e.g., weather reports) and wipes local form state for immediate safety.
5.  **Multi-Role Management:** Dedicated dashboards for **Admins** (system oversight) and **Officers** (case investigation and assignment).

## 🚀 Getting Started

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repo-url>
    cd laravel-react-gender-appV3
    ```

2.  **Install PHP dependencies:**

    ```bash
    composer install
    ```

3.  **Install Node dependencies:**

    ```bash
    npm install
    ```

4.  **Setup Environment:**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5.  **Database Migration & Seeding:**
    ```bash
    php artisan migrate --seed
    ```

### Execution

- **Development Mode:**
    ```bash
    npm run dev
    # In a separate terminal
    php artisan serve
    ```
- **Production Build:**
    ```bash
    npm run build
    ```

## 🏗 Architecture Deep-Dive

The project follows a modern **Modular Monolith** architecture using Inertia.js to bridge the gap between Laravel and React.

- **`resources/js/hooks/store/`**: Contains the `useStepperFormStore.ts`, a sophisticated Zustand store that manages the complex state of the multi-step reporting form, including persistence and conditional step skipping.
- **`resources/js/components/`**: Divided into `ui/` (Shadcn primitives) and specialized folders like `reporter/` for business-specific logic.
- **`resources/js/hooks/`**: Houses utility hooks like `useAppearance.tsx` for theme management and `useTwoFactorAuth.ts` for security.
- **`app/Models/`**: Utilizes UUIDs (`HasUuids`) across all incident-related models to prevent ID enumeration and enhance privacy.

## 🔑 Environment Variables

Required keys in your `.env` file:

| Key              | Description                      | Default            |
| :--------------- | :------------------------------- | :----------------- |
| `DB_CONNECTION`  | Database driver                  | `sqlite`           |
| `SESSION_DRIVER` | Storage for session data         | `database`         |
| `APP_URL`        | Base URL of the application      | `http://localhost` |
| `VITE_APP_NAME`  | App name visible in the frontend | `${APP_NAME}`      |

## 🔍 Component Highlights

### Case Tracking Flow

The system utilizes the `CaseTrackingId` component to deliver the tracking UUID post-submission.

- **Security:** The ID is displayed only once and cannot be recovered if lost.
- **Privacy:** Masking logic ensures the ID is only visible when the user explicitly clicks the "Show ID" button.

### Theme Switching Logic

The `ChangeTheme` component provides a seamless transition between **Light**, **Dark**, and **System** modes.

- **Persistence:** Choices are stored locally and synced with the server via the `HandleAppearance` middleware.
- **Aesthetics:** Uses Tailwind 4 variable mapping to ensure consistent contrast and accessibility across all themes.

---

_Created and maintained with ❤️ for victim safety._
