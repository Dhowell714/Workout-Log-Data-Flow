let Express = require('express'); //Line 1: We import the Express framework and store it inside the variable Express.  This instance becomes our gateway to using Express methods.
let router = Express.Router(); // Line 2: We create a new variable called router. Since the Express variable gives us access into the express framework, we can access express properties and methods by calling express.methodName(). Therefore, when we call Express.Router(), we are using the Express variable to access the Router() Method.
let validateJWT = require("../middleware/validate-jwt");
const { JournalModel } = require('../models');
// The Router() method will return a router object for us. You can read about it more at the Express documentation.https://elevenfifty.instructure.com/courses/733/pages/4-dot-2-express-router-introduction?module_item_id=63263#:~:text=object%20for%20us.%20You%20can%20read%20about%20it%20more%20at%20the%20Express%20documentation.
router.get('/practice', validateJWT, (req, res) => { // Line 5: We use the router object by using the router variable to get access into the Router() object methods.
    res.send('Hey!! This is a practice route!')
});
//router.get('/about', (req, res) => {
//    res.send("This is the about route!");
//})

router.post('/create', validateJWT, async (req, res) => {
    const { title, date, entry } = req.body.journal;
    const { id } = req.user;
    const journalEntry = {
        title,
        date,
        entry,
        owner: id
    }
    try {
        const newJournal = await JournalModel.create(journalEntry);
        res.status(200).json(newJournal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    });
    router.get("/about", (req, res) => {
        res.send("This is the about route!")
    
});

router.get("/", async (req, res) => {
    try {
        const entries = await JournalModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/mine", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userJournals = await JournalModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userJournals);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;