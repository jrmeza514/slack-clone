var express = require('express');
var router = express.Router();

var messages = [
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Juan Meza', body: 'This is a message'},
  { author: 'John Doe', body: 'This is another message'},
  { author: 'Jane Doe', body: 'This is a better message'}
];

router.route('/')
.get(function( req, res ){
  res.json(messages);
});


module.exports = router;
