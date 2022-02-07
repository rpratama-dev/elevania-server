# elevania-server

## SETUP SERVER

- INSTALASI: 
  - Jalankan Perintah Berikut Untuk Menginstall Package Dependencies
  - ```yarn``` atau ```npm install```

- DATABASE
  - Sudah Install DB PostgreSQL
  - Buat Database ```db_ecommerce```
  - Config Database ```./config/config.js```
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
      ELEVANIA_API_KEY=xxx sesuaikan saja
      PORT=3000
      SALT=10
    ```

- MIGRATION: 
  - Setelah semua config dibuat jalankan migration
  - ```sequelize db:migrate```

- START SERVER: 
  - Setelah menjalankan migration
  - ```sequelize db:migrate```

- START SERVER: 
  - Jalankan Perintah Beikut
  - ```yarn start```
  - Setelah Itu Pastikan ```Pair Key``` untuk JWT sudah tergenerate
  - ```./config/private.pem```
  - ```./config/public.pub```

## SETUP CLIENT

- INSTALASI: 
  - Jalankan Perintah Berikut Untuk Menginstall Package Dependencies
  - ```yarn``` atau ```npm install```
  - Default Server URL ```http://localhost:3000/api/v1```
  - Untuk Mengubah Server URL buka file ```./src/utils/CallServer.js```
  - Cari Code Seperti di bawah ini
  ```js
      const instanceAxios = axios.create({
        // baseURL: '/api/v1',
        baseURL: 'http://localhost:3000/api/v1',
        headers: defaultHeaders(),
        timeout: 180000, // 3 Menit,
        // withCredentials: false,
      });

  ```
  - Ubah nilai variabel ```baseURL```
