import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToVisitAllHouses as minTotalTime } from ".";

/** Walks each step both ways. */
const byBruteForce = (
	forward: number[],
	backward: number[],
	queries: number[],
): number => {
	const n = forward.length;
	let total = 0;
	let at = 0;
	for (const target of queries) {
		let ahead = 0;
		for (let i = at; i !== target; i = (i + 1) % n) ahead += forward[i] ?? 0;
		let behind = 0;
		for (let i = at; i !== target; i = (i - 1 + n) % n)
			behind += backward[i] ?? 0;
		total += Math.min(ahead, behind);
		at = target;
	}
	return total;
};

describe("3540. Minimum Time to Visit All Houses", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTotalTime([1, 4, 4], [4, 1, 2], [1, 2, 0, 2])).toBe(12);
		expect(minTotalTime([1, 1, 1, 1], [2, 2, 2, 2], [1, 2, 3, 0])).toBe(4);
	});

	it("matches walking both ways on random circles", () => {
		const random = createRandom(3540);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const forward = random.array(n, 1, 9);
			const backward = random.array(n, 1, 9);
			const queries: number[] = [];
			let last = 0;
			for (let i = random.int(1, 6); i > 0; i--) {
				let next = random.int(0, n - 1);
				while (next === last) next = random.int(0, n - 1);
				queries.push(next);
				last = next;
			}
			expect(minTotalTime(forward, backward, queries)).toBe(
				byBruteForce(forward, backward, queries),
			);
		}
	});
});
