const { mergeLeft, mergeRight, mergeUp, mergeDown, } = require('./utils');

describe('Test that merge left works', () => {
    test('Moves a single tile to the left', () => {
        const input = [
            [0,0,0,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Merges a single tile to the left', () => {
        const input = [
            [2,0,0,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Merges and moves a single tile to the left', () => {
        const input = [
            [0,0,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Merges left most tiles first', () => {
        const input = [
            [0,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Leaves unmergeable', () => {
        const input = [
            [4,0,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,4,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Leaves unmergeable 2', () => {
        const input = [
            [4,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,4,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Moves unmergeable to the left, then merges', () => {
        const input = [
            [0,4,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,4,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,4,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [2,2,0,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,4,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeLeft(input)).toEqual(output);
    });
});


describe('Test that merge right works', () => {
    test('Moves a single tile to the right', () => {
        const input = [
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Merges a single tile to the right', () => {
        const input = [
            [2,0,0,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Merges and moves a single tile to the right', () => {
        const input = [
            [2,2,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Merges right most tiles first', () => {
        const input = [
            [2,2,2,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,2,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Leaves unmergeable', () => {
        const input = [
            [2,2,0,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,4,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Leaves unmergeable 2', () => {
        const input = [
            [0,2,2,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,4,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Moves unmergeable to the right, then merges', () => {
        const input = [
            [2,2,4,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,4,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [2,2,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,4,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [4,0,2,2],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,4,4],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeRight(input)).toEqual(output);
    });
});


describe('Test that merge up works', () => {
    test('Moves a single tile to the up', () => {
        const input = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Merges a single tile to the up', () => {
        const input = [
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Merges and moves a single tile to the up', () => {
        const input = [
            [0,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Merges up most tiles first', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Leaves unmergeable', () => {
        const input = [
            [4,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });


    test('Leaves unmergeable 2', () => {
        const input = [
            [4,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Moves unmergeable to the up, then merges', () => {
        const input = [
            [0,0,0,0],
            [4,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [4,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ]
        expect(mergeUp(input)).toEqual(output);
    });
});

describe('Test that merge down works', () => {
    test('Moves a single tile to the down', () => {
        const input = [
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Merges a single tile to the down', () => {
        const input = [
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Merges and moves a single tile to the down', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Merges down most tiles first', () => {
        const input = [
            [0,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [2,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Leaves unmergeable', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });


    test('Leaves unmergeable 2', () => {
        const input = [
            [0,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [4,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Moves unmergeable to the down, then merges', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [4,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [2,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });

    test('Only merges a single tile once', () => {
        const input = [
            [4,0,0,0],
            [2,0,0,0],
            [2,0,0,0],
            [0,0,0,0],
        ];
        const output = [
            [0,0,0,0],
            [0,0,0,0],
            [4,0,0,0],
            [4,0,0,0],
        ]
        expect(mergeDown(input)).toEqual(output);
    });
});
