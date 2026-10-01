import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestValuesFromLabels as largestValsFromLabels } from ".";

describe("1090. Largest Values From Labels", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestValsFromLabels([5, 4, 3, 2, 1], [1, 1, 2, 2, 3], 3, 1)).toBe(
			9,
		);
		expect(largestValsFromLabels([5, 4, 3, 2, 1], [1, 3, 3, 3, 2], 3, 2)).toBe(
			12,
		);
		expect(largestValsFromLabels([9, 8, 8, 7, 6], [0, 0, 0, 1, 1], 3, 1)).toBe(
			16,
		);
	});

	it("matches trying every subset on random items", () => {
		const random = createRandom(1090);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const values = random.array(n, 0, 10);
			const labels = random.array(n, 0, 2);
			const [numWanted, useLimit] = [random.int(1, n), random.int(1, 3)];
			let best = 0;
			for (let mask = 0; mask < 1 << n; mask++) {
				const chosen = values.map((_, i) => i).filter((i) => mask & (1 << i));
				if (chosen.length > numWanted) continue;
				if (
					[0, 1, 2].some(
						(label) =>
							chosen.filter((i) => labels[i] === label).length > useLimit,
					)
				)
					continue;
				best = Math.max(
					best,
					chosen.reduce((sum, i) => sum + (values[i] ?? 0), 0),
				);
			}
			expect(largestValsFromLabels(values, labels, numWanted, useLimit)).toBe(
				best,
			);
		}
	});
});
