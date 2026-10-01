import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestBridge } from ".";

describe("934. Shortest Bridge", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestBridge([
				[0, 1],
				[1, 0],
			]),
		).toBe(1);
		expect(
			shortestBridge([
				[0, 1, 0],
				[0, 0, 0],
				[0, 0, 1],
			]),
		).toBe(2);
		expect(
			shortestBridge([
				[1, 1, 1, 1, 1],
				[1, 0, 0, 0, 1],
				[1, 0, 1, 0, 1],
				[1, 0, 0, 0, 1],
				[1, 1, 1, 1, 1],
			]),
		).toBe(1);
	});

	it("needs the Manhattan distance minus one between two single cells", () => {
		const random = createRandom(934);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 8);
			const [r1, c1, r2, c2] = [
				random.int(0, n - 1),
				random.int(0, n - 1),
				random.int(0, n - 1),
				random.int(0, n - 1),
			];
			const distance = Math.abs(r1 - r2) + Math.abs(c1 - c2);
			if (distance < 2) continue;
			const grid = Array.from({ length: n }, (_, r) =>
				Array.from({ length: n }, (_, c) =>
					(r === r1 && c === c1) || (r === r2 && c === c2) ? 1 : 0,
				),
			);
			expect(shortestBridge(grid)).toBe(distance - 1);
		}
	});
});
