require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db"); // Line 3: Create a db variable that imports the db file. 

app.use(Express.json());

const controllers = require("./controllers");

app.use("/journal", controllers.journalController);
app.use(require("./middleware/validate-jwt"));
app.use("/user", controllers.userController);
dbConnection.authenticate()
//Line 9: There are two things happening here:
//We use the db variable to access the sequelize instance and its methods from the db file.
//Call upon the authenticate() method. This is an asynchronous method that runs a SELECT 1+1 AS result
//query. This method returns a promise.
    .then(() => dbConnection.sync())
    // Line 10: We use a promise resolver to access the returned promise and call upon the sync() method. This method will ensure that we sync all defined models to the database.
    .then(() => {
        /*
        Lines 11 through 15: We use a promise resolver to access the returned promise from the sync() method and fire off the function that shows if we are connected. Note: this is the function we wrote in 2.3 Starting up the Server  that we are just wrapping into a larger method.
        Lines 16 through 18: We use a promise rejection that fires off an error if there are any errors.
        */
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
//app.use('/test', (req, res) => {
//    res.send('This is a message from the endpoint on the server!')
//})

//app.listen(3000, () => {
//    console.log(`[Server]: App is listening on 3000.`);
//});