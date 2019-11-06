const express = require('express');
const router = express();
const pool = require('../modules/pool.js');

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