# 📓 Notekar Web Application    (  https://notekar-frontend1.onrender.com )

**Notekar** is a secure, full-stack web application designed to help users create, manage,delete and organize personal notes in the cloud. With intuitive UI/UX, robust authentication, and real-time data operations, Notekar provides a seamless note-taking experience.

---

## 🌟 Key Features

- ✅ **User Authentication** – Secure registration and login using JSON Web Tokens (JWT).
- 🗃️ **Personalized Note Management** – Create, read, update, and delete notes tailored to each authenticated user.
- 📌 **Note Pinning** – Pin important notes to the top for quick access.
- 🎨 **Color Themes** – Assign various colors to notes for better organization and visual distinction.
- 🔄 **Sorting Options** – Sort notes by date or title in ascending or descending order.
- 📊 **View Modes** – Toggle between grid and list views for a personalized display of notes.
- 🧠 **Modal-Based Editing** – Edit notes efficiently with a modern modal popup interface.
- 💾 **Persistent Storage** – Notes are stored in a MongoDB database, accessible only by the authenticated user.
- 📱 **Responsive UI** – Clean and responsive frontend built with modern web technologies.

---

## 🖥️ Screenshots

### 📝 Registration Page

New users can sign up to start using Notekar.
<img width="1918" height="883" alt="image" src="https://github.com/user-attachments/assets/20628523-7c95-4d00-946e-f4d5e4124458" />


### 🔐 Login Page

Secure user login screen.
<img width="1918" height="770" alt="image" src="https://github.com/user-attachments/assets/40bb93a3-03b2-4ea9-bc58-b838742d13df" />


### 🏠 Home / Dashboard

Authenticated users can add,view, edit, and delete their notes.<br>

<img width="1918" height="905" alt="image" src="https://github.com/user-attachments/assets/1d494615-c103-4ea7-ae0e-dca0850e3896" /><br><br>


<img width="1913" height="873" alt="image" src="https://github.com/user-attachments/assets/fe2557e9-b984-4e8d-9412-ea71faf77e0d" /><br><br>


<img width="1897" height="758" alt="image" src="https://github.com/user-attachments/assets/cba6d22e-c670-4d00-a4c0-3ecdd93bb344" /><br><br>


<img width="1892" height="890" alt="image" src="https://github.com/user-attachments/assets/85b4733b-7abd-4758-9240-04c0328b5aef" /><br><br>


Authenticated users can sort their names based on date or title in increasing or decreasing order. Demonstrated in screenshot below.<br>

<img width="1881" height="797" alt="image" src="https://github.com/user-attachments/assets/4df54195-70dd-4f90-bffa-c9f61ac989a8" /><br>

Sorted by Title in Decreasing Order
<br>
### ✏️ Update Note Modal

Modern modal interface for editing existing notes.


---

## 🛠️ Technology Stack

### Frontend

- React.js
- HTML5 & CSS3
- Bootstrap
- Framer Motion (for animations)
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js

### Database

- MongoDB with Mongoose

### Authentication

- JWT (JSON Web Tokens)
- bcrypt.js for password hashing

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/ayushmanmishra18/Notekar # You might want to update this to your own repo URL
    cd notekar # Or 'cd notekar' if you rename the root folder
    ```

2.  **Install dependencies**

    Run the `install-dependencies.bat` script in the root directory:
    ```bash
    install-dependencies.bat
    ```
    This script will install all necessary packages for both frontend and backend.

3.  **Set up environment variables**

    *   Create a `.env` file in the **root directory** (for frontend) with the following:

        ```env
        REACT_APP_BACKEND_URL=http://localhost:5000
        ```

    *   Create a `.env` file in the **`backend` directory** with the following:

        ```env
        PORT=5000
        MONGODB_URI=mongodb://localhost:27017/notekar # Update if your MongoDB URI is different
        JWT_SECRET=your_jwt_secret_key_here # **IMPORTANT: Change this to a strong, unique secret!**
        ```

4.  **Run the application**

    First, ensure your MongoDB server is running.

    Then, run the `start-servers.bat` script in the root directory:
    ```bash
    start-servers.bat
    ```
    This script will open two terminal windows, one for the backend server and one for the frontend development server.

    *   Backend will be available at `http://localhost:5000`
    *   Frontend will be available at `http://localhost:3000`

---

## 🛡️ Security

- All API routes are protected using JWT.
- User passwords are hashed and salted using bcrypt.
- CORS and input validation implemented for secure data handling.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

---


