var SimpleCell = function(){
    BasicCell.apply(this, arguments);
    this.registerLeftClick(function () {
        if (!this.covert) { return; }
        game.increaseFaultCounter();
        Animations.shake.call(this.element, 3);
    });
    this.registerRightClick(function () {
        this.element.addClass('open');
        this.covert = false;
        this.render();
        this.unregisterLeftClick();
        this.unregisterRightClick();
    });
};
SimpleCell.prototype = new BasicCell();
