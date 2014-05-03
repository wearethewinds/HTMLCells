describe('SimpleCell tests', function() {
    describe('uncovert SimpleCell tests', function() {
        var cell = false;
        beforeEach(function() {
           cell = CellFactory.create(0, 0, 'O');
        });

        it('should instantiate a covert SimpleCell', function() {
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

        describe('uncovert SimpleCell tests after ready state', function() {
            beforeEach(function() {
                $.event.trigger({
                    type: 'levelParsed'
                });
            });

            it('should have a trap indicator after the initializing event', function() {
                expect(cell.initialized).toEqual(true);
                expect(cell.content).toEqual(0);
            });

            it('should add the open class', function() {
                expect(cell.element[0].classList.length).toEqual(2);
                expect(cell.element[0].classList[1]).toEqual('open');
            });

            describe('uncovert SimpleCell tests after triggering right click', function() {

            });

        });
    });

    describe('covert SimpleCell tests', function() {
        var cell = false;
        beforeEach(function() {
            cell = CellFactory.create(0, 0, '_O');
        });

        it('should instantiate a covert SimpleCell', function() {
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

        describe('covert SimpleCell tests after ready state', function() {
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

            describe('covert SimpleCell tests after triggering right click', function() {
                beforeEach(function() {
                    cell.element.trigger('contextmenu');
                });
                it('should have a trip indicator', function() {
                    expect(cell.content).toEqual(0);
                });
                it('should add the open class', function() {
                    expect(cell.element[0].classList.length).toEqual(2);
                    expect(cell.element[0].classList[1]).toEqual('open');
                });
            });
            describe('covert SimpleCell tests after triggering left click', function() {

            });
        });
    });

});