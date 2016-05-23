var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser');

router.use( bodyParser.json() );
router.use(bodyParser.urlencoded({ extended: false }));

var messages = [

];

router.route('/')
.get(function( req, res ){
  res.json(messages);
});

module.exports = router;
