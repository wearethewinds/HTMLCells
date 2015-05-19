var TrapCell = function(){
    BasicCell.apply(this, arguments);
    this.registerLeftClick(function () {
        this.unregisterLeftClick();
        this.unregisterRightClick();
        game.decreaseTrapCounter();
        this.covert = false;
        this.render();
    });
    this.registerRightClick(function () {
        game.increaseFaultCounter();
        Animations.shake.call(this.element, 3);
    });
};
TrapCell.prototype = new BasicCell();
TrapCell.prototype.isTrap = function () {
    return true;
}
TrapCell.prototype.render = function () {
    if (!this.covert) {
        this.element.addClass('marked');
    }
    return this.element;
}