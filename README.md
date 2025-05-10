# Barber Web Project

## Overview
This project is a web application for a barber shop that allows users to register, manage appointments, and access information about services offered. It integrates Firebase for user authentication and appointment management.

## Project Structure
```
barber-web-project
├── public
│   ├── index.html          # Main HTML entry point
│   ├── styles
│   │   └── main.css       # CSS styles for the website
│   └── scripts
│       └── main.js        # Main JavaScript file for client-side logic
├── src
│   ├── components
│   │   ├── header.html     # Header component
│   │   ├── footer.html     # Footer component
│   │   └── appointment-form.html # Appointment form component
│   ├── firebase
│   │   ├── firebase-config.js # Firebase configuration settings
│   │   └── auth.js         # User authentication functions
│   └── utils
│       └── helpers.js      # Utility functions
├── package.json            # npm configuration file
├── firebase.json           # Firebase deployment configuration
└── README.md               # Project documentation
```

## Features
- User registration and login using Firebase Authentication.
- Appointment management system for users to book and manage their appointments.
- Responsive design for a seamless user experience across devices.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd barber-web-project
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Configure Firebase:
   - Create a Firebase project and obtain your configuration settings.
   - Update `src/firebase/firebase-config.js` with your Firebase credentials.

5. Run the application:
   ```
   npm start
   ```

## Usage
- Access the application in your web browser at `http://localhost:3000`.
- Users can register, log in, and book appointments through the provided forms.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.