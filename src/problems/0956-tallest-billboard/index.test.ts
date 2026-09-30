import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { tallestBillboard } from ".";

/** Tries putting every rod on either support or neither. */
const byBruteForce = (rods: number[]): number => {
	let best = 0;
	for (let code = 0; code < 3 ** rods.length; code++) {
		let [left, right] = [0, 0];
		let rest = code;
		for (const rod of rods) {
			if (rest % 3 === 1) left += rod;
			else if (rest % 3 === 2) right += rod;
			rest = Math.floor(rest / 3);
		}
		if (left === right) best = Math.max(best, left);
	}
	return best;
};

describe("956. Tallest Billboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(tallestBillboard([1, 2, 3, 6])).toBe(6);
		expect(tallestBillboard([1, 2, 3, 4, 5, 6])).toBe(10);
		expect(tallestBillboard([1, 2])).toBe(0);
	});

	it("matches trying every assignment of rods on random inputs", () => {
		const random = createRandom(956);
		for (let run = 0; run < 300; run++) {
			const rods = random.array(random.int(1, 8), 1, 10);
			expect(tallestBillboard(rods)).toBe(byBruteForce(rods));
		}
	});
});
