import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { guessTheNumberUsingBitwiseQuestionsII as findNumber } from ".";

/** LeetCode's API, which changes the hidden number as it's asked. */
const api = (hidden: number) => {
	let n = hidden;
	return (num: number) => {
		const same = (~(n ^ num) >>> 0).toString(2).replaceAll("0", "").length;
		n ^= num;
		return same;
	};
};

describe("3094. Guess the Number Using Bitwise Questions II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findNumber(api(31))()).toBe(31);
		expect(findNumber(api(33))()).toBe(33);
		expect(findNumber(api(0))()).toBe(0);
	});

	it("finds random numbers", () => {
		const random = createRandom(3094);
		for (let run = 0; run < 100; run++) {
			const n = random.int(0, 2 ** 30 - 1);
			expect(findNumber(api(n))()).toBe(n);
		}
	});
});
