# POME - Personal Anime Catalog Project

Started: 2023 <br/>
Status: In Progress

POME is an anime catalog project I initially created as a capstone project for the Driven bootcamp. Over time, it has evolved significantly, and I continue to work on it as a personal project. Originally built with React and Node.js, I later migrated POME to Next.js and Nest.js, with Prisma ORM, to create a full-stack application that leverages my preferred technologies.

The application includes a catalog with filters, detailed anime pages (with information such as descriptions, release dates, tags, and trailers), user registration and login, and a complete user CRUD. The project integrates the free GraphQL API from Anilist.co, allowing streamlined data retrieval for anime information through Apollo for query and request management.

POME also features real-time chat functionality using WebSocket, allowing users to interact, receive friend notifications, and maintain a social experience within the app. For code quality, I implemented custom ESLint configurations and Husky to ensure consistent code formatting.

## Demo and Setup
You can view the demo by setting up the application locally:

Clone the repository. <br/>
Install dependencies via npm install. <br/>
Run the development server with npm run dev. <br/>
Prerequisites <br/>
Node.js, PostgreSQL database, Anilist API key for anime data.

## Features

Anime Catalog: Search, filter, and browse anime titles with detailed information <br/>
User Management: Full CRUD functionality for user accounts <br/>
Real-Time Chat: WebSocket integration for user interactions and friend notifications <br/>
GraphQL API Integration: Fetch anime data from Anilist.co using Apollo <br/>
Code Quality: Custom ESLint rules and Husky for consistent formatting <br/>

# Competencies Used

## Frontend

Next.js: For server-rendered React and optimized performance <br/>
Tailwind CSS: Custom styling and responsive design <br/>
React Hooks: State and lifecycle management <br/>
TypeScript: Type safety and improved maintainability <br/>
Apollo Client: Manages GraphQL requests <br/>

## Backend

Nest.js: Server-side logic <br/>
Prisma ORM: Database interactions with PostgreSQL <br/>
REST and WebSocket APIs: For real-time and CRUD operations <br/>
PostgreSQL: Persistent data storage <br/>
DBeaver and Postman: For database management and API testing

## Technologies

Frontend: Next.js, Tailwind, React Hooks, TypeScript <br/>
Backend: Nest.js, Prisma ORM, SQL (PostgreSQL) <br/>
Real-Time: WebSocket <br/>
API Management: Apollo, GraphQL, REST <br/>
Tools: ESLint, Husky, DBeaver, Postman, Docker <br/>

## Future Plans

As POME continues to evolve, I plan to add more features, improve UI/UX, and incorporate additional social functionalities to further enhance the user experience.

## Acknowledgments
This project utilizes the free GraphQL API from Anilist.co, which enables comprehensive anime data for an enriched catalog experience.

## Contact
If you have any questions or feedback, feel free to reach out at https://www.linkedin.com/in/victor-mendes-mannelli.
