import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { basicCalculator } from ".";

/** A random valid expression; `-` only negates at the start of an expression. */
const randomExpression = (random: Random, depth: number): string => {
	const term = (): string =>
		depth > 0 && random.int(0, 3) === 0
			? `(${randomExpression(random, depth - 1)})`
			: String(random.int(0, 30));
	let expression = (random.int(0, 3) === 0 ? "-" : "") + term();
	for (let i = random.int(0, 3); i > 0; i--) {
		expression += `${random.int(0, 1) === 0 ? " + " : "-"}${term()}`;
	}
	return expression;
};

describe("224. Basic Calculator", () => {
	it("solves the examples from the problem statement", () => {
		expect(basicCalculator("1 + 1")).toBe(2);
		expect(basicCalculator(" 2-1 + 2 ")).toBe(3);
		expect(basicCalculator("(1+(4+5+2)-3)+(6+8)")).toBe(23);
	});

	it("negates numbers and parenthesised expressions", () => {
		expect(basicCalculator("-1")).toBe(-1);
		expect(basicCalculator("-(2 + 3)")).toBe(-5);
		expect(basicCalculator("1-(-(2))")).toBe(3);
	});

	it("reads multi-digit numbers", () => {
		expect(basicCalculator("2147483647")).toBe(2147483647);
		expect(basicCalculator("100 - 1")).toBe(99);
	});

	it("never returns -0", () => {
		expect(basicCalculator("-0")).toBe(0);
	});

	it("agrees with JavaScript on random expressions", () => {
		const random = createRandom(224);
		for (let run = 0; run < 1000; run++) {
			const expression = randomExpression(random, 3);
			expect(basicCalculator(expression)).toBe(
				new Function(`return ${expression};`)() || 0,
			);
		}
	});
});
