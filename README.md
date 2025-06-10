# Pokédex Challenge - by [Your Name]

This is a solution to the Tevvo Build Software Developer Intern Challenge. It is a responsive Vue.js web application that fetches and displays data from the PokéAPI, includes user authentication via Supabase, and is unit tested with Vitest.

---

### **Live Demo**

**You can view the live application here: [Link to your deployed app on Netlify/Vercel]**

---

### **Core Features & Design Philosophy**

This project was built with the narrative of a "My First Pokédex" in mind, aiming for a clean, playful, and interactive user experience.

*   **User Authentication:** Secure login/logout flow managed by Supabase. Protected routes ensure only authenticated trainers can access the Pokédex.
*   **Dynamic Data Fetching:** Interacts with the public PokéAPI to fetch a list of Pokémon and their detailed information.
*   **Real-time Search:** A client-side search feature allows users to instantly filter the Pokémon list.
*   **Interactive UI:** Pokémon are displayed as holographic, 3D-tilting cards that react to the user's cursor for an engaging experience.
*   **Responsive Design:** The application is fully responsive and provides a seamless experience on mobile, tablet, and desktop devices.
*   **Animated Splash Screen:** A thematic splash screen provides an immersive entry into the application on the first visit of a session.

---

### **Tech Stack**

*   **Framework:** Vue 3 (Composition API)
*   **Routing:** Vue Router
*   **State Management:** Pinia
*   **Authentication Backend:** Supabase
*   **Styling:** Tailwind CSS
*   **Unit Testing:** Vitest

---

### **Setup and Local Development**

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[Your-GitHub-Username]/[Your-Repo-Name].git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd [Your-Repo-Name]
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    *   Create a file named `.env.local` in the root of the project.
    *   Add your Supabase project credentials to this file:
      ```
      VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
      VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
      ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

### **Testing**

This project uses Vitest for unit testing. The tests are co-located with the source code in a `__tests__` directory or with a `.spec.js` extension.

*   **To run the tests once:**
    ```bash
    npm run test:unit
    ```

*   **To run the tests and generate a coverage report:**
    ```bash
    npm run test:unit -- --coverage
    ```

#### **Test Coverage Report**

Here is the coverage report for the tested utility function, `src/utils/formatter.js`, demonstrating 100% test coverage for that module.

![Test Coverage Report](coverage.png)

---