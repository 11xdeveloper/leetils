import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { guessTheNumberUsingBitwiseQuestionsI as findNumber } from ".";

const api = (n: number) => (num: number) =>
	(n & num).toString(2).replaceAll("0", "").length;

describe("3064. Guess the Number Using Bitwise Questions I", () => {
	it("solves the examples from the problem statement", () => {
		expect(findNumber(api(31))()).toBe(31);
		expect(findNumber(api(33))()).toBe(33);
	});

	it("finds random numbers", () => {
		const random = createRandom(3064);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 2 ** 30 - 1);
			expect(findNumber(api(n))()).toBe(n);
		}
	});
});
