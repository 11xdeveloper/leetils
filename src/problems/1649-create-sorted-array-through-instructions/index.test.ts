import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { createSortedArrayThroughInstructions as createSortedArray } from ".";

/** Compares each instruction with all earlier ones. */
const byBruteForce = (instructions: number[]): number =>
	instructions.reduce((cost, value, i) => {
		const earlier = instructions.slice(0, i);
		return (
			cost +
			Math.min(
				earlier.filter((x) => x < value).length,
				earlier.filter((x) => x > value).length,
			)
		);
	}, 0);

describe("1649. Create Sorted Array through Instructions", () => {
	it("solves the examples from the problem statement", () => {
		expect(createSortedArray([1, 5, 6, 2])).toBe(1);
		expect(createSortedArray([1, 2, 3, 6, 5, 4])).toBe(3);
		expect(createSortedArray([1, 3, 3, 3, 2, 4, 2, 1, 2])).toBe(4);
	});

	it("matches comparing with earlier instructions on random inputs", () => {
		const random = createRandom(1649);
		for (let run = 0; run < 200; run++) {
			const instructions = random.array(random.int(1, 30), 1, 15);
			expect(createSortedArray(instructions)).toBe(byBruteForce(instructions));
		}
	});
});
