const router = require('Express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req,res)=>{
    res.json({
        posts : {
            title : 'my first post',
            description: "You can see this, only if you are logged in"
        }
    });
});





module.exports = router; 