import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { expressionAddOperators } from ".";

/** Tries every choice of operator or no operator between each pair of digits. */
const byBruteForce = (num: string, target: number): string[] => {
	const results: string[] = [];
	const choices = ["", "+", "-", "*"];
	for (let mask = 0; mask < 4 ** (num.length - 1); mask++) {
		let expression = num.charAt(0);
		for (let i = 1; i < num.length; i++) {
			expression +=
				(choices[Math.floor(mask / 4 ** (i - 1)) % 4] ?? "") + num.charAt(i);
		}
		if (/(^|[+\-*])0\d/.test(expression)) continue;
		if (new Function(`return ${expression};`)() === target)
			results.push(expression);
	}
	return results.toSorted();
};

describe("282. Expression Add Operators", () => {
	it("solves the examples from the problem statement", () => {
		expect(expressionAddOperators("123", 6).toSorted()).toEqual([
			"1*2*3",
			"1+2+3",
		]);
		expect(expressionAddOperators("232", 8).toSorted()).toEqual([
			"2*3+2",
			"2+3*2",
		]);
		expect(expressionAddOperators("3456237490", 9191)).toEqual([]);
	});

	it("doesn't allow operands with leading zeros", () => {
		expect(expressionAddOperators("105", 5).toSorted()).toEqual([
			"1*0+5",
			"10-5",
		]);
		expect(expressionAddOperators("00", 0).toSorted()).toEqual([
			"0*0",
			"0+0",
			"0-0",
		]);
	});

	it("matches trying every choice of operators on random inputs", () => {
		const random = createRandom(282);
		for (let run = 0; run < 300; run++) {
			const num = random.string(random.int(1, 6), "0123");
			const target = random.int(-20, 40);
			expect(expressionAddOperators(num, target).toSorted()).toEqual(
				byBruteForce(num, target),
			);
		}
	});
});
