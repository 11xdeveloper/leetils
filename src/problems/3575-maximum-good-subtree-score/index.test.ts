import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumGoodSubtreeScore as goodSubtreeSum } from ".";

/** Tries every subset of every subtree. */
const byBruteForce = (vals: number[], par: number[]): number => {
	const n = vals.length;
	const inSubtree = (v: number, root: number): boolean => {
		for (let x = v; x >= 0; x = par[x] ?? -1) if (x === root) return true;
		return false;
	};
	let total = 0;
	for (let root = 0; root < n; root++) {
		const nodes = vals.map((_, i) => i).filter((i) => inSubtree(i, root));
		let best = 0;
		for (let mask = 0; mask < 1 << nodes.length; mask++) {
			const chosen = nodes.filter((_, i) => (mask >> i) & 1);
			const digits = chosen.map((i) => String(vals[i])).join("");
			if (new Set(digits).size !== digits.length) continue;
			best = Math.max(
				best,
				chosen.reduce((sum, i) => sum + (vals[i] ?? 0), 0),
			);
		}
		total += best;
	}
	return total % 1_000_000_007;
};

describe("3575. Maximum Good Subtree Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodSubtreeSum([2, 3], [-1, 0])).toBe(8);
		expect(goodSubtreeSum([1, 5, 2], [-1, 0, 0])).toBe(15);
		expect(goodSubtreeSum([34, 1, 2], [-1, 0, 1])).toBe(42);
		expect(goodSubtreeSum([3, 22, 5], [-1, 0, 1])).toBe(18);
	});

	it("matches trying every subset on random trees", () => {
		const random = createRandom(3575);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const vals = random.array(n, 1, 200);
			const par = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			expect(goodSubtreeSum(vals, par)).toBe(byBruteForce(vals, par));
		}
	});
});
