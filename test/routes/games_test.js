var chai    = require('chai'),
    expect  = chai.expect;

chai.use(require('sinon-chai'));
require('mocha-sinon');

var request = require('request');
var server = require('../../server');
var base_url = "http://localhost:3000/";

process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
var db = require('mongoskin').db(process.env.MONGODB_URI);
var games = db.collection('games');

describe("games routes", function() {
  var game = {
    week: 1,
    events: [
      "Pull\tMike",
      "Direction\t<<<<<<",
      "Drop\tJill\tPass\tBob",
      "Direction\t>>>>>>",
      "POINT\tMike\tPass\tJane",
      "-1\tJill",
      "-1\tBob",
      "+1\tMike",
      "+1\tJane",
      "Direction\t<<<<<<",
    ]
  };

  before(function () {
    server.listen(3000);
  });

  after(function () {
    server.close();
  });

  describe("GET /games", function() {
    var url = base_url + 'games';

    it("returns a list of games", function(done) {
      games.insert(game, function(err, res) {
        request.get(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          body = JSON.parse(response.body);
          expect(body[0].week).to.equal(game.week);
          expect(body[0].events).to.deep.equal(game.events);
          done();
        });
      });
    });
  });

  describe("GET /games/:id", function() {
    var url = base_url + 'games/';

    it("returns a game", function(done) {
      games.insert(game, function(err, res) {
        url = url + game._id
        request.get(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          body = JSON.parse(response.body);
          expect(body.week).to.equal(game.week);
          expect(body.events).to.deep.equal(game.events);
          done();
        });
      });
    });
  });
});
