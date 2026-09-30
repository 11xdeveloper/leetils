import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { KthLargestElementInAStream as KthLargest } from ".";

describe("703. Kth Largest Element in a Stream", () => {
	it("solves the example from the problem statement", () => {
		const stream = new KthLargest(3, [4, 5, 8, 2]);
		expect([3, 5, 10, 9, 4].map((val) => stream.add(val))).toEqual([
			4, 5, 5, 8, 8,
		]);
	});

	it("matches sorting everything seen on random streams", () => {
		const random = createRandom(703);
		for (let run = 0; run < 200; run++) {
			const k = random.int(1, 5);
			const initial = random.array(random.int(k - 1, 8), -20, 20);
			const stream = new KthLargest(k, initial);
			const seen = [...initial];
			for (let i = 0; i < 20; i++) {
				const val = random.int(-20, 20);
				seen.push(val);
				expect(stream.add(val)).toBe(
					seen.toSorted((a, b) => b - a)[k - 1] ?? 0,
				);
			}
		}
	});
});
