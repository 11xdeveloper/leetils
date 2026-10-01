import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSwap } from ".";

const byBruteForce = (num: number): number => {
	const digits = [...String(num)];
	let best = num;
	for (let i = 0; i < digits.length; i++) {
		for (let j = i + 1; j < digits.length; j++) {
			const swapped = [...digits];
			[swapped[i], swapped[j]] = [digits[j] ?? "", digits[i] ?? ""];
			best = Math.max(best, Number(swapped.join("")));
		}
	}
	return best;
};

describe("670. Maximum Swap", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSwap(2736)).toBe(7236);
		expect(maximumSwap(9973)).toBe(9973);
	});

	it("matches trying every swap on random inputs", () => {
		const random = createRandom(670);
		for (let run = 0; run < 1000; run++) {
			const num = random.int(0, 10 ** 8);
			expect(maximumSwap(num)).toBe(byBruteForce(num));
		}
	});
});
