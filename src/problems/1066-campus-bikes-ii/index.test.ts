import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { campusBikesII as assignBikes } from ".";

/** Tries every assignment of distinct bikes. */
const byBruteForce = (workers: number[][], bikes: number[][]): number => {
	const search = (worker: number, used: number): number => {
		if (worker === workers.length) return 0;
		const [wx = 0, wy = 0] = workers[worker] ?? [];
		let best = Number.POSITIVE_INFINITY;
		for (const [b, [bx = 0, by = 0]] of bikes.entries()) {
			if (!(used & (1 << b)))
				best = Math.min(
					best,
					Math.abs(wx - bx) +
						Math.abs(wy - by) +
						search(worker + 1, used | (1 << b)),
				);
		}
		return best;
	};
	return search(0, 0);
};

describe("1066. Campus Bikes II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			assignBikes(
				[
					[0, 0],
					[2, 1],
				],
				[
					[1, 2],
					[3, 3],
				],
			),
		).toBe(6);
		expect(
			assignBikes(
				[
					[0, 0],
					[1, 1],
					[2, 0],
				],
				[
					[1, 0],
					[2, 2],
					[2, 1],
				],
			),
		).toBe(4);
		expect(
			assignBikes(
				[
					[0, 0],
					[1, 0],
					[2, 0],
					[3, 0],
					[4, 0],
				],
				[
					[0, 999],
					[1, 999],
					[2, 999],
					[3, 999],
					[4, 999],
				],
			),
		).toBe(4995);
	});

	it("matches trying every assignment on random campuses", () => {
		const random = createRandom(1066);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 4);
			const workers = Array.from({ length: n }, () => [
				random.int(0, 20),
				random.int(0, 20),
			]);
			const bikes = Array.from({ length: random.int(n, 6) }, () => [
				random.int(0, 20),
				random.int(0, 20),
			]);
			expect(assignBikes(workers, bikes)).toBe(byBruteForce(workers, bikes));
		}
	});
});
