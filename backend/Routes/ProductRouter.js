const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.post('/login', (req,res)=>{
    res.send('login success');
})
router.get('/', ensureAuthenticated,(req,res) => {
    console.log(' ----- Logged in user details ---', req.user); //to print details of user(which is logged in - check by euthentication)
    res.status(200).json([
    {
        name: "mobile",
        price: 10000
    },
    {
        name: "tv",
        price: 20000
    }
    // directly give data to check wether data is access by veryfied JWT token user or not

  ])
    
});


module.exports = router;