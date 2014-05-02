describe('TrapCell tests', function() {
    var cell = false;
    beforeEach(function() {
        cell = CellFactory.create(0, 0, 'X');
    });

    it('should recognize as trap', function() {
        expect(cell.isTrap()).toEqual(true);
    });

    it('should be covert initially', function() {
        expect(cell.covert).toEqual(true);
    });

    it('should render initially as a listitem with no additional classes', function() {
        cell.render();
        expect(cell.element[0].classList.length).toEqual(1);
        expect(cell.element[0].classList[0]).toEqual('hex');
    });

    describe('covert TrapCell tests after triggering right click', function() {
        beforeEach(function() {
            cell.element.trigger('contextmenu');
        });

    });
    describe('covert TrapCell tests after triggering left click', function() {
        beforeEach(function() {
            cell.element.trigger('click');
        });

        it('should add the marked class', function() {
            expect(cell.element[0].classList.length).toEqual(2);
            expect(cell.element[0].classList[0]).toEqual('hex');
            expect(cell.element[0].classList[1]).toEqual('marked');
        });

        it('should be uncovert', function() {
           expect(cell.covert).toEqual(false);
        });
    });
});