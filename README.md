# 📓 NoteSaver Web Application    (  https://noteSaver-frontend1.onrender.com )

**NoteSaver** is a secure, full-stack web application designed to help users create, manage,delete and organize personal notes in the cloud. With intuitive UI/UX, robust authentication, and real-time data operations, Notekar provides a seamless note-taking experience.

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

New users can sign up to start using NoteSaver.
<img width="1918" height="837" alt="image" src="https://github.com/user-attachments/assets/00974430-2d27-4105-ad3c-2ff9bca79ab8" />



### 🔐 Login Page

Secure user login screen.
<img width="1918" height="896" alt="image" src="https://github.com/user-attachments/assets/a82f1c22-faa9-4b45-94de-b1517f671268" />



### 🏠 Home / Dashboard

Authenticated users can add,view,search,delete and edit their notes.<br>

<img width="1895" height="977" alt="image" src="https://github.com/user-attachments/assets/fd7aa321-b67e-4778-a01a-16bbf0ac2db2" />

<img width="1918" height="906" alt="image" src="https://github.com/user-attachments/assets/41e8f208-6317-46fc-a5cb-2f47dd75a9d1" />
<br><br>

<img width="1913" height="513" alt="image" src="https://github.com/user-attachments/assets/98fd8fa1-4e7b-4d3e-9907-dde19b4182eb" /><br><br>


<img width="1917" height="516" alt="image" src="https://github.com/user-attachments/assets/e1123ecc-5404-420b-893e-b58490cd8f11" /><br><br>

<img width="1910" height="912" alt="image" src="https://github.com/user-attachments/assets/e7351c45-36f1-44c1-a354-4bc6a78daf0c" /><br><br>

Authenticated users can sort their names based on date or title in increasing or decreasing order. Demonstrated in screenshot below.<br>

<img width="1890" height="503" alt="image" src="https://github.com/user-attachments/assets/8a83baf1-5aa1-4010-8ff0-cc1fb36c9419" />
<br>

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
    git clone https://github.com/Pooravop/NoteSaver # You might want to update this to your own repo URL
    cd noteSaver # Or 'cd notekar' if you rename the root folder
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
        MONGODB_URI=mongodb://localhost:27017/Saver # Update if your MongoDB URI is different
        JWT_SECRET=super_encrypted_secret_key_here # **IMPORTANT: Change this to a strong, unique secret!**
        ```

4.  **Run the application**

    First, ensure your MongoDB server is running.

    Then, run - npm run dev in backend. After backend starts successfully and mongo db is connected.
    *   Backend will be available at `http://localhost:5000`
  
    Then, run - npm start
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


