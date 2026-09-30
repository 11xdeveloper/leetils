import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { scoreOfParentheses } from ".";

/** A random balanced string alongside its score from the definition. */
const randomBalanced = (random: Random, depth: number): [string, number] => {
	let text = "";
	let score = 0;
	for (let parts = random.int(1, 3); parts > 0; parts--) {
		if (depth === 0 || random.int(0, 1) === 0) {
			text += "()";
			score += 1;
		} else {
			const [inner, innerScore] = randomBalanced(random, depth - 1);
			text += `(${inner})`;
			score += 2 * innerScore;
		}
	}
	return [text, score];
};

describe("856. Score of Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(scoreOfParentheses("()")).toBe(1);
		expect(scoreOfParentheses("(())")).toBe(2);
		expect(scoreOfParentheses("()()")).toBe(2);
	});

	it("matches the recursive definition on random strings", () => {
		const random = createRandom(856);
		for (let run = 0; run < 1000; run++) {
			const [text, score] = randomBalanced(random, 4);
			expect(scoreOfParentheses(text)).toBe(score);
		}
	});
});
