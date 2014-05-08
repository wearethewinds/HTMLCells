describe('LevelService test', function() {
    var level = false,
        game = new Game();

    it('should return a level if instantiated with an index', function() {
        level = LevelService.getLevel(1);
        expect(level.length).toBe(1);
    });

    it('should return an level if instantiated with an array', function() {
       level = LevelService.getLevel(['X']);
        expect(level.length).toBe(1);
    });

    describe('level 1 tests', function() {
        beforeEach(function() {
            level = LevelService.getLevel(1);
        });
        it('should return 36 list items and consists of 8 rows for level 1', function() {
            expect(level.find('li').length).toEqual(36);
            expect(level.find('.hex-row').length).toEqual(8);
        });

        it('should return three surrounding traps for cell (x: 2, y: 0) in level 1', function() {
            expect(LevelService.getSurroundingTrapCount(2, 0, 1)).toEqual(3);
        });

        it('should return two surrounding traps for cell (x: 0, y: 3) in level 1', function() {
            expect(LevelService.getSurroundingTrapCount(0, 3, 1)).toEqual(2);
        });

        it('should return no surrounding traps for cell (x: 0, y: 2) in level 1', function() {
            expect(LevelService.getSurroundingTrapCount(0, 2, 1)).toEqual(0);
        });
    });

    describe('depth algorithm tests', function() {
        var newLevel = [
            [' ', '_H', ' '],
            ['X', '_O'],
            ['_O', 'X', '_O'],
            ['X', '_O'],
            ['X', 'H', 'X'],
            ['X', '_O'],
            ['_O', 'X', '_O'],
            ['X', '_O'],
            [' ', '_H', ' ']
        ];
       level = LevelService.getLevel(newLevel);
    });

    it('should return 10 traps for cell (x: 1, y: 4)', function() {
        game.init().setLevel(4);
        expect(LevelService.getSurroundingTrapCount(1, 4, 2)).toEqual(10);
    });
});