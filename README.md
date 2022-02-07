# elevania-server

## SETUP

- DATABASE
  - Buat Database ```db_ecommerce```
  - Config Database
  	```js
    {
      username: 'postgres',
      password: 'root',
      // use_env_variable: 'DB_URI',
      database: 'db_ecommerce',
      host: '127.0.0.1',
      dialect: 'postgres',
    }
    ```
- ENVIRONTMENT: 
  - Buat File di root directory ```.env.local```
  - ISI ENV
  	```
      ELEVANIA_API_KEY=xxx 
      PORT=3000
      SALT=10
    ```

- MIGRATION: 
  - Setelah semua config dibuat jalankan migration
  - ```sequelize db:migrate```

## Week-2 Day 5

- Challenge Pagi:
  - kerjakan di folder `server/orchestrator`, aplikasi berupa apollo server (atau digabung dengan express) PORT 5000
  - kerjakan di folder `server/services/movies`, aplikasi berupa express PORT 5001
  - kerjakan di folder `server/services/series`, aplikasi berupa express PORT 5002
- Challenge Siang:
  - kerjakan di folder `client`, aplikasi berupa react + apollo client 

## Week-3 Day 1

- lanjut kerjakan di folder `client`


## Folder Structure
- client
- server
  - monolith
  - orchestrator-express
  - orchestrator
  - services
    - movies
    - series
  
