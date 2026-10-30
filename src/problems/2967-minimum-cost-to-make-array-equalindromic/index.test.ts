import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToMakeArrayEqualindromic as minimumCost } from ".";

const palindromes: number[] = [];
for (let x = 1; x <= 20_000; x++)
	if (String(x) === [...String(x)].reverse().join("")) palindromes.push(x);

/** Tries every palindrome up to a bound. */
const byBruteForce = (nums: number[]): number =>
	Math.min(
		...palindromes.map((y) => nums.reduce((s, x) => s + Math.abs(x - y), 0)),
	);

describe("2967. Minimum Cost to Make Array Equalindromic", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost([1, 2, 3, 4, 5])).toBe(6);
		expect(minimumCost([10, 12, 13, 14, 15])).toBe(11);
		expect(minimumCost([22, 33, 22, 33, 22])).toBe(22);
	});

	it("matches trying every palindrome on random inputs", () => {
		const random = createRandom(2967);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 10 ** random.int(1, 4));
			expect(minimumCost(nums)).toBe(byBruteForce(nums));
		}
	});

	it("handles medians near powers of ten", () => {
		expect(minimumCost([1000])).toBe(1);
		expect(minimumCost([999_999_999, 999_999_999])).toBe(0);
	});
});
