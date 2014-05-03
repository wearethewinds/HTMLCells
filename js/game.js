var Game = function() {

};

Game.prototype = function() {

    var faultbox = false,
        trapbox = false,

        createBox = function(id, header) {
            var box = $(document.createElement('section'))
                    .attr('id', id)
                    .addClass('statebox'),
                title = $(document.createElement('h2'))
                    .addClass('header')
                    .html(header),
                value = $(document.createElement('div'))
                    .addClass('value');
            box.append(title).append(value);
            return box;
        },

        createFaultBox = function() {
            faultbox = createBox('faultbox', 'mistakes');
            faultbox.find('.value:first').html(0);
            $('body').append(faultbox);
        },

        createRemainingTrapBox = function() {
            trapbox = createBox('trapbox', 'remaining')
            $('body').append(trapbox);
        },

        init = function() {
            createFaultBox();
            createRemainingTrapBox();
            $('body').append(LevelService.getLevel(3));
        },

        increaseFaultCounter = function() {
            var vl = faultbox.find('.value:first');
            vl.html(parseInt(vl.html()) + 1);
        },

        updateTrapCounter = function(vl) {
           trapbox.find('.value:first').html(vl);
        },

        decreaseTrapCounter = function() {
            var vl = trapbox.find('.value:first');
            vl.html(parseInt(vl.html()) - 1);
        };

    return {
        init: init,
        updateTrapCounter: updateTrapCounter,
        decreaseTrapCounter: decreaseTrapCounter,
        increaseFaultCounter: increaseFaultCounter
    };
}();

var game = new Game();
game.init();