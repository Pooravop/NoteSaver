@echo off
echo Installing Frontend Dependencies...
cd frontend
call npm install react-router-dom axios framer-motion @mui/material @mui/icons-material @emotion/react @emotion/styled

echo Installing Backend Dependencies...
cd ../backend
call npm install express mongoose bcryptjs jsonwebtoken cors dotenv express-validator

echo All dependencies installed successfully!
pause 