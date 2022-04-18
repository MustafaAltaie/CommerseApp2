const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MustafaAltaie:4435966@mustafacluster.tzl1h.mongodb.net/WebPage?retryWrites=true&w=majority', function(err){
    if(!err) console.log('Connected to MongoDB');
});

require('./schema');