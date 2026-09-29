import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { assignCookies as findContentChildren } from ".";

/** Tries giving each child each unused cookie, or none. */
const byBruteForce = (g: number[], s: number[]): number => {
	const search = (child: number, used: number): number => {
		if (child === g.length) return 0;
		let best = search(child + 1, used);
		for (const [i, size] of s.entries()) {
			if (!(used & (1 << i)) && size >= (g[child] ?? 0))
				best = Math.max(best, 1 + search(child + 1, used | (1 << i)));
		}
		return best;
	};
	return search(0, 0);
};

describe("455. Assign Cookies", () => {
	it("solves the examples from the problem statement", () => {
		expect(findContentChildren([1, 2, 3], [1, 1])).toBe(1);
		expect(findContentChildren([1, 2], [1, 2, 3])).toBe(2);
		expect(findContentChildren([1], [])).toBe(0);
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(455);
		for (let run = 0; run < 300; run++) {
			const g = random.array(random.int(1, 5), 1, 6);
			const s = random.array(random.int(0, 5), 1, 6);
			expect(findContentChildren(g, s)).toBe(byBruteForce(g, s));
		}
	});
});
