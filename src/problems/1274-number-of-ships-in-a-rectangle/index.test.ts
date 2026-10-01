import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfShipsInARectangle as countShips } from ".";

const sea = (ships: number[][]) => {
	const api = {
		calls: 0,
		hasShips: (topRight: readonly number[], bottomLeft: readonly number[]) => {
			api.calls++;
			const [x1 = 0, y1 = 0] = bottomLeft;
			const [x2 = 0, y2 = 0] = topRight;
			return ships.some(
				([x = 0, y = 0]) => x1 <= x && x <= x2 && y1 <= y && y <= y2,
			);
		},
	};
	return api;
};

describe("1274. Number of Ships in a Rectangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countShips(
				sea([
					[1, 1],
					[2, 2],
					[3, 3],
					[5, 5],
				]),
				[4, 4],
				[0, 0],
			),
		).toBe(3);
		expect(
			countShips(
				sea([
					[1, 1],
					[2, 2],
					[3, 3],
				]),
				[1000, 1000],
				[0, 0],
			),
		).toBe(3);
	});

	it("counts ten random ships in at most 400 calls", () => {
		const random = createRandom(1274);
		for (let run = 0; run < 100; run++) {
			const cells = [
				...new Set(random.array(random.int(0, 10), 0, 1001 * 1001 - 1)),
			];
			const ships = cells.map((cell) => [Math.floor(cell / 1001), cell % 1001]);
			const api = sea(ships);
			expect(countShips(api, [1000, 1000], [0, 0])).toBe(ships.length);
			expect(api.calls).toBeLessThanOrEqual(400);
		}
	});
});
