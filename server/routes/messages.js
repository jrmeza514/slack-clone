var express = require('express');
var router = express.Router();

var messages = [

];

router.route('/')
.get(function( req, res ){
  res.json(messages);
});

router.route('/add')
.get(function( req, res ){
  var name = req.query.name;
  var body = req.query.body;

  if ( name && body ) {
    console.log("successfull reques");
    res.status( 200 );
    req.redirect('/');
    message.push({
      author: name,
      body: body
    });

  }else{
    res.status( 400 );
    res.send("Bad Request: Check Parameters");
  }
});


module.exports = router;
