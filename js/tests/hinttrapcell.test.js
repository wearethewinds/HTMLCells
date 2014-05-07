describe('HintTrapCell tests', function() {

    var cell = false;

    describe('Unmarked HintTrapCell tests', function() {
        beforeEach(function() {
            cell = CellFactory.create(0, 0, 'H');
        });

        it('should recognize as trap', function() {
            expect(cell.isTrap()).toEqual(true);
        });

        it('should not be marked initially', function() {
           expect(cell.marked).toEqual(false);
        });

    });

    describe('Marked HintTrapCell tests', function() {
        beforeEach(function() {
            cell = CellFactory.create(0, 0, '_H');
        });

        it('should recognize as trap', function() {
            expect(cell.isTrap()).toEqual(true);
        });

        it('should not be marked initially', function() {
            expect(cell.marked).toEqual(true);
        });
    });

});