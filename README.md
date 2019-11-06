# ASSUMPTIONS

You are already familiar with the JQuery framework. 
    This project is intended to be a process document for reference during the build process. It is not intended for training programmers that are new to JQuery and therefore does not elaborate on the "why" or the "how".

You should have the following installed:

    Node
    Node Package Manager
    HomeBrew
    Postico

# USING THIS REPO AS A TEMPLATE

Open the repo in Github: https://github.com/aholdahl/jquery-sample-project
Click Clone or Download, then click Download ZIP
Unzip the file and rename it
Create your database and table(s) in Postico
Update database.sql to reflect the SQL code to create the database and tables for the initial setup of your project
Update pool.js to reflect the applicable database name
Update sample.router.js to reflect the applicable table name in queryText
In Terminal, run the following commands:

    npm install
    npm start

The DOM should reflect "Hello World!", and the client console should reflect "Hello World!", "Hello from JQuery!", and the array of objects retrieved from your database table. If so, you should be ready to code!

See the last section of this file for instructions to push your project to a new Github repository. Remember to update the README with your own information before publishing.

# BUILDING FROM SCRATCH

## CLIENT SIDE

### VANILLA JAVASCRIPT

In Terminal, enter the following commands:

    touch index.html
    touch style.css
    touch client.js
    touch .gitignore

In .gitignore, add the following items:

    .DS_Store
    .git
    *.log
    /node_modules

In client.js, enter the following lines:

    console.log("Hello World!");

In style.css, enter the following lines:

    html {
        background-color: green;
    }

In index.html, enter the following lines:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="style.css" />
        <script src="client.js"></script>
        <title>JQuery Sample Project</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
    </html>

In Terminal, enter the following commands:

    open index.html

If you see a green page with Hello World in both the DOM and the DOM console, you are ready to begin.

### ADDING JQUERY

In Terminal, enter the following commands:

    touch jQuery.js

Go to jquery.com/download
Click Download the compressed production jQuery
Copy+paste the code from the web and paste it into jQuery.js
//alt: npm install jquery

In index.html, enter the following line of code ABOVE client.js

    <script src="jQuery.js"></script>

In client.js, add the following line of code:

    $(document).ready(readyNow);

    function readyNow (){
        console.log('Hello from JQuery!');
    }

If you see Hello from JQuery in the DOM console, you are ready to begin;

### COMPONENTIZING THE CLIENT SIDE

In Terminal, enter the following commands:

    mkdir server
    cd server
    mkdir public
    cd public
    mkdir scripts
    mkdir styles
    mkdir vendors
    cd ../..

Move client.js to the scripts folder
Move style.css to the styles folder
Move jQuery.js to the vendors folder
Move index.html to the public folder

In index.html, update the imports as follows:

    <link rel="stylesheet" href="./styles/style.css" />
    <script src="./vendors/jQuery.js"></script>
    <script src="./scripts/client.js"></script>

## SERVER SIDE

In Terminal, enter the following commands:

    npm init
    npm install
    npm install express
    npm install body-parser
    cd server
    touch server.js
    cd ..

In server.js, enter the following lines of code:

    const express = require('express');
    const bodyParser = require('body-parser');
    const PORT = 5000;
    let app = express();
    app.use(express.static('server/public'));
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/hello', (req, res) => {
        res.send('Hello from server!');
    });

    app.listen(PORT, () => {
        console.log(`App is running on ${PORT}`)
    });

In client.js, enter the following lines of code within the readyNow function:

    $.ajax({
        method: 'GET',
        url: '/hello'
    }).then(function (response) {
        console.log(response);
    })

In package.json, add the following line to the scripts section:

    "start": "node server/server.js",

In Terminal, enter the following command:

    npm start

From now on, you will access the DOM by going to http://localhost:5000/

If you see "App is running on 5000" in the CLI and "Hello from the server" on the DOM console, then you are ready to start.

### COMPONENTIZING THE SERVER SIDE ROUTES

