import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignSnakeGame } from ".";

/** A straightforward snake: an array of [row, column] cells, head first. */
const simulate = (
	width: number,
	height: number,
	food: number[][],
	moves: string[],
): number[] => {
	let body: [number, number][] = [[0, 0]];
	let eaten = 0;
	let over = false;
	const step: Record<string, [number, number]> = {
		U: [-1, 0],
		D: [1, 0],
		L: [0, -1],
		R: [0, 1],
	};
	return moves.map((direction) => {
		if (over) return -1;
		const [hr, hc] = body[0] ?? [0, 0];
		const [dr, dc] = step[direction] ?? [0, 0];
		const head: [number, number] = [hr + dr, hc + dc];
		const [fr, fc] = food[eaten] ?? [];
		const eating = head[0] === fr && head[1] === fc;
		const rest = eating ? body : body.slice(0, -1);
		if (
			head[0] < 0 ||
			head[0] >= height ||
			head[1] < 0 ||
			head[1] >= width ||
			rest.some(([r, c]) => r === head[0] && c === head[1])
		) {
			over = true;
			return -1;
		}
		if (eating) eaten++;
		body = [head, ...rest];
		return eaten;
	});
};

describe("353. Design Snake Game", () => {
	it("solves the example from the problem statement", () => {
		const game = new DesignSnakeGame(3, 2, [
			[1, 2],
			[0, 1],
		]);
		expect(["R", "D", "R", "U", "L", "U"].map((d) => game.move(d))).toEqual([
			0, 0, 1, 1, 2, -1,
		]);
	});

	it("lets the head move into the cell the tail is leaving", () => {
		const game = new DesignSnakeGame(2, 2, [
			[0, 1],
			[1, 1],
			[1, 0],
		]);
		expect(["R", "D", "L", "U"].map((d) => game.move(d))).toEqual([1, 2, 3, 3]);
	});

	it("matches a straightforward simulation on random games", () => {
		const random = createRandom(353);
		for (let run = 0; run < 300; run++) {
			const width = random.int(1, 5);
			const height = random.int(1, 5);
			const food = Array.from({ length: random.int(1, 6) }, () => [
				random.int(0, height - 1),
				random.int(0, width - 1),
			]);
			const moves = Array.from({ length: 20 }, () =>
				"UDLR".charAt(random.int(0, 3)),
			);
			const game = new DesignSnakeGame(width, height, food);
			expect(moves.map((d) => game.move(d))).toEqual(
				simulate(width, height, food, moves),
			);
		}
	});
});
