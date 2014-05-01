/**
 * Created by fabianpotschies on 01/05/14.
 */
var Game = function() {
};

Game.prototype = function() {
    var levelService = new LevelService();
    var init = function() {
        $('body').append(levelService.getLevel(1));
    };

    return {
        calculateHintAtPosition: levelService.calculateDirectValue,
        init: init
    };
}();

var game = new Game();
game.init();