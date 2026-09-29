import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { basicCalculatorII } from ".";

/** Evaluates with BigInt, whose division truncates towards zero like the problem's. */
const byBigInt = (expression: string): number =>
	Number(new Function(`return ${expression.replaceAll(/\d+/g, "$&n")};`)());

describe("227. Basic Calculator II", () => {
	it("solves the examples from the problem statement", () => {
		expect(basicCalculatorII("3+2*2")).toBe(7);
		expect(basicCalculatorII(" 3/2 ")).toBe(1);
		expect(basicCalculatorII(" 3+5 / 2 ")).toBe(5);
	});

	it("truncates negative quotients towards zero", () => {
		expect(basicCalculatorII("1-7/2")).toBe(-2);
		expect(basicCalculatorII("0-3/2")).toBe(-1);
	});

	it("evaluates chains of * and / from left to right", () => {
		expect(basicCalculatorII("14/3*2")).toBe(8);
		expect(basicCalculatorII("2*3/4")).toBe(1);
	});

	it("agrees with BigInt arithmetic on random expressions", () => {
		const random = createRandom(227);
		for (let run = 0; run < 1000; run++) {
			let expression = String(random.int(0, 50));
			for (let i = random.int(0, 5); i > 0; i--) {
				const operator = "+-*/".charAt(random.int(0, 3));
				const number = operator === "/" ? random.int(1, 9) : random.int(0, 50);
				expression += ` ${operator} ${number}`;
			}
			expect(basicCalculatorII(expression)).toBe(byBigInt(expression));
		}
	});
});