In Terminal, enter the following commands:

    cd server
    mkdir routes
    cd routes
    touch sample.router.js
    cd ../..

In sample.router.js, enter the following lines of code:

    const express = require('express');
    const router = express();

    function sample (){
        return 'Hello from the sample module!';
    }

    module.exports = sample;

In server.js, add the following line to the top section of the file:

    const sampleRouter = require('./routes/sample.router.js');

In server.js, replace the res.send line with the following lines of code:

    console.log('Hello from server!');
    res.send( sampleRouter() );

In Terminal, enter the following commands: 

    ctrl+C
    npm start

Refresh the browser. 

If you see "Hello from server" in the CLI and "Hello from the sample module" on the DOM console, then you are ready to start.

## DATABASE

In Terminal, type the following commands:

    npm install pg
    touch database.sql
    cd server
    mkdir modules
    cd modules
    touch pool.js
    cd ../..

In database.sql, add the following lines:

    --DATABASE "sample_database_name"
    CREATE TABLE "test_table" (
        "id" SERIAL PRIMARY KEY,
        "content" TEXT NOT NULL
    );
    INSERT INTO "test_table" ("content") VALUES ('test');

In Postico, create the database "sample_database_name"
In SQL Query, copy+paste the CREATE TABLE script from above then click "Execute Statement"

In pool.js, add the following lines of code:

    const pg = require('pg');

        const Pool = pg.Pool;

        const pool = new Pool({
            database: 'sample_database_name',
            host: 'localhost',
            port: 5432,
            max: 10,
            idleTimeoutMillis: 10000
        });

        module.exports = pool;

In sample.router.js, add the following lines to the top section:

    const pool = require('../modules/pool.js');

In sample.router.js, replace the function and export with the following:

    router.get('/', (req, res)=>{
        let queryText = `SELECT * FROM "test_table";`
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log(error);
            })
    })

    module.exports = router;

In server.js, replace the entire app.get line with the following:

    app.use('/hello', sampleRouter);

In Terminal, type the following commands:

    cmd+t
    brew services start postgresql
    npm start

If the DOM console reflects [{id: 1, content: 'test'}], then you are ready to go!

## ACCESSIBILITY/USABILITY PRINCIPLES

Coming soon...

## VERSION CONTROL

Go to github.com and login
Click New to create a new repository
Enter the repository name: sample-project-name
Enter a description and select the desired privacy settings
Click Create Repository

In Terminal, enter the following commands:

    git init
    git add .
    git commit -m "initial commit"
    git remote add origin https://github.com/yourUserName/sample-project-name.git
    git push -u origin master

Going forward, if you are the sole contributor, future changes can be pushed as follows:

    git add .
    git commit -m "description of recent changes"
    git push

## README

Update your Readme before deployment. A good readme should include:
    Project Name
    List of Technologies
    Instructions for downloading and running the project on a local machine
        System Prerequisites
        Installation
    Table of Contents
    Documentation on how a user would experience the completed features of the app (with screenshots)
    Debugging/Testing Instructions and list of known issues
    Next version wishlist
    Deployment Information
    Author Attribution
    Achnowledgements

## TITLE AND FAVICON

In index.html, be sure to update the <title></title> to reflect an appropriate name.
You can also add a favicon using the following block of code (save your desired favicon image as a .ico file type and update the href as needed):

    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

## DEPLOY TO HEROKU (NO DATABASE)

Assuming you have already installed the Heroku CLI:

Login to Heroku.com
Click New, then select Create New App
Enter your project name: sample-project-name
Click Create App

In Terminal, enter the following command and follow the prompts:

    heroku login
    heroku git:remote -a sample-project-name
    git add .
    git commit -m "description of recent changes"
    git push heroku master

To update deployment

    git add .
    git commit -m "description of recent changes"
    git push heroku master

## DEPLOY TO HEROKU (FULL-STACK)

Coming soon...

## DEPLOY TO GITHUB PAGES

Coming soon...