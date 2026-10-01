import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameIII as canReach } from ".";

/** Grows the reachable set until it stops changing. */
const byBruteForce = (arr: number[], start: number): boolean => {
	const reached = new Set([start]);
	for (let grew = true; grew; ) {
		grew = false;
		for (const at of [...reached]) {
			for (const next of [at + (arr[at] ?? 0), at - (arr[at] ?? 0)]) {
				if (next >= 0 && next < arr.length && !reached.has(next)) {
					reached.add(next);
					grew = true;
				}
			}
		}
	}
	return [...reached].some((at) => arr[at] === 0);
};

describe("1306. Jump Game III", () => {
	it("solves the examples from the problem statement", () => {
		expect(canReach([4, 2, 3, 0, 3, 1, 2], 5)).toBeTrue();
		expect(canReach([4, 2, 3, 0, 3, 1, 2], 0)).toBeTrue();
		expect(canReach([3, 0, 2, 1, 2], 2)).toBeFalse();
	});

	it("matches growing the reachable set on random inputs", () => {
		const random = createRandom(1306);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const arr = random.array(n, 0, n - 1);
			const start = random.int(0, n - 1);
			expect(canReach(arr, start)).toBe(byBruteForce(arr, start));
		}
	});
});
