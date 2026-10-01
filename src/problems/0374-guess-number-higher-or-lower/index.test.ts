import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { guessNumberHigherOrLower } from ".";

const find = (n: number, pick: number): [found: number, calls: number] => {
	let calls = 0;
	const found = guessNumberHigherOrLower((num) => {
		calls++;
		return Math.sign(pick - num);
	})(n);
	return [found, calls];
};

describe("374. Guess Number Higher or Lower", () => {
	it("solves the examples from the problem statement", () => {
		expect(find(10, 6)[0]).toBe(6);
		expect(find(1, 1)[0]).toBe(1);
		expect(find(2, 1)[0]).toBe(1);
	});

	it("finds the number in about log2(n) guesses, up to the 32-bit limit", () => {
		const [found, calls] = find(2 ** 31 - 1, 2 ** 31 - 1);
		expect(found).toBe(2 ** 31 - 1);
		expect(calls).toBeLessThanOrEqual(32);
	});

	it("finds random picks", () => {
		const random = createRandom(374);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 2 ** 31 - 1);
			const pick = random.int(1, n);
			expect(find(n, pick)[0]).toBe(pick);
		}
	});
});
