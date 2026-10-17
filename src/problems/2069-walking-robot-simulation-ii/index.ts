/**
 * 2069. Walking Robot Simulation II
 *
 * A robot on a `width × height` grid starts at (0, 0) facing East. Each
 * step moves it forward, turning counterclockwise first if it would leave
 * the grid. Reports its position and direction after any number of steps.
 *
 * The robot only ever walks the border, a loop of
 * `2 · (width + height) - 4` cells, so track its index along the loop.
 * Corners keep the direction it arrived in, except the start, which faces
 * South once the robot has moved.
 *
 * @see https://leetcode.com/problems/walking-robot-simulation-ii/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(1)
 *
 * @example
 * const robot = new WalkingRobotSimulationII(6, 3);
 * robot.step(2);
 * robot.getPos(); // [2, 0]
 * robot.getDir(); // "East"
 */
export class WalkingRobotSimulationII {
	readonly #width: number;
	readonly #height: number;
	readonly #perimeter: number;
	#index = 0;
	#moved = false;

	constructor(width: number, height: number) {
		this.#width = width;
		this.#height = height;
		this.#perimeter = 2 * (width + height) - 4;
	}

	step(num: number): void {
		this.#index = (this.#index + num) % this.#perimeter;
		this.#moved = true;
	}

	getPos(): number[] {
		const [w, h, i] = [this.#width - 1, this.#height - 1, this.#index];
		if (i <= w) return [i, 0];
		if (i <= w + h) return [w, i - w];
		if (i <= 2 * w + h) return [w - (i - w - h), h];
		return [0, h - (i - 2 * w - h)];
	}

	getDir(): string {
		const [w, h, i] = [this.#width - 1, this.#height - 1, this.#index];
		if (i === 0) return this.#moved ? "South" : "East";
		if (i <= w) return "East";
		if (i <= w + h) return "North";
		if (i <= 2 * w + h) return "West";
		return "South";
	}
}
