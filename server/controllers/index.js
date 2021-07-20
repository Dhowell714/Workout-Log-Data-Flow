module.exports = { // Line 1: We are exporting this file as a module. More specifically, we are exporting everything as an object.
    userController: require('./usercontroller'),
    journalController: require("./journalcontroller"), // Line 2: We define a property called journalController.  The value of this property is the import of the journalcontroller file.
};