var DisruptedCell = function(){
    BasicCell.apply(this, arguments);
    this.symbol = '--';
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
DisruptedCell.prototype = new BasicCell();
//DisruptedCell.prototype.render = SimpleCell.prototype.render;