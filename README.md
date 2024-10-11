# Project Details
Project is setup in node js.
I have used bootstrap css to make this project fully responsive 

To run this project you need npm and node installed.
For me the version of npm is `10.8.2` and node is `20.18.0`, so any version >= these should be fine.

This project requires postgres, so make sure you have that installed.

Run this command to install all dependencies:
```bash
npm install
```

# Setting up DB

please add a database url in the `.env` file so that we can connect to db
example is in `.env.example`

In your `.env` file, please add database url like the follwing: 

```bash
DATABASE_URL=postgres://user:password@localhost:5432/databse_name
```


run:
```bash
npm run syncdb 
```
to run the migrations and create table if not exists.

alternatively you can manually use these commands:

run this command to make migrations: 
```bash
npx drizzle-kit generate
```

run this command to push to db:
```bash
npx drizzle-kit push
```

This should create an inventory table


# Starting the project

```bash
npm start
```

The project can be accessed on `localhost:3000` or `localhost:PORT` if you configured a custom prot