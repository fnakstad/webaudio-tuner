module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/pitches/:id', function(req, res) {
        res.json(req.params.id);
    });
};