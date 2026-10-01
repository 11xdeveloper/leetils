import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestRectangleInHistogram } from ".";

const byBruteForce = (heights: number[]): number => {
	let largest = 0;
	for (let i = 0; i < heights.length; i++) {
		let lowest = Number.POSITIVE_INFINITY;
		for (let j = i; j < heights.length; j++) {
			lowest = Math.min(lowest, heights[j] ?? 0);
			largest = Math.max(largest, lowest * (j - i + 1));
		}
	}
	return largest;
};

describe("84. Largest Rectangle in Histogram", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestRectangleInHistogram([2, 1, 5, 6, 2, 3])).toBe(10);
		expect(largestRectangleInHistogram([2, 4])).toBe(4);
	});

	it("handles equal, increasing and decreasing heights", () => {
		expect(largestRectangleInHistogram([3, 3, 3])).toBe(9);
		expect(largestRectangleInHistogram([1, 2, 3, 4, 5])).toBe(9);
		expect(largestRectangleInHistogram([5, 4, 3, 2, 1])).toBe(9);
	});

	it("handles zero heights", () => {
		expect(largestRectangleInHistogram([0])).toBe(0);
		expect(largestRectangleInHistogram([2, 0, 2])).toBe(2);
	});

	it("matches checking every span on random inputs", () => {
		const random = createRandom(84);
		for (let run = 0; run < 500; run++) {
			const heights = random.array(random.int(1, 20), 0, 8);
			expect(largestRectangleInHistogram(heights)).toBe(byBruteForce(heights));
		}
	});
});
