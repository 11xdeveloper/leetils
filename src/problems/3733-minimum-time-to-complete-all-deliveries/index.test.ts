import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToCompleteAllDeliveries as minimumTime } from ".";

/** Simulates hour by hour, searching every assignment. */
const byBruteForce = (d: number[], r: number[]): number => {
	for (let t = 1; ; t++) {
		// Can the hours 1..t serve the deliveries? Try every count split by matching greedily.
		const hours = Array.from({ length: t }, (_, i) => i + 1);
		const only0 = hours.filter(
			(h) => h % (r[0] ?? 1) !== 0 && h % (r[1] ?? 1) === 0,
		).length;
		const only1 = hours.filter(
			(h) => h % (r[1] ?? 1) !== 0 && h % (r[0] ?? 1) === 0,
		).length;
		const both = hours.filter(
			(h) => h % (r[0] ?? 1) !== 0 && h % (r[1] ?? 1) !== 0,
		).length;
		const need0 = Math.max(0, (d[0] ?? 0) - only0);
		const need1 = Math.max(0, (d[1] ?? 0) - only1);
		if (need0 + need1 <= both) return t;
	}
};

describe("3733. Minimum Time to Complete All Deliveries", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime([3, 1], [2, 3])).toBe(5);
		expect(minimumTime([1, 3], [2, 2])).toBe(7);
		expect(minimumTime([2, 1], [3, 4])).toBe(3);
	});

	it("matches counting hours directly on random input", () => {
		const random = createRandom(3733);
		for (let run = 0; run < 300; run++) {
			const d = [random.int(1, 12), random.int(1, 12)];
			const r = [random.int(2, 6), random.int(2, 6)];
			expect(minimumTime(d, r)).toBe(byBruteForce(d, r));
		}
	});
});
