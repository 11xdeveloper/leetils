import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { constructingTwoIncreasingArrays as minLargest } from ".";

/** Tries every assignment of small numbers. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	let best = Number.POSITIVE_INFINITY;
	const all = [
		...nums1.map((b) => [0, b] as const),
		...nums2.map((b) => [1, b] as const),
	];
	const used = new Set<number>();
	const last = [0, 0];
	const place = (k: number, largest: number): void => {
		if (largest >= best) return;
		if (k === all.length) {
			best = largest;
			return;
		}
		const [which, parity] = all[k] ?? [0, 0];
		for (let v = (last[which] ?? 0) + 1; v <= 2 * all.length + 2; v++) {
			if (v % 2 !== parity || used.has(v)) continue;
			const saved = last[which] ?? 0;
			used.add(v);
			last[which] = v;
			place(k + 1, Math.max(largest, v));
			used.delete(v);
			last[which] = saved;
		}
	};
	place(0, 0);
	return best;
};

describe("3269. Constructing Two Increasing Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLargest([], [1, 0, 1, 1])).toBe(5);
		expect(minLargest([0, 1, 0, 1], [1, 0, 0, 1])).toBe(9);
		expect(minLargest([0, 1, 0, 0, 1], [0, 0, 0, 1])).toBe(13);
	});

	it("matches trying every assignment on small random arrays", () => {
		const random = createRandom(3269);
		for (let run = 0; run < 60; run++) {
			const nums1 = random.array(random.int(0, 3), 0, 1);
			const nums2 = random.array(random.int(1, 3), 0, 1);
			expect(minLargest(nums1, nums2)).toBe(byBruteForce(nums1, nums2));
		}
	});
});
