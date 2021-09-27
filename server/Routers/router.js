const express=require('express');

const router=express();
router.get('/',(req,res)=>{
    res.send('server has started');
})

module.exports = router;