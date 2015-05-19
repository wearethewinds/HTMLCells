var HintTrapCell = function(){
    var hintLeftClickHandler = function () {
        if (!this.hinted) {
            LevelService.highliteSurroundingCells(this.x, this.y, this.searchDepth);
        } else {
            LevelService.unliteSurroundingCells(this.x, this.y, this.searchDepth);
        }
        this.hinted = !this.hinted;
    }
    BasicCell.apply(this, arguments);
    this.hinted = false;
    this.searchDepth = 2;
    if (this.covert) {
        this.registerLeftClick(function () {
            this.unregisterLeftClick();
            this.unregisterRightClick();
            this.registerLeftClick(hintLeftClickHandler.bind(this));
            game.decreaseTrapCounter();
            this.covert = false;
            this.render();
        });
        this.registerRightClick(function () {
            game.increaseFaultCounter();
            Animations.shake.call(this.element, 3);
        });
    } else {
        this.registerLeftClick(hintLeftClickHandler.bind(this));
    }
};
HintTrapCell.prototype = new BasicCell();
HintTrapCell.prototype.render = function () {
    if (!this.covert && this.initialized) {
        this.element.find('span').html(this.calculate());
        this.element.addClass('marked');
    }
    return this.element;
};
HintTrapCell.prototype.isTrap = function () {
    return true;
}
