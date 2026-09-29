import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthSmallestNumberInMultiplicationTable as findKthNumber } from ".";

describe("668. Kth Smallest Number in Multiplication Table", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKthNumber(3, 3, 5)).toBe(3);
		expect(findKthNumber(2, 3, 6)).toBe(6);
	});

	it("matches sorting the whole table on random inputs", () => {
		const random = createRandom(668);
		for (let run = 0; run < 300; run++) {
			const m = random.int(1, 20);
			const n = random.int(1, 20);
			const table = Array.from(
				{ length: m * n },
				(_, i) => (Math.floor(i / n) + 1) * ((i % n) + 1),
			).sort((a, b) => a - b);
			const k = random.int(1, m * n);
			expect(findKthNumber(m, n, k)).toBe(table[k - 1] ?? 0);
		}
	});

	it("handles the largest inputs", () => {
		expect(findKthNumber(30_000, 30_000, 900_000_000)).toBe(900_000_000);
		expect(findKthNumber(30_000, 30_000, 1)).toBe(1);
	});
});
