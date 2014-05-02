describe('FreeCell tests', function() {
    var cell = false;
    beforeEach(function() {
       cell = CellFactory.create(0, 0, ' ');
    });

    it('should not recognize as trap', function() {
        expect(cell.isTrap()).toEqual(false);
    });

    it('should add the hide class to the rendered element', function() {
        cell.render();
        expect(cell.element[0].classList.length).toEqual(2);
        expect(cell.element[0].classList[0]).toEqual('hex');
        expect(cell.element[0].classList[1]).toEqual('hide');
    });
});