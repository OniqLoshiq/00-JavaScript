First Workshop of Origami Platform
Including rest api service

To run the rest api:
1) Create .env file and include property DB_URL and as value set your link to the database 
2) Use 'npm install' in the console
3) Use 'npm run start' in the console
34) Use postman or other alternative to create user then login it and create several origamis
	4.1) 127.0.0.1:9999/api/user/register with body keys: username and password
	4.2) 127.0.0.1:9999/api/user/login with body keys: username and password (postman should keep the jwt cookie for further requests)
	4.3) 127.0.0.1:9999/api/origami with body key: description

To run the react app:
1) Use 'npm install' in the console
2) Use 'npm start' in the console