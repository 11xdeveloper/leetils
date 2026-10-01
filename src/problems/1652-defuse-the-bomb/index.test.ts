import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { defuseTheBomb as decrypt } from ".";

/** Sums each window directly. */
const byBruteForce = (code: number[], k: number): number[] =>
	code.map((_, i) => {
		let sum = 0;
		for (let j = 1; j <= Math.abs(k); j++)
			sum +=
				code[
					(((i + Math.sign(k) * j) % code.length) + code.length) % code.length
				] ?? 0;
		return sum;
	});

describe("1652. Defuse the Bomb", () => {
	it("solves the examples from the problem statement", () => {
		expect(decrypt([5, 7, 1, 4], 3)).toEqual([12, 10, 16, 13]);
		expect(decrypt([1, 2, 3, 4], 0)).toEqual([0, 0, 0, 0]);
		expect(decrypt([2, 4, 9, 3], -2)).toEqual([12, 5, 6, 13]);
	});

	it("matches summing each window on random inputs", () => {
		const random = createRandom(1652);
		for (let run = 0; run < 300; run++) {
			const code = random.array(random.int(1, 10), 1, 100);
			const k = random.int(-(code.length - 1), code.length - 1);
			expect(decrypt(code, k)).toEqual(byBruteForce(code, k));
		}
	});
});
