var FreeCell = function(){
    BasicCell.apply(this, arguments);
};
FreeCell.prototype = new BasicCell();
FreeCell.prototype.render = function () {
    this.element.addClass('hide');
    return this.element;
}