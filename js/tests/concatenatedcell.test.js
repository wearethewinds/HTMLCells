describe('ConcatenatedCell tests', function() {
    describe('uncovert ConcatenatedCell tests', function() {
        var cell = false;
        beforeEach(function() {
           cell = CellFactory.create(0, 0, 'C');
        });

        it('should instantiate a uncovert ConcatenatedCell', function() {
            expect(cell.covert).toBe(false);
        });

        it('should have no trap indicator set initially', function() {
            expect(cell.content).toBe(false);
        });

        it('should render as a listitem with no additional classes', function() {
            expect(cell.element[0].classList.length).toEqual(1);
            expect(cell.element[0].classList[0]).toEqual('hex');
        });

        it('should not be recognized as trap', function() {
           expect(cell.isTrap()).toEqual(false);
        });

        describe('uncovert ConcatenatedCell tests after ready state', function() {
            beforeEach(function() {
                $.event.trigger({
                    type: 'levelParsed'
                });
            });

            it('should have a trap indicator after the initializing event', function() {
                expect(cell.initialized).toEqual(true);
                expect(cell.content).toEqual(0);
                expect(cell.element.find('span').html()).toEqual('{0}');
            });

            it('should add the open class', function() {
                expect(cell.element[0].classList.length).toEqual(2);
                expect(cell.element[0].classList[1]).toEqual('open');
            });

            describe('uncovert ConcatenatedCell tests after triggering right click', function() {

            });

        });
    });

    describe('covert ConcatenatedCell tests', function() {
        var cell = false;
        beforeEach(function() {
            cell = CellFactory.create(0, 0, '_C');
        });

        it('should instantiate a covert ConcatenatedCell', function() {
            expect(cell.covert).toBe(true);
        });

        it('should have no trap indicator set initially', function() {
            expect(cell.content).toBe(false);
        });

        it('should render initially as a listitem with no additional classes', function() {
            cell.render();
            expect(cell.element[0].classList.length).toEqual(1);
            expect(cell.element[0].classList[0]).toEqual('hex');
        });

        describe('covert ConcatenatedCell tests after ready state', function() {
            beforeEach(function() {
                $.event.trigger({
                    type: 'levelParsed'
                });
            });

            it('should have no trap indicator even after initializing event', function() {
                expect(cell.initialized).toEqual(true);
                expect(cell.content).toEqual(false);
            });

            it('should have no open class attached', function() {
                expect(cell.element[0].classList.length).toEqual(1);
                expect(cell.element[0].classList[0]).toEqual('hex');
            });

            describe('covert ConcatenatedCell tests after triggering right click', function() {
                beforeEach(function() {
                    cell.element.trigger('contextmenu');
                });
                it('should have a trip indicator', function() {
                    expect(cell.content).toEqual(0);
                    expect(cell.element.find('span').html()).toEqual('{0}');
                });
                it('should add the open class', function() {
                    expect(cell.element[0].classList.length).toEqual(2);
                    expect(cell.element[0].classList[1]).toEqual('open');
                });
            });
            describe('covert ConcatenatedCell tests after triggering left click', function() {

            });
        });
    });

});