import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysWhereSquareOfNumberIsEqualToProductOfTwoNumbers as numTriplets } from ".";

/** Checks every triple of both types. */
const byBruteForce = (a: number[], b: number[]): number => {
	const count = (squares: number[], pairs: number[]) => {
		let total = 0;
		for (const x of squares) {
			for (let j = 0; j < pairs.length; j++) {
				for (let k = j + 1; k < pairs.length; k++)
					if (x * x === (pairs[j] ?? 0) * (pairs[k] ?? 0)) total++;
			}
		}
		return total;
	};
	return count(a, b) + count(b, a);
};

describe("1577. Number of Ways Where Square of Number Is Equal to Product of Two Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(numTriplets([7, 4], [5, 2, 8, 9])).toBe(1);
		expect(numTriplets([1, 1], [1, 1, 1])).toBe(9);
		expect(numTriplets([7, 7, 8, 3], [1, 2, 9, 7])).toBe(2);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(1577);
		for (let run = 0; run < 300; run++) {
			const a = random.array(random.int(1, 8), 1, 9);
			const b = random.array(random.int(1, 8), 1, 9);
			expect(numTriplets(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
