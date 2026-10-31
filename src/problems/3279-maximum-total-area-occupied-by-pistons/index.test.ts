import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalAreaOccupiedByPistons as maxArea } from ".";

/** Simulates a full period second by second. */
const byBruteForce = (
	height: number,
	positions: number[],
	directions: string,
): number => {
	const pos = [...positions];
	const dir: number[] = [...directions].map((d) => (d === "U" ? 1 : -1));
	let best = pos.reduce((a, b) => a + b, 0);
	for (let t = 0; t < 2 * height; t++) {
		pos.forEach((p, i) => {
			if ((p === height && dir[i] === 1) || (p === 0 && dir[i] === -1))
				dir[i] = -(dir[i] ?? 0);
			pos[i] = p + (dir[i] ?? 0);
		});
		best = Math.max(
			best,
			pos.reduce((a, b) => a + b, 0),
		);
	}
	return best;
};

describe("3279. Maximum Total Area Occupied by Pistons", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxArea(5, [2, 5], "UD")).toBe(7);
		expect(maxArea(6, [0, 0, 6, 3], "UUDU")).toBe(15);
	});

	it("matches simulating second by second on random pistons", () => {
		const random = createRandom(3279);
		for (let run = 0; run < 300; run++) {
			const height = random.int(1, 8);
			const positions = random.array(random.int(1, 6), 0, height);
			const directions = random.string(positions.length, "UD");
			expect(maxArea(height, positions, directions)).toBe(
				byBruteForce(height, positions, directions),
			);
		}
	});
});
