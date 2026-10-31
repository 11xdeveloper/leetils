import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizePointsAfterChoosingKTasks as maxPoints } from ".";

/** Tries every assignment. */
const byBruteForce = (t1: number[], t2: number[], k: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let mask = 0; mask < 1 << t1.length; mask++) {
		let [count, total] = [0, 0];
		t1.forEach((a, i) => {
			if ((mask >> i) & 1) {
				count++;
				total += a;
			} else total += t2[i] ?? 0;
		});
		if (count >= k) best = Math.max(best, total);
	}
	return best;
};

describe("3767. Maximize Points After Choosing K Tasks", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPoints([5, 2, 10], [10, 3, 8], 2)).toBe(22);
		expect(maxPoints([10, 20, 30], [5, 15, 25], 2)).toBe(60);
		expect(maxPoints([1, 2, 3], [4, 5, 6], 0)).toBe(15);
	});

	it("matches trying every assignment on random tasks", () => {
		const random = createRandom(3767);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const [t1, t2] = [random.array(n, 1, 10), random.array(n, 1, 10)];
			const k = random.int(0, n);
			expect(maxPoints(t1, t2, k)).toBe(byBruteForce(t1, t2, k));
		}
	});
});
