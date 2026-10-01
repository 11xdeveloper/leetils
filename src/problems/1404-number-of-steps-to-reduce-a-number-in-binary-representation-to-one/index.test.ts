import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfStepsToReduceANumberInBinaryRepresentationToOne as numSteps } from ".";

/** Follows the steps with BigInt. */
const byBruteForce = (s: string): number => {
	let steps = 0;
	for (let n = BigInt(`0b${s}`); n !== 1n; n = n % 2n === 0n ? n / 2n : n + 1n)
		steps++;
	return steps;
};

describe("1404. Number of Steps to Reduce a Number in Binary Representation to One", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSteps("1101")).toBe(6);
		expect(numSteps("10")).toBe(1);
		expect(numSteps("1")).toBe(0);
	});

	it("matches following the steps on random numbers up to 500 bits", () => {
		const random = createRandom(1404);
		for (let run = 0; run < 300; run++) {
			const s = `1${random.string(random.int(0, run < 250 ? 12 : 499), "01")}`;
			expect(numSteps(s)).toBe(byBruteForce(s));
		}
	});
});
