describe("factory tests", function() {

    it('should instantiate an object by creating a SimpleCell', function() {
        var cell = CellFactory.create(0, 0, 'O');
        expect(typeof cell).toBe('object');
    });

    it('should instantiate an object by creating a TrapCell', function() {
        var cell = CellFactory.create(0, 0, 'X');
        expect(typeof cell).toBe('object');
    });

    it('should instantiate an object by creating a FreeCell', function() {
        var cell = CellFactory.create(0, 0, ' ');
        expect(typeof cell).toBe('object');
    });

    it ('should return false if no matching Cell could be created', function() {
        var cell = CellFactory.create(0, 0, 'INVALIDCELL');
        expect(cell).toBeFalsy();
    })

    it('should instantiate an uncovert cell', function() {
       var cell = CellFactory.create(0, 0, 'O');
        expect(cell.covert).toBe(false);
    });
});
