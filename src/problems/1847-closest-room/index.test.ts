import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { closestRoom } from ".";

/** Checks every room for every query. */
const byBruteForce = (rooms: number[][], queries: number[][]): number[] =>
	queries.map(([preferred = 0, minSize = 0]) => {
		let best = -1;
		for (const [id = 0, size = 0] of rooms) {
			if (size < minSize) continue;
			const [d, bestD] = [Math.abs(id - preferred), Math.abs(best - preferred)];
			if (best === -1 || d < bestD || (d === bestD && id < best)) best = id;
		}
		return best;
	});

describe("1847. Closest Room", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			closestRoom(
				[
					[2, 2],
					[1, 2],
					[3, 2],
				],
				[
					[3, 1],
					[3, 3],
					[5, 2],
				],
			),
		).toEqual([3, -1, 3]);
		expect(
			closestRoom(
				[
					[1, 4],
					[2, 3],
					[3, 5],
					[4, 1],
					[5, 2],
				],
				[
					[2, 3],
					[2, 4],
					[2, 5],
				],
			),
		).toEqual([2, 1, 3]);
	});

	it("matches checking every room on random inputs", () => {
		const random = createRandom(1847);
		for (let run = 0; run < 200; run++) {
			const ids = [...new Set(random.array(random.int(1, 10), 1, 30))];
			const rooms = ids.map((id) => [id, random.int(1, 10)]);
			const queries = Array.from({ length: 10 }, () => [
				random.int(1, 30),
				random.int(1, 11),
			]);
			expect(closestRoom(rooms, queries)).toEqual(byBruteForce(rooms, queries));
		}
	});
});
