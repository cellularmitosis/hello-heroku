var pg = require('pg');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World (with pg)!');
});

app.get('/db', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if (err) {
			done();
			console.error(err);
			response.send("Error: " + err);
		}
		else {
			q = 'SELECT * FROM test_table';
			client.query(q, function(err, result){
				if (err) {
					done();
					console.error(err);
					response.send("Error: " + err);
				}
				else {
					done();
					response.send(result.rows);
				}
			});
		}
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
