'use strict'

function clickHandler(db){

  var clicks = db.collection('clicks');

  this.addClick = function(request, response){
    clicks
      .findAndModify(
        {},
        { '_id': 1 },
        { $inc: { 'clicks': 1 } },
        function (err, result){
          if(err){
            throw err;
          }

          response.json(result);
        }
      );
  };

  this.resetClicks = function(request, response){

    clicks
      .update(
        {},
        {'clicks': 0},
        function (err, result){
          if (err){
            throw err;
          }

          response.json(result);
        }
      );
  };

  this.getClicks = function(request, response){

    var clickProjection = { '_id': false };

    clicks.findOne({}, clickProjection, function(err, result){

      if(err){
        throw err;
      }

      if(result){
        response.json(result);
      }else{
        clicks.insert({ 'clicks': 0 }, function(err){
          if(err){
            throw err;
          }

          response.json(result);
        });
      }

    });
  }
}

module.exports = clickHandler;
