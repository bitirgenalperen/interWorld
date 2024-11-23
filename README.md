# InterWorld - Software Development and Requirements Documentation

Date: 23.09.2024

Version: 1.0

| Version number | Change |
| ----------------- |:-----------|
| 1.0 | Planning of the Initial Deployable Project Version |

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1. Features](#11-features)
  - [1.2. Installation](#12-installation)
  - [1.3. Tech Stack](#13-tech-stack)
    - [1.3.1. Technologies Used](#131-technologies-used)
    - [1.3.2. System Architecture](#132-system-architecture)
    - [1.3.3. Roles and Permissions (RBAC)](#133-roles-and-permissions-rbac)
    - [1.3.4. Usage](#134-usage)
- [2. Stakeholders](#2-stakeholders)
- [3. Context Diagram and Interfaces](#3-context-diagram-and-interfaces)
  - [3.1. Context Diagram](#31-context-diagram)
  - [3.2. Interfaces](#32-interfaces)
- [4. Stories and Personas](#4-stories-and-personas)
- [5. Functional and Non-functional Requirements](#5-functional-and-non-functional-requirements)
  - [5.1. Functional Requirements](#51-functional-requirements)
  - [5.2. Non-functional Requirements](#52-non-functional-requirements)
- [6. Use Case Ciagram and Use Cases](#6-use-case-diagram-and-use-cases)
  - [6.1. Use Case Diagram](#61-use-case-diagram)
  - [6.2. Use cases](#62-use-cases)
    - [Log In, UC1](#log-in-uc1)
    - [Log Out, UC2](#log-out-uc2)
    - [Create Account, UC3](#create-account-uc3)
    - [Reset Password, UC4](#reset-password-uc4)
    - [Get Projects, UC5](#get-projects-uc5)
    - [Create Project, UC6](#create-project-uc6)
    - [Update Project, UC7](#update-project-uc7)
    - [Delete Project, UC8](#delete-project-uc8)
    - [Search Properties, UC9](#search-properties-uc9)
    - [Create Booking, UC10](#create-booking-uc10)
    - [Add Property to Favorites, UC11](#add-property-to-favorites-uc11)
    - [Remove Property from Favorites, UC12](#remove-property-from-favorites-uc12)
    - [List Favorite Properties, UC13](#list-favorite-properties-uc13)
    - [Update User Profile, UC14](#update-user-profile-uc14)
    - [Initiate Chat with Agent, UC15](#initiate-chat-with-agent-uc15)
    - [Schedule Video Call with Agent, UC16](#schedule-video-call-with-agent-uc16)
    - [Leave Review to Agent, UC17](#leave-review-to-agent-uc17)
    - [View Agent Reviews, UC18](#view-agent-reviews-uc18)
    - [Compare Properties, UC19](#compare-properties-uc19)
    - [Calculate Mortgage, UC20](#calculate-mortgage-uc20)
- [7. Graphical User Interface Prototype](#7-graphical-user-interface-prototype)
  - [7.1. Sitemap](#71-sitemap)
  - [7.2. Homepage](#72-homepage)
  - [7.3. Projects Page](#73-projects-page)
    - [7.3.1. Project Details Page](#731-project-details-page)
    - [7.3.2. Edit Project Details](#732-edit-project-details)
  - [7.4. Bookings Page](#74-bookings-page)
    - [7.4.1. Edit Booking Details](#741-edit-booking-details)
  - [7.5. Profile Page](#75-profile-page)
  - [7.6. Agents Page](#76-agents-page)
    - [7.6.1. Edit Agent Details](#761-edit-agent-details)
  - [7.7. User Access Pages](#77-user-access-pages)
    - [7.7.1. Login Page](#771-login-page)
    - [7.7.2. Sign Up Page](#772-sign-up-page)
- [8. Glossary](#8-glossary)
- [9. System Design](#9-system-design)
- [10. Deployment Diagram](#10-deployment-diagram)
- [11. Contact](#11-contact)

---

### 1. Overview

The ***InterWorld*** Web Application is designed to streamline property bookings, project management, and user engagement in the real estate sector. It provides a platform for users to browse real estate projects, book appointments, and manage their preferences, while offering role-based access control (RBAC) to ensure data security and appropriate access rights. It provides a centralized, user-friendly system that allows real estate managers, agents, and clients engagement in a secure and efficient manner.

#### 1.1. Features

- User Authentication: Users can register, log in, and log out securely using session-based authentication with Passport.js.
- Role-Based Access Control (RBAC): Roles are defined for clients, agents, and managers, with varying levels of permissions.
- Project Management: Managers can create, update, and delete real estate projects.
- Bookings: Users can book appointments for specific real estate projects with agents speaks their language of preference.
- Profile Management: Users can update personal information, including contact preferences and language selections.
- Multilingual Support: The app supports multiple languages: English, Chinese, Turkish, Russian, Urdu, Hindi, Malay, and French.
- Responsive UI: Built with React and Bootstrap for a clean, mobile-friendly user experience.

#### 1.2. Installation

Follow the below steps to install and run the project locally:

```bash
# Clone the repository
git clone https://github.com/username/real-estate-app.git

# Navigate to the project directory
cd real-estate-app

# Install dependencies for both backend and frontend
npm install    # Frontend dependencies
cd backend
npm install    # Backend dependencies

# Set up environment variables (create a .env file)
# Example for .env file
DATABASE_URL=your_mongo_database_url
SESSION_SECRET=your_session_secret

# Start the backend server (from /backend directory)
node server.js

# Start the frontend React development server (from the root directory)
npm start

```

#### 1.3. Tech Stack

##### 1.3.1 Technologies Used

- Frontend:
  - React: JavaScript library for building the user interface.
  - Bootstrap: CSS framework for styling the app and ensuring a responsive design.
  - Axios: HTTP client to handle API requests.

- Backend:
  - Express.js: Web framework for Node.js.
  - Passport.js: User authentication and session management.
  - MongoDB: NoSQL database for storing user data, projects, and bookings.
  - Mongoose: ODM for interacting with MongoDB.
  - Bcrypt.js: Password hashing for secure user authentication.

##### 1.3.2. System Architecture

The application follows a client-server architecture. The frontend is built with React and communicates with the backend server (Express.js) through a REST API. The backend manages user authentication, project data, and appointment bookings, while MongoDB stores all application data.

- Frontend: React app handles the UI and communicates with the server via API endpoints.
- Backend: Express.js with Passport.js for authentication, managing requests, and interfacing with the MongoDB database.
- Database: MongoDB is used for storing user information, projects, and bookings.

##### 1.3.3. Roles and Permissions (RBAC)

The application implements Role-Based Access Control (RBAC) to manage user permissions:

- Manager:
  - Can create, update, or delete projects.
  - Can manage Agents by creating or removing their accounts.

- Agent:
  - Can update their own profile details except for the email and full name.
  - Must provide at least one language spoken and update contact details.

- Client:
  - Can update personal details such as communication preferences and preferred languages.
  - Can book appointments for any available real estate projects.

##### 1.3.4. Usage

- Sign-Up/Login:
  - Users can register via the /register endpoint by providing the details and language(s) of their preference, and after registration, they will be automatically logged in.
  - Existing users can log in via the /login endpoint using their credentials.
- Project Management:
  - Managers can create, update, or delete real estate projects via the /api/projects endpoints.
- Booking Appointments:
  - Users can book time slots for projects through the /api/bookings endpoint, providing an agent ID project ID and the desired time slot.
- Profile Management:
  - Users can manage their personal information. Agents and Clients must specify languages they speak can or want to communicate with. Clients can set communication preferences of either via Mobile Phone or Email.

---

### 2. Stakeholders

| Stakeholder name  | Description |
| ----------------- |:-----------:|
|   Manager | Oversees and manages the real estate projects on the platform. Has full control over adding, updating, and deleting projects and managing agents.|
|   Agent | Works under the manager's supervision. Agents can manage their profiles and are responsible for handling client inquiries and facilitating bookings.|
|   Client | Users interested in viewing real estate projects and booking appointments. They can manage their personal details, communication preferences, and language preferences.|

---

### 3. Context Diagram and Interfaces

#### 3.1. Context Diagram

![Context Diagram](./documentation_media/contextDiagram.svg)

#### 3.2. Interfaces

| Actor | Logical Interface | Physical Interface  |
| ------------- |:-------------:| -----:|
|   Manager     |API for Project Management|Admin Panel (dashboard for managing projects)|
|   Manager     |API for Agent Management|Admin Panel (dashboard for managing agents)|
|   Agent     |API for Appointment Management|Agent Dashboard (for managing schedules, properties, and interactions with clients)|
|   Client     |API for Property Search and Booking|Property Search Page, Booking Page (where users can filter, view, and book properties)|
|   Client     |API for Profile Management|User Profile Page (for managing personal details and communication preferences)|

---

### 4. Stories and Personas

- Persona 1: High-income professional, male, married, with children, 45 years old
  - Story: John is a senior executive at a multinational company who is looking to invest in real estate. With a busy schedule, John prefers browsing properties online and narrowing down his choices based on location, size, and price. He uses the platform’s recommendation system to find properties in areas with good schools for his children. John values the booking feature that allows him to schedule viewings with agents at his convenience. He also relies on the mortgage calculator to estimate payments.
- Persona 2: Real estate manager, female, married, 50 years old
  - Story: Maria is a manager overseeing multiple real estate projects. She uses the platform to add, update, and remove project listings for her portfolio. Maria appreciates the system’s ability to manage agents and track their interactions with clients. The property comparison tool helps her highlight competitive advantages when negotiating with potential buyers. Maria regularly checks booking statistics to analyze agent performance and ensure that clients are receiving timely service.
- Persona 3: Part-time worker, student, female, single, 23 years old
  - Story: Sophia is a university student working part-time. She is planning to move closer to campus and uses the property search feature to look for affordable studio apartments within her budget. Sophia sets filters for size and price range and receives notifications for new listings that meet her preferences. Since she’s unfamiliar with the neighborhoods, she checks the detailed insights for each property, such as crime rates and proximity to public transport.
- Persona 4: Real estate agent, male, single, 35 years old
  - Story: David is a real estate agent working under a manager. His role involves responding to client inquiries and scheduling property viewings. He often uses the platform’s real-time chat feature to communicate directly with potential buyers and provide them with additional property details. David also schedules video calls to give virtual tours to international clients. He keeps his profile updated, including the languages he speaks, to attract a diverse client base.
- Persona 5: Tech-savvy homebuyer, female, married, no children, 28 years old
  - Story: Emma is a software developer who is currently looking for her first home. She loves the clean, responsive interface of the platform, especially its dark mode. Emma uses the advanced filtering options to search for properties close to public transportation and technology hubs. She frequently saves properties to her favorites list and uses the comparison tool to weigh her options. Emma plans to use the mortgage calculator to explore different financing options before making an offer.

---

### 5. Functional and Non-functional Requirements

#### 5.1. Functional Requirements

| ID        | Description  |
| ------------- |:-------------:|
|FR1| Manage Access|
|FR1.1|Log In|
|FR1.2|Log Out|
|FR1.3|Create Account|
|FR1.4|Reset Password|
|FR2|Manage Projects|
|FR2.1|Get Projects|
|FR2.2|Create Project|
|FR2.3|Update Project|
|FR2.4|Delete Project|
|FR3|Search and Filter Properties|
|FR3.1|Search Properties by City, Price, Size, Type|
|FR3.2|Filter Properties by Size, City, District, Price|
|FR3.3|Advanced Filters (Schools, Amenities, Transportation)|
|FR4|Manage Bookings|
|FR4.1|Create Booking|
|FR4.2|Cancel Booking|
|FR4.3|List Bookings (Client/Agent/Manager views)|
|FR5|Manage Property Recommendations|
|FR5.1|Based on User Preferences|
|FR5.2|Based on User Activity|
|FR6|Manage Favorites|
|FR6.1|Add Property to Favorites|
|FR6.2|Remove Property from Favorites|
|FR6.3|List Favorite Properties|
|FR7|Manage User Profile|
|FR7.1|Update User Details|
|FR7.2|View Profile Information|
|FR8|Real-time Communication|
|FR8.1|Initiate Chat|
|FR8.2|Schedule Video Call|
|FR9|Evaluate Agents|
|FR9.1|Leave Review|
|FR9.2|View Reviews|
|FR10|Compare Property|
|FR10.1|By Features|
|FR10.2|By Neighborhood Insights (Crime Rates, Schools, Public Transport)|
|FR11|Calculate Mortgage|
|FR11.1|Input Mortgage Details (Price, Down Payment, Interest Rate)|
|FR11.2|Calculate Monthly Payments|

#### 5.2. Non-functional Requirements

| ID        | Type   | Description  | Refers to |
| ------------- |:-------------:| :-----:| -----:|
|  NFR1     | Efficiency  | Each function should execute within 1 second for optimal performance. | FR1, FR2, FR3, FR5 |
|  NFR2     | Reliability | The system must ensure 99.9% uptime for continuous availability. | All functions |
|  NFR3     | Security | Data transmission must be encrypted using TLS for secure user interactions and personal data protection. | FR1, FR3, FR8 |
|  NFR4 | Usability |The user interface should be intuitive, requiring no more than 10 minutes of training for users to become proficient. | FR1, FR2, FR5, FR9 |
|  NFR5 | Maintainability | The codebase should be modular and maintainable, allowing for updates and feature additions without significant refactoring. | All functions |
|  NFR6 | Localization | The system must support multi-language functionality, allowing users to seamlessly switch between supported languages (English, Turkish, Chinese, etc.). | FR5.1, FR5.2, FR8 |
|  NFR7 | Backup & Recovery | All data should be backed up dailly, with the ability to recover within 30 minutes of an outage. | All data-related functions |

---

### 6. Use Case Diagram and Use Cases

#### 6.1 Use Case Diagram

![Use Case Diagram](./documentation_media/usecaseDiagram.svg)

#### 6.2 Use Cases

### Log In, UC1

| Actors Involved        | Client, Agent, Manager |
| ------------- |:-------------:|
|  Precondition     | User not logged in, user registered |
|  Post condition     | User logged in |
|  Nominal Scenario     | Scenario 1.1|
|  Variants     | Scenario 1.2, Scenario 1.3, Scenario 1.4|
|  Exceptions     | System unavailable, network failure|

#### Scenario 1.1

| Scenario 1.1 | Successful Login|
| ------------- |:-------------:|
|  Precondition     | User not logged in, user registered|
|  Post condition     | User logged in|
| Step#        | Description  |
|  1     |  System: Ask for email and password|  
|  2     |  User: Provide email and password.|
|  3   | System: Check if the user is not already logged in. |
|  4   | System: Retrieve user by email and validate the password. |
|  5   | System: If valid, authorize the user and log them in. |

#### Scenario 1.2

| Scenario 1.2 | Wrong Password|
| ------------- |:-------------:|
|  Precondition     | User not logged in, user registered|
|  Post condition     | User not logged in|
| Step#        | Description  |
|  1     |  System: Ask for email and password|  
|  2     |  User: Provide email and password.|
|  3   | System: Check credentials. Password does not match. |
|  4   | System: Display an error message (incorrect credentials). |

##### Scenario 1.3

| Scenario 1.2 | User Not Registered|
| ------------- |:-------------:|
|  Precondition     | User not logged in, user not registered|
|  Post condition     | User not logged in|
| Step#        | Description  |
|  1     |  System: Ask for email and password|  
|  2     |  User: Provide email and password.|
|  3   | System: Check credentials. User not found. |
|  4   | System: Display an error message (user not registered).|

### Log Out, UC2

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User logged in |
|  Post condition     | User logged out |
|  Nominal Scenario     | Scenario 2.1|
|  Variants     | Scenario 2.2 (User already logged out) |
|  Exceptions     | System failure during logout |

#### Scenario 2.1

| Scenario 2.1 | Log Out |
| ------------- |:-------------:|
|  Precondition     | User logged in|
|  Post condition     | User logged out |
| Step#        | Description  |
|  1     | User: Clicks on the "Log Out" button. |  
|  2     | System: Verify user session and invalidate it.|
|  3  | System: Remove authorization token or session cookie. |
|  4  | System: Display a confirmation message (successful logout). |

#### Scenario 2.2

| Scenario 2.2 | User Already Logged Out|
| ------------- |:-------------:|
|  Precondition     | User not logged in|
|  Post condition     | User not logged in|
| Step#        | Description  |
|  1     | User: Attempts to log out (while already logged out). |  
|  2     | System: Verify that the user is not logged in. |
|  3    | System: Return an error message (no active session). |

### Create Account, UC3

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User does not have an account |
|  Post condition     | Account created |
|  Nominal Scenario     | Scenario 3.1|
|  Variants     | Scenario 3.2 (User already registered) |
|  Exceptions     | System error, invalid input, email already in use |

#### Scenario 3.1

| Scenario 3.1 | Create Account|
| ------------- |:-------------:|
|  Precondition     | User does not have an account |
|  Post condition     | Account created|
| Step#        | Description  |
|  1     | User: Requests account creation. |  
|  2     | System: Ask for username, email, and password. |
|  3   | User: Provides username, email, and password. |
|  4 | System: Check if the email is already registered. |
|  5 | System: If valid, create account and log in the user. |

##### Scenario 3.2

| Scenario 3.2 | Email Already in Use |
| ------------- |:-------------:|
|  Precondition     | User tries to create an account with an email already in use|
|  Post condition     | Account creation failed|
| Step#        | Description  |
|  1     | User: Requests account creation.|  
|  2     | System: Ask for username, email, and password. |
|  3   | User: Provides an email already registered. |
|  4   | System: Display an error message (email already in use). |

### Reset Password, UC4

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User forgot password or wants to reset |
|  Post condition     | Password reset |
|  Nominal Scenario     | Scenario 4.1|
|  Variants     | Scenario 4.2 (Invalid email), Scenario 4.3 (Invalid token) |
|  Exceptions     | Email delivery failure |

#### Scenario 4.1

| Scenario 4.1 | Reset Password |
| ------------- |:-------------:|
|  Precondition     | User forgot password |
|  Post condition     | Password reset |
| Step#        | Description  |
|  1     | User: Requests to reset password. |  
|  2     | System: Asks for registered email. |
|  3   | User: Provides email. |
|  4     | System: Sends reset token to the provided email. |  
|  5     | User: Clicks on the token link, provides new password. |
|  6   | System: Updates password and confirms the reset. |

##### Scenario 4.2

| Scenario 4.2 | Invalid Email|
| ------------- |:-------------:|
|  Precondition     | User provides an invalid email for password reset|
|  Post condition     | Password reset failed|
| Step#        | Description  |
|  1     | User: Requests password reset. |  
|  2     | System: Asks for registered email. |
|  3    | User: Provides an unregistered email. |  
|  4     | System: Displays an error message (email not found). |

### Get Projects, UC5

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in|
|  Post condition     | List of projects is displayed|
|  Nominal Scenario     | Scenario 5.1|
|  Variants     | None |
|  Exceptions     | Scenario 5.2 |

#### Scenario 5.1

| Scenario 5.1 | Retrieve list of projects|
| ------------- |:-------------:|
|  Precondition     | User is logged in |
|  Post condition     | List of available projects is displayed |
| Step#        | Description  |
|  1     | User: Navigates to the 'Projects' section in the dashboard |  
|  2     | System: Fetches and displays a list of projects available for management |
|  3     | User: Views the list of projects |

##### Scenario 5.2

| Scenario 5.2 | Handle no available projects |
| ------------- |:-------------:|
|  Precondition     | User is logged in, but no projects are available |
|  Post condition     | Displays an appropriate message |
| Step#        | Description  |
|  1     | User: Navigates to the 'Projects' section |  
|  2     | System: Displays a message that no projects are available or an option to create a new project |

### Create Project, UC6

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in|
|  Post condition     | A new project is created and added to the project list|
|  Nominal Scenario     | Scenario 6.1|
|  Variants     | None |
|  Exceptions     | Scenario 6.2 |

#### Scenario 6.1

| Scenario 6.1 | Create a new project|
| ------------- |:-------------:|
|  Precondition     | User is logged in as Admin or Manager |
|  Post condition     | New project is added to the list of projects |
| Step#        | Description  |
|  1     | User: Navigates to the 'Create Project' option in the dashboard |  
|  2     | System: Prompts for project details (name, description, budget, timeline, etc.) |
|  3     | User: Enters the project details |
|  4     | System: Validates the input (e.g., checks for required fields) |
|  5   | System: Saves the new project and confirms the creation |
|  6   | System: Displays the new project in the project list |

##### Scenario 6.2

| Scenario 6.2 | Handle invalid input during project creation |
| ------------- |:-------------:|
|  Precondition     | User is attempting to create a new project |
|  Post condition     | Displays error message and prompts for correction |
| Step#        | Description  |
|  1     | User: Enters invalid project details (e.g., missing required fields, invalid budget) |  
|  2     | System: Displays an error message and prompts the user to correct the input |

### Update Project, UC7

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in as Admin or Manager, and a project exists |
|  Post condition     | Project details are updated|
|  Nominal Scenario     | Scenario 7.1|
|  Variants     | None |
|  Exceptions     | Scenario 7.2 |

#### Scenario 7.1

| Scenario 7.1 | Update an existing project|
| ------------- |:-------------:|
|  Precondition     | User is logged in and a project exists |
|  Post condition     | Project details are updated|
| Step#        | Description  |
|  1     | User: Selects a project from the project list to update |  
|  2     | System: Displays current project details for editing |
|  3     | User: Modifies the project details (e.g., changes the budget, timeline, description) |
|  4     | System: Validates the updated information |
|  5   | System: Saves the changes and confirms the update|
|  6   | System: Displays the updated project details|

##### Scenario 7.2

| Scenario 7.2 |Handle invalid updates |
| ------------- |:-------------:|
|  Precondition     | User is attempting to update a project with invalid details |
|  Post condition     | Displays an error message and prompts the user to correct the input |
| Step#        | Description  |
|  1     | User: Enters invalid updates (e.g., missing required fields, invalid budget) |  
|  2     | System: Displays an error message and asks the user to correct the information |

### Delete Project, UC8

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in as Admin or Manager, and a project exists |
|  Post condition     | Project is deleted from the project list|
|  Nominal Scenario     | Scenario 8.1|
|  Variants     | None |
|  Exceptions     | Scenario 8.2 |

#### Scenario 8.1

| Scenario 8.1 |Delete an existing project |
| ------------- |:-------------:|
|  Precondition     | User is logged in and a project exists|
|  Post condition     | Project is removed from the project list |
| Step#        | Description  |
|  1     | User: Selects a project from the project list to delete |  
|  2     | System: Asks for confirmation to delete the project |
|  3     | User: Confirms the deletion |
|  4     | System: Deletes the project and confirms the action |
|  5   | System: Removes the project from the list of projects |

##### Scenario 8.2

| Scenario 8.2 |Handle deletion of a project with dependencies |
| ------------- |:-------------:|
|  Precondition     | User attempts to delete a project that has dependent resources (e.g., agents assigned, properties listed)|
|  Post condition     | Displays a message indicating that the project cannot be deleted until dependencies are resolved |
| Step#        | Description  |
|  1     | User: Attempts to delete a project that has dependent resources |  
|  2     | System: Displays a message that the project cannot be deleted until dependent resources (e.g., agents, properties) are reassigned or deleted |

### Search Properties, UC9

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is on the properties search page |
|  Post condition     | Properties matching search criteria are shown|
|  Nominal Scenario     | Scenario 9.1|
|  Variants     | Scenario 9.2 |
|  Exceptions     | Scenario 9.3 |

#### Scenario 9.1

| Scenario 9.1 | Search by basic criteria (city, price, size, type)|
| ------------- |:-------------:|
|  Precondition     | User is on the properties search page|
|  Post condition     | Properties matching basic search criteria are displayed |
| Step#        | Description  |
|  1     | User: Enters basic search criteria (city, price, size, type) |  
|  2     | System: Reads the input criteria |
|  3     | System: Filters properties that match the input criteria |
|  4     | System: Displays properties that match the search criteria |

##### Scenario 9.2

| Scenario 9.2 | Advanced search with filters (schools, amenities, transportation)|
| ------------- |:-------------:|
|  Precondition     | User is on the properties search page |
|  Post condition     | Properties matching advanced search criteria are displayed |
| Step#        | Description  |
|  1     | User: Selects advanced filters (schools, amenities, transportation) |  
|  2     | System: Reads the input advanced filter criteria |
|  3     | System: Filters properties that match the advanced search criteria |
|  4     | System: Displays properties that match the advanced filters |

##### Scenario 9.3

| Scenario 9.3 | No matching properties found|
| ------------- |:-------------:|
|  Precondition     | User has entered search criteria|
|  Post condition     | No properties are shown, system displays 'no results' message |
| Step#        | Description  |
|  1     | User: Enters search criteria |  
|  2     | System: Reads the input criteria |
|  3     | System: Finds no properties matching the criteria |
|  4     | System: Displays 'no results' message |

### Create Booking, UC10

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in, viewing a property |
|  Post condition     | Booking for the property is created|
|  Nominal Scenario     | Scenario 10.1|
|  Variants     | Scenario 10.2 |
|  Exceptions     | Scenario 10.3 |

#### Scenario 10.1

| Scenario 10.1 | Create a booking |
| ------------- |:-------------:|
|  Precondition     | User is logged in, viewing a property|
|  Post condition     | Booking is created and confirmation message is displayed|
| Step#        | Description  |
|  1     | User: Selects 'Book' option for a property |  
|  2     | System: Asks for booking date and time |
|  3   | User: Enters booking date and time |
|  4     | System: Validates input and confirms availability |
|  5   | System: Creates the booking and displays confirmation message |

##### Scenario 10.2

| Scenario 10.2 | Modify booking details before confirming |
| ------------- |:-------------:|
|  Precondition     | User is in the process of booking a property|
|  Post condition     | Booking details are modified, booking is created |
| Step#        | Description  |
|  1     | User: Selects 'Book' option for a property |  
|  2     | System: Asks for booking date and time |
|  3     | User: Enters booking date and time |
|  4   | System: Allows user to modify the input before confirming |
|  5     | User: Modifies the booking details |
|  6   | System: Creates the booking and displays confirmation message |

##### Scenario 10.3

| Scenario 10.3 | Booking date/time unavailable |
| ------------- |:-------------:|
|  Precondition     | User is trying to book a property|
|  Post condition     | Booking is not created, system prompts for new date/time |
| Step#        | Description  |
|  1     | User: Selects 'Book' option for a property |  
|  2     | System: Asks for booking date and time |
|  3   | User: Enters booking date and time |
|  4     | System: Checks availability, finds date/time unavailable |
|  5   | System: Displays 'date/time unavailable' message and prompts user to select a new date/time |

### Add Property to Favorites, UC11

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in, viewing a property |
|  Post condition     | Property is added to user's favorites list|
|  Nominal Scenario     | Scenario 11.1|
|  Variants     | Scenario 11.2 |
|  Exceptions     | None |

#### Scenario 11.1

| Scenario 11.1 | Add property to favorites |
| ------------- |:-------------:|
|  Precondition     | User is logged in and viewing a property|
|  Post condition     | Property is added to user's favorites list |
| Step#        | Description  |
|  1     | User: Selects 'Add to Favorites' on the property page |  
|  2     | System: Adds property to user's favorites list |
|  3     | System: Displays confirmation that property has been added to favorites |

##### Scenario 11.2

| Scenario 11.2 | Property already in favorites |
| ------------- |:-------------:|
|  Precondition     | User is logged in and property is already in favorites|
|  Post condition     | Property is not added again, user is informed|
| Step#        | Description  |
|  1     | User: Selects 'Add to Favorites' on the property page |  
|  2     | System: Checks that property is already in user's favorites list |
|  3    | System: Displays message that property is already in favorites |

### Remove Property from Favorites, UC12

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in, property is already in user's favorites |
|  Post condition     | Property is removed from user's favorites list|
|  Nominal Scenario     | Scenario 12.1|
|  Variants     | None |
|  Exceptions     | None |

#### Scenario 12.1

| Scenario 12.1 | Remove property from favorites |
| ------------- |:-------------:|
|  Precondition     | User is logged in, property is in user's favorites list |
|  Post condition     | Property is removed from user's favorites list |
| Step#        | Description  |
|  1     | User: Navigates to their favorites list |  
|  2     | User: Selects the property they want to remove from favorites |
|  3    | System: Removes property from the user's favorites list |
| 4 | System: Displays confirmation message that property has been removed from favorites |

### List Favorite Properties, UC13

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in and has added properties to their favorites list |
|  Post condition     | List of favorite properties is displayed|
|  Nominal Scenario     | Scenario 13.1|
|  Variants     | None |
|  Exceptions     | Scenario 13.2 |

#### Scenario 13.1

| Scenario 13.1 | View favorite properties list |
| ------------- |:-------------:|
|  Precondition     | User is logged in and has added properties to favorites |
|  Post condition     | List of favorited properties is displayed |
| Step#        | Description  |
|  1     | User: Navigates to the 'Favorites' section in their account dashboard |  
|  2     | System: Fetches and displays the list of properties that the user has marked as favorite |

##### Scenario 13.2

| Scenario 13.2 | No favorite properties available |
| ------------- |:-------------:|
|  Precondition     | User is logged in but has not added any properties to their favorites |
|  Post condition     | PDisplays a message indicating that no favorite properties are available |
| Step#        | Description  |
|  1     | User: Navigates to the 'Favorites' section |  
|  2     | System: Displays a message that no properties have been added to the favorites list and suggests actions (e.g., browsing properties) |

### Update User Profile, UC14

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in |
|  Post condition     | User's profile information is updated |
|  Nominal Scenario     | Scenario 14.1|
|  Variants     | 14.2 |
|  Exceptions     | None |

#### Scenario 14.1

| Scenario 14.1 | Update user details (name, email, phone number, etc.)|
| ------------- |:-------------:|
|  Precondition     | User is logged in |
|  Post condition     | User's profile is updated with new details |
| Step#        | Description  |
|  1     | User: Navigates to their profile page |  
|  2     | System: Displays current user information (name, email, phone, etc.) |
|  3     | User: Modifies their profile details |
|  4     | System: Validates the changes (e.g., checks email format, uniqueness) |
|  5     | System: Saves the new user details and confirms the update |

##### Scenario 14.2

| Scenario 14.2 | Change password |
| ------------- |:-------------:|
|  Precondition     | User is logged in |
|  Post condition     | User's password is updated|
| Step#        | Description  |
|  1     | User: Navigates to the 'Change Password' section |  
|  2     | System: Asks for current password and new password |
|  3     | User: Provides current password and new password |
|  4     | System: Validates the current password and checks the strength of the new password |
|  5     | System: Updates the user's password and displays a confirmation message |

### Initiate Chat with Agent, UC15

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in and viewing a property or agent profile |
|  Post condition     | User directed to the chat session provided by a link by the Agent |
|  Nominal Scenario     | Scenario 15.1|
|  Variants     | None |
|  Exceptions     | Scenario 15.2 |

#### Scenario 15.1

| Scenario 15.1 | Start a chat with the agent |
| ------------- |:-------------:|
|  Precondition     | User is logged in and viewing a property or agent profile|
|  Post condition     | Chat window is opened and communication can begin |
| Step#        | Description  |
|  1     | User: Clicks the 'Chat with Agent' button from a property listing or agent profile |  
|  2     | System: Directs to the chat window provided by Agent|

##### Scenario 15.2

| Scenario 15.2 | Agent provided chat link malfunctions |
| ------------- |:-------------:|
|  Precondition     | User attempts to initiate a chat, but the provided link is not working|
|  Post condition     | Displays a message that the link is now broken |
| Step#        | Description  |
|  1     | User: Attempts to start a chat with an agent who does not have a functioning chat link |  
|  2     | System: Displays a message indicating that the link is broken |

### Schedule Video Call with Agent, UC16

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is logged in and viewing a property or agent profile |
|  Post condition     | A video call session is scheduled between the user and agent |
|  Nominal Scenario     | Scenario 16.1|
|  Variants     | None |
|  Exceptions     | Scenario 16.2 |

#### Scenario 16.1

| Scenario 16.1 | Schedule a video call with the agent|
| ------------- |:-------------:|
|  Precondition     | User is logged in and viewing a property or agent profile|
|  Post condition     | Video call appointment is scheduled and confirmed |
| Step#        | Description  |
|  1     | User: Clicks the 'Schedule Video Call' button from a property listing or agent profile |  
|  2     | System: Displays a calendar with available time slots for a video call|
|  3     | User: Selects a time slot for the video call |  
|  4     | System: Confirms the booking and sends notifications to both the user and agent with the video call details|

##### Scenario 16.2

| Scenario 16.2 | No available time slots for video call |
| ------------- |:-------------:|
|  Precondition     | User attempts to schedule a video call, but the agent has no available slots|
|  Post condition     | Displays a message indicating no availability |
| Step#        | Description  |
|  1     | User: Attempts to schedule a video call with an agent who has no available time slots |  
|  2     | System: Displays a message indicating that the agent is unavailable for video calls and suggests other options (e.g., chat or leave a message) |

### Leave Review to Agent, UC17

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User has interacted with an agent and is logged in |
|  Post condition     | The review is submitted and displayed on the agent's profile |
|  Nominal Scenario     | Scenario 17.1 |
|  Variants     | None |
|  Exceptions     | Scenario 17.2 |

#### Scenario 17.1

| Scenario 17.1 | Submit a review for the agent|
| ------------- |:-------------:|
|  Precondition     | User has interacted with an agent and is logged in|
|  Post condition     | The review is saved and displayed on the agent’s profile|
| Step#        | Description  |
|  1     | User: Navigates to the agent’s profile or dashboard and clicks the 'Leave a Review' button |  
|  2     | System: Displays a review form where the user can rate the agent and write comments  |
|  3     | User: Enters the rating (e.g., 1-5 stars) and comments describing their experience with the agent |  
|  4     | User: Submits the review |
|  5     | System: Saves the review and displays it on the agent’s profile with the user’s rating and comments |

##### Scenario 17.2

| Scenario 17.2 | Handle incomplete or invalid review submission |
| ------------- |:-------------:|
|  Precondition     | User is trying to submit a review, but the form is incomplete or contains invalid data (e.g., no rating or too short comment)|
|  Post condition     | System displays validation errors and prompts the user to correct the issues |
| Step#        | Description  |
|  1     | User: Tries to submit a review without entering the required fields (e.g., rating or comment)|  
|  2     | System: Displays validation errors indicating that the form is incomplete or invalid |
|  3     | User: Corrects the errors and submits the form again |  
|  4     | System: Processes the review submission after it is completed correctly and saves the review to the agent’s profile |

### View Agent Reviews, UC18

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is viewing an agent’s profile or property details page where reviews for the agent are available |
|  Post condition     | The reviews for the agent are displayed to the user |
|  Nominal Scenario     | Scenario 18.1 |
|  Variants     | None |
|  Exceptions     | Scenario 18.2 |

#### Scenario 18.1

| Scenario 18.1 | View reviews for an agent|
| ------------- |:-------------:|
|  Precondition     | User is viewing an agent’s profile with reviews available |
|  Post condition     | A list of reviews is displayed on the agent’s profile|
| Step#        | Description  |
|  1     | User: Navigates to the agent’s profile |  
|  2     | System: Fetches and displays the list of reviews left by previous users, including ratings and comments |
|  3     | User: Reads the reviews to get insights into the agent’s performance and service quality |  

##### Scenario 18.2

| Scenario 18.2 | No reviews available for the agent |
| ------------- |:-------------:|
|  Precondition     | User is viewing an agent’s profile with no reviews available|
|  Post condition     | Displays a message indicating that no reviews are available |
| Step#        | Description  |
|  1     | User: Navigates to the agent’s profile|  
|  2     | System: Displays a message indicating that no reviews have been left for this agent yet |

### Compare Properties, UC19

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User has selected multiple properties to compare |
|  Post condition     | Comparison of selected properties is displayed |
|  Nominal Scenario     | Scenario 19.1|
|  Variants     | Scenario 19.2 |
|  Exceptions     | None |

#### Scenario 19.1

| Scenario 19.1 | Compare properties by features |
| ------------- |:-------------:|
|  Precondition     | User has selected properties to compare|
|  Post condition     | Features comparison is displayed|
| Step#        | Description  |
|  1     | User: Selects properties to compare from search results |  
|  2     | System: Retrieves the details of the selected properties |
|  3     | System: Displays a side-by-side comparison of property features (size, price, amenities, etc.) |  

##### Scenario 19.2

| Scenario 19.2 | Compare properties by neighborhood insights |
| ------------- |:-------------:|
|  Precondition     | User has selected properties to compare|
|  Post condition     | Neighborhood insights comparison is displayed |
| Step#        | Description  |
|  1     | User: Selects properties to compare from search results|  
|  2     | System: Retrieves the neighborhood insights for the selected properties (crime rates, schools, public transport, etc.) |
|  3     | System: Displays a side-by-side comparison of the neighborhood insights |  

### Calculate Mortgage, UC20

| Actors Involved        |  |
| ------------- |:-------------:|
|  Precondition     | User is viewing a property |
|  Post condition     | Mortgage calculation is displayed |
|  Nominal Scenario     | Scenario 20.1|
|  Variants     | Scenario 20.2 |
|  Exceptions     | None |

#### Scenario 20.1

| Scenario 20.1 | Calculate mortgage based on user input |
| ------------- |:-------------:|
|  Precondition     | User is viewing a property|
|  Post condition     | Mortgage calculation is displayed|
| Step#        | Description  |
|  1     | User: Selects 'Mortgage Calculator' option on the property page |  
|  2     | System: Asks for mortgage details (price, down payment, interest rate, etc.) |
|  3     | User: Enters mortgage details |  
|  4     | System: Calculates the monthly payment based on the input |
|  5     | System: Displays the calculated monthly mortgage payment |

##### Scenario 20.2

| Scenario 20.2 | Modify mortgage details for recalculation |
| ------------- |:-------------:|
|  Precondition     | User is viewing the mortgage calculation|
|  Post condition     | Mortgage is recalculated based on new input |
| Step#        | Description  |
|  1     | User: Modifies the mortgage input details (e.g., changing the down payment or interest rate) |  
|  2     | System: Recalculates the monthly payment based on the new input |
|  3     | System: Displays the updated mortgage payment |  

---

### 7. Graphical User Interface Prototype

#### 7.1. Sitemap

![Sitemap](./documentation_media/sitemap.svg)

#### 7.2. Homepage

There are 3 versions of Navbar based on the User logged in scenarios.

![Navbars](./documentation_media/navbar.svg)

![Homepage](./documentation_media/homepage.svg)

#### 7.3. Projects Page

![Projects Page](./documentation_media/projectspage.svg)

##### 7.3.1. Project Details Page

Project Details Page from the perspective of Client or Agent:
![Projects Details Page](./documentation_media/projectdetails.svg)

Project Details Page from the perspective of Manager:
![Projects Details Page - Manager](./documentation_media/projectdetails_manager.svg)

##### 7.3.2. Edit Project Details

![Edit Projects Details Page](./documentation_media/projecteditdetails.svg)

#### 7.4. Bookings Page

Bookings Page from the perspective of Client or Agent:
![Bookings Page](./documentation_media/bookingspage.svg)

Bookings Page from the perspective of Manager:
![Bookings Page - Manager](./documentation_media/bookingspage_manager.svg)

##### 7.4.1. Edit Booking Details

![Edit Booking Details](./documentation_media/bookingdetailsedit.svg)

#### 7.5. Profile Page

![Profile Page](./documentation_media/profile.svg)

#### 7.6. Agents Page

![Agents Page](./documentation_media/agentspage.svg)

##### 7.6.1. Edit Agent Details

![Edit Agent Details](./documentation_media/editagentdetails.svg)

#### 7.7. User Access Pages

##### 7.7.1. Login Page

![Login Page](./documentation_media/login.svg)

##### 7.7.2 Sign Up Page

![Sign Up Page](./documentation_media/signup.svg)

---

### 8. Glossary

\<use UML class diagram to define important terms, or concepts in the domain of the system, and their relationships>

\<concepts are used consistently all over the document, ex in use cases, requirements etc>

---

### 9. System Design

\<describe here system design>

\<must be consistent with Context diagram>

---

### 10. Deployment Diagram

\<describe here deployment diagram >

---

### 11. Contact

If you have any questions, suggestions, or issues regarding this project, feel free to reach out!

- **Email:** [My Email Address](mailto:bitirgenalperen@gmail.com)
- **LinkedIn:** [My LinkedIn Profile](https://www.linkedin.com/in/bitirgenalperen)

---
