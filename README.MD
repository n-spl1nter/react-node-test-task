# Requirements
- Docker

### Stack
- Nest.js for backend
- Next.js for frontend
- PostgreSQL for database

### To run application follow these steps:
- copy .env.example file to .env and fill all empty variables
- run in your command line ```docker-compose up -d```

### You have to follow next steps only on first launch:
- open another terminal window
- enter backend container with command ```docker exec -it test-task-react-node-back-1 bash```
- apply database migrations with command ```npm run migration:run```
- seed database with initial data with command ```node ./dist/database/seeds```
