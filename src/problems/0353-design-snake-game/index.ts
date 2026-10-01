const DIRECTIONS: Readonly<Record<string, readonly [number, number]>> = {
	U: [-1, 0],
	D: [1, 0],
	L: [0, -1],
	R: [0, 1],
};

/**
 * 353. Design Snake Game
 *
 * Plays Snake on a `height`×`width` screen. The snake starts at the top-left
 * with length 1, and grows by one (scoring a point) each time it reaches the
 * next piece of `food`. `move` returns the score, or -1 once the snake hits
 * a wall or its own body.
 *
 * Keeps the body as a queue of cells, head last, with a set for constant
 * time collision checks. The tail moves out of the way before the head
 * moves in, unless the snake is eating, so the head can follow its tail.
 *
 * @see https://leetcode.com/problems/design-snake-game/
 * @difficulty Medium
 * @timeComplexity O(1) per move
 * @spaceComplexity O(length of the snake + food)
 *
 * @example
 * const game = new DesignSnakeGame(3, 2, [[1, 2], [0, 1]]);
 * game.move("R"); // 0
 * game.move("D"); // 0
 * game.move("R"); // 1
 */
export class DesignSnakeGame {
	readonly #width: number;
	readonly #height: number;
	readonly #food: readonly (readonly number[])[];
	readonly #body: number[] = [0];
	readonly #occupied = new Set([0]);
	#tail = 0;
	#eaten = 0;
	#over = false;

	constructor(
		width: number,
		height: number,
		food: readonly (readonly number[])[],
	) {
		this.#width = width;
		this.#height = height;
		this.#food = food;
	}

	/** Moves the snake one cell in `direction` (U, D, L or R) and returns the score, or -1 if the game is over. */
	move(direction: string): number {
		if (this.#over) return -1;

		const head = this.#body.at(-1) ?? 0;
		const [dr, dc] = DIRECTIONS[direction] ?? [0, 0];
		const row = Math.floor(head / this.#width) + dr;
		const column = (head % this.#width) + dc;
		if (row < 0 || row >= this.#height || column < 0 || column >= this.#width) {
			this.#over = true;
			return -1;
		}

		const next = row * this.#width + column;
		const [foodRow, foodColumn] = this.#food[this.#eaten] ?? [];
		const eating = row === foodRow && column === foodColumn;
		if (eating) {
			this.#eaten++;
		} else {
			this.#occupied.delete(this.#body[this.#tail] ?? 0);
			this.#tail++;
		}

		if (this.#occupied.has(next)) {
			this.#over = true;
			return -1;
		}
		this.#body.push(next);
		this.#occupied.add(next);
		return this.#eaten;
	}
}
