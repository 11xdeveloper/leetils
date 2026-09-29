import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { largestNumber } from ".";

/** Tries every order, comparing the results as numbers. */
const byBruteForce = (nums: number[]): string => {
	let best = -1n;
	for (const order of permutations(nums))
		best = BigInt(order.join("")) > best ? BigInt(order.join("")) : best;
	return String(best);
};

describe("179. Largest Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestNumber([10, 2])).toBe("210");
		expect(largestNumber([3, 30, 34, 5, 9])).toBe("9534330");
	});

	it("returns a single 0 when every number is zero", () => {
		expect(largestNumber([0, 0, 0])).toBe("0");
	});

	it("orders numbers that share a prefix", () => {
		expect(largestNumber([121, 12])).toBe("12121");
		expect(largestNumber([824, 8247])).toBe("8248247");
	});

	it("matches trying every order on random inputs", () => {
		const random = createRandom(179);
		for (let run = 0; run < 300; run++) {
			const nums = Array.from({ length: random.int(1, 6) }, () =>
				random.int(0, 3) === 0 ? 0 : random.int(0, 1000),
			);
			expect(largestNumber(nums)).toBe(byBruteForce(nums));
		}
	});
});
