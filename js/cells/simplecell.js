var SimpleCell = function(){
    BasicCell.apply(this, arguments);
    this.registerLeftClick(function () {
        LevelService.getHintOnLine(this, 'SOUTHWEST');
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
SimpleCell.prototype.render = function () {
    if (!this.covert && this.initialized) {
        this.element.find('span').html((this.symbol[0] || '') + this.calculate() + (this.symbol[1] || ''));
        this.element.addClass('open');
    }
    BasicCell.prototype.render.apply(this);
    return this.element;
}
