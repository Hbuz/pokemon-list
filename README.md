# pokemon-list
Full Stack application with login, that lists Pokemons with details.

## Getting Started


### Prerequisites
 - npm / yarn
 - PostgreSQL DB

### Installing & Running
```
git clone git@github.com:Hbuz/pokemon-list.git
```

#### Server folder

##### Environment variables
 - DATABASE_URL (default = postgres://postgres:secret@localhost:5432/postgres)
 - PORT (default = 4001)
 
##### Install modules
```npm install```

##### Running apllication
node . DATABASE_URL={DATABASE_URL} PORT={PORT}
##### Run test
npm run test


#### Client folder

##### Environment variables
 - REACT_APP_API_URL (default = http://localhost:4001)
 
##### Install modules
```npm install```

##### Run application
yarn start REACT_APP_API_URL={REACT_APP_API_URL}
##### Run test
yarn test
