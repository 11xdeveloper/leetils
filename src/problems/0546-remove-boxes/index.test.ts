import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeBoxes } from ".";

/** Tries removing every run, in every order. */
const byBruteForce = (boxes: number[]): number => {
	const memo = new Map<string, number>();
	const search = (row: number[]): number => {
		if (row.length === 0) return 0;
		const key = row.join();
		const known = memo.get(key);
		if (known !== undefined) return known;
		let best = 0;
		for (let start = 0; start < row.length; ) {
			let end = start;
			while (end < row.length && row[end] === row[start]) end++;
			best = Math.max(
				best,
				(end - start) ** 2 +
					search([...row.slice(0, start), ...row.slice(end)]),
			);
			start = end;
		}
		memo.set(key, best);
		return best;
	};
	return search(boxes);
};

describe("546. Remove Boxes", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1])).toBe(23);
		expect(removeBoxes([1, 1, 1])).toBe(9);
		expect(removeBoxes([1])).toBe(1);
	});

	it("matches trying every order of removals on random inputs", () => {
		const random = createRandom(546);
		for (let run = 0; run < 300; run++) {
			const boxes = random.array(random.int(1, 10), 1, 3);
			expect(removeBoxes(boxes)).toBe(byBruteForce(boxes));
		}
	});

	it("handles 100 boxes quickly", () => {
		const random = createRandom(5460);
		expect(removeBoxes(random.array(100, 1, 100))).toBeGreaterThanOrEqual(100);
		expect(removeBoxes(new Array(100).fill(7))).toBe(10_000);
	});
});
