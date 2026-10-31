import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumberOfBalancedPermutations as countBalancedPermutations } from ".";

/** Checks every distinct permutation. */
const byBruteForce = (num: string): number => {
	const seen = new Set<string>();
	const permute = (prefix: string, rest: string): void => {
		if (rest === "") {
			seen.add(prefix);
			return;
		}
		for (let i = 0; i < rest.length; i++)
			permute(prefix + rest.charAt(i), rest.slice(0, i) + rest.slice(i + 1));
	};
	permute("", num);
	let count = 0;
	for (const p of seen) {
		let balance = 0;
		for (let i = 0; i < p.length; i++)
			balance += (i % 2 === 0 ? 1 : -1) * Number(p[i]);
		if (balance === 0) count++;
	}
	return count;
};

describe("3343. Count Number of Balanced Permutations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBalancedPermutations("123")).toBe(2);
		expect(countBalancedPermutations("112")).toBe(1);
		expect(countBalancedPermutations("12345")).toBe(0);
	});

	it("matches checking every permutation on random strings", () => {
		const random = createRandom(3343);
		for (let run = 0; run < 100; run++) {
			const num = random.string(random.int(2, 7), "0123");
			expect(countBalancedPermutations(num)).toBe(byBruteForce(num));
		}
	});
});
