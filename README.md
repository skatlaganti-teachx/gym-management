# 🏋️‍♂️ Gym Management Application

This monorepo contains a Gym Management application built with a React frontend and a FastAPI backend. The application is containerized using Docker for easy deployment.

## ✨ Features

- **Member Management**: Add, view, and update gym members.
- **Attendance Tracking**: Record and monitor member attendance.
- **Fee Management**: Manage membership fees and payment statuses.

## 🛠️ Tech Stack

**Frontend**:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A fast frontend build tool and development server.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [Jotai](https://jotai.org/): Primitive and flexible state management for React.
- [Day.js](https://day.js.org/): A minimalist JavaScript library for parsing, validating, manipulating, and formatting dates.
- [shadcn/ui](https://ui.shadcn.dev/): A collection of accessible and customizable UI components for React.
- [Ant Design Charts](https://charts.ant.design/): A React charting library for data visualization.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Zod](https://zod.dev/): TypeScript-first schema declaration and validation library.
- [React Icons](https://react-icons.github.io/react-icons/): Include popular icons in your React projects easily.


**Backend**:

- [FastAPI](https://fastapi.tiangolo.com/): A modern, fast (high-performance) web framework for building APIs with Python 3.6+ based on standard Python type hints.
- [SQLite](https://www.sqlite.org/index.html): A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.

**Containerization**:

- [Docker](https://www.docker.com/): A platform to develop, ship, and run applications inside containers.


## 🛠️ Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
## 🚀 Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/shujaalik/gym-management.git
   cd gym-management

2. **Build and Start the Application**:

    #### Ensure Docker is running, then execute:

    ```bash
    docker build -t gym-management-app .
    ```

    ```bash
    docker run -p 8000:8000 -p 3000:3000 gym-management-app
    ```


    #### Access the Application:

    - Frontend (Vite React): [http://localhost:3000](http://localhost:3000)
    - Backend (FastAPI endpoints): [http://localhost:8000](http://localhost:8000)
    - Backend (FastAPI docs): [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

```bash
    gym-management/
    ├── client/                 # React frontend
    ├── server/                 # FastAPI backend
    ├── db.db                   # SQLite database file
    ├── Dockerfile              # Dockerfile for containerizing the     application
    ├── requirements.txt        # Python dependencies for FastAPI
    └── README.md               # Project documentation
```

## 📋 API Endpoints

#### The backend exposes the following API endpoints:
For detailed API documentation, visit: [http://localhost:8000/docs](http://localhost:8000/docs)

- **Members**:

    - ```POST /add_member```: Add a new member.
    - ```GET /members```: Retrieve all members.
    - ```POST /update_fee_status```: Update fee status for a member.

- **Attendance**:

    - ```POST /record_attendance```: Record check-in or check-out.
    - ```GET /attendance```: Retrieve attendance records.

## 👤 Author

M Shuja Ali
Full-Stack Web Developer from Karachi, Pakistan. Currently working at KunjiSoft Technologies.

- GitHub: [@shujaalik](https://github.com/shujaalik)
- Portfolio: [shujaalik.com](http://shujaalik.com)
- Email: [me@shujaalik.com](mailto:me@shujaalik.com)

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.