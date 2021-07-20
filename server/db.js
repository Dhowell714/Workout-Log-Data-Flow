const Sequelize = require('sequelize');
// Line 1: Import the sequelize package and create an instance of sequelize for use in the module with the Sequelize variable.
const sequelize = new Sequelize("postgres://postgres:c188645ec8f3419abf51129081469837@localhost:5432/eleven-journal")
// Line 2: Use the constructor to create a new sequelize object. The constructor takes in a string which holds all of the pertinent data required to connect to a database, also known as a URI connection. 
module.exports = sequelize;
// Line 5: We export the module.