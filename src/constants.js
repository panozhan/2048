const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
export default {
    ARROW_LEFT,
    ARROW_RIGHT,
    ARROW_UP,
    ARROW_DOWN,
    COLOR: new Map(
        [
            [0, '#bbada0'],
            [2, '#eee4da'],
            [4, '#ede0c8'],
            [8, '#fdbd8b'],
            [16, '#fc9645'],
            [32, '#f98f90'],
            [64, '#f64a4d'],
            [128, '#fbe68c'],
            [256, '#fade6a'],
            [512, '#f9d747'],
            [1024, '#f8cf24'],
            [2048, '#f2c506'],
        ]
    ),
    MOVE_TIME: 100,
    KEYS_TO_LISTEN: [ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN],
    TILE_SIZE: 150,
    BORDER_SIZE: 5,
}