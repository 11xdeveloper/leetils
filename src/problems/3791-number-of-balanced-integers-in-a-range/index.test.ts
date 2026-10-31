import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfBalancedIntegersInARange as countBalanced } from ".";

const balanced = (x: number): boolean => {
	let difference = 0;
	[...String(x)].forEach((d, i) => {
		difference += i % 2 === 0 ? Number(d) : -Number(d);
	});
	return difference === 0;
};

describe("3791. Number of Balanced Integers in a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBalanced(1, 100)).toBe(9);
		expect(countBalanced(120, 129)).toBe(1);
		expect(countBalanced(1234, 1234)).toBe(0);
	});

	it("matches checking every number on random ranges", () => {
		const random = createRandom(3791);
		for (let run = 0; run < 100; run++) {
			const low = random.int(1, 50000);
			const high = random.int(low, low + 2000);
			let expected = 0;
			for (let x = low; x <= high; x++) if (balanced(x)) expected++;
			expect(countBalanced(low, high)).toBe(expected);
		}
	});
});
