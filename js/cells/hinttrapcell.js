var HintTrapCell = function(){
    var hintLeftClickHandler = function () {
        if (!this.hinted) {
            LevelService.highliteSurroundingCells(this);
        } else {
            LevelService.unliteSurroundingCells(this);
        }
        this.hinted = !this.hinted;
    };
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
    if (this.highlit > 0) {
      this.element.css('opacity', this.getHighliteValue());
    } else {
      this.element.css('opacity', '');
    }
    return this.element;
};
HintTrapCell.prototype.isTrap = function () {
    return true;
};
