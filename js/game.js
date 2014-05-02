/**
 * Created by fabianpotschies on 01/05/14.
 */
var Game = function() {

};

Game.prototype = function() {
    var init = function() {
        $('body').append(LevelService.getLevel(1));
    };

    return {
        init: init
    };
}();

var game = new Game();
game.init();