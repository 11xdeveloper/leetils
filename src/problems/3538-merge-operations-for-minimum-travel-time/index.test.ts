import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mergeOperationsForMinimumTravelTime as minTravelTime } from ".";

/** Tries every sequence of k merges. */
const byBruteForce = (
	position: number[],
	time: number[],
	k: number,
): number => {
	if (k === 0) {
		let total = 0;
		for (let i = 0; i + 1 < position.length; i++)
			total += ((position[i + 1] ?? 0) - (position[i] ?? 0)) * (time[i] ?? 0);
		return total;
	}
	let best = Number.POSITIVE_INFINITY;
	for (let i = 1; i + 1 < position.length; i++) {
		const p = position.filter((_, j) => j !== i);
		const t = [...time];
		t[i + 1] = (t[i + 1] ?? 0) + (t[i] ?? 0);
		t.splice(i, 1);
		best = Math.min(best, byBruteForce(p, t, k - 1));
	}
	return best;
};

describe("3538. Merge Operations for Minimum Travel Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTravelTime(10, 4, 1, [0, 3, 8, 10], [5, 8, 3, 6])).toBe(62);
		expect(minTravelTime(5, 5, 1, [0, 1, 2, 3, 5], [8, 3, 9, 3, 3])).toBe(34);
	});

	it("matches trying every merge sequence on random roads", () => {
		const random = createRandom(3538);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 7);
			const position = [0];
			for (let i = 1; i < n; i++)
				position.push((position.at(-1) ?? 0) + random.int(1, 4));
			const time = random.array(n, 1, 9);
			const k = random.int(0, n - 2);
			expect(minTravelTime(position.at(-1) ?? 0, n, k, position, time)).toBe(
				byBruteForce(position, time, k),
			);
		}
	});
});
