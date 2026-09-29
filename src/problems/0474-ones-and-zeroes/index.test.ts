import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { onesAndZeroes as findMaxForm } from ".";

const byBruteForce = (strs: string[], m: number, n: number): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << strs.length; mask++) {
		const chosen = strs.filter((_, i) => mask & (1 << i)).join("");
		const zeros = [...chosen].filter((char) => char === "0").length;
		if (zeros <= m && chosen.length - zeros <= n)
			best = Math.max(best, strs.filter((_, i) => mask & (1 << i)).length);
	}
	return best;
};

describe("474. Ones and Zeroes", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)).toBe(4);
		expect(findMaxForm(["10", "0", "1"], 1, 1)).toBe(2);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(474);
		for (let run = 0; run < 500; run++) {
			const strs = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 4), "01"),
			);
			const m = random.int(1, 6);
			const n = random.int(1, 6);
			expect(findMaxForm(strs, m, n)).toBe(byBruteForce(strs, m, n));
		}
	});
});
