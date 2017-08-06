var express     = require('express');  
var app         = express();  
var exec        = require('child_process').exec;
 

app.configure(function() {  
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev')); 
    app.use(express.bodyParser());              
    app.use(express.methodOverride());                  
});

app.get("/exec", function (req, res) {  
    
    var name = req.query['username'];
    var pass = req.query['password'];

    var command = "python /home/ricardo/Projects/instagram-user-id/main.py "+name;
    
    exec(command, function (error, stdout, stderr) {
        if (error === null) {
            res.header("Content-Type", "application/json");
            res.end(stdout);
        }
    });

});

app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');
});

app.listen(8080, function() {  
    console.log('Visit... http://localhost:8080/');
});