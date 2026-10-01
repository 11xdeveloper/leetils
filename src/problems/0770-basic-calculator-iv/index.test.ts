import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { basicCalculatorIV } from ".";

/** A random expression of small integers alongside its value. */
const randomExpression = (random: Random, depth: number): [string, number] => {
	if (depth === 0 || random.int(0, 2) === 0) {
		const value = random.int(0, 9);
		return [String(value), value];
	}
	const [left, a] = randomExpression(random, depth - 1);
	const [right, b] = randomExpression(random, depth - 1);
	const operator = ["+", "-", "*"][random.int(0, 2)] ?? "+";
	const value = operator === "+" ? a + b : operator === "-" ? a - b : a * b;
	return [
		`( ${left} ${operator} ${right} )`
			.replaceAll("( ", "(")
			.replaceAll(" )", ")"),
		value,
	];
};

describe("770. Basic Calculator IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(basicCalculatorIV("e + 8 - a + 5", ["e"], [1])).toEqual([
			"-1*a",
			"14",
		]);
		expect(
			basicCalculatorIV(
				"e - 8 + temperature - pressure",
				["e", "temperature"],
				[1, 12],
			),
		).toEqual(["-1*pressure", "5"]);
		expect(basicCalculatorIV("(e + 8) * (e - 8)", [], [])).toEqual([
			"1*e*e",
			"-64",
		]);
	});

	it("follows the ordering and formatting rules", () => {
		expect(basicCalculatorIV("1 + 2 * 3", [], [])).toEqual(["7"]);
		expect(basicCalculatorIV("0", [], [])).toEqual([]);
		expect(basicCalculatorIV("a * b * c + b * a * c * 4", [], [])).toEqual([
			"5*a*b*c",
		]);
		expect(basicCalculatorIV("b * a - a * b + c", [], [])).toEqual(["1*c"]);
		expect(basicCalculatorIV("aa * b + a * bb + a * a", [], [])).toEqual([
			"1*a*a",
			"1*a*bb",
			"1*aa*b",
		]);
		expect(
			basicCalculatorIV(
				"((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))",
				[],
				[],
			),
		).toEqual([
			"-1*a*a*b*b",
			"2*a*a*b*c",
			"-1*a*a*c*c",
			"1*a*b*b*b",
			"-1*a*b*b*c",
			"-1*a*b*c*c",
			"1*a*c*c*c",
			"-1*b*b*b*c",
			"2*b*b*c*c",
			"-1*b*c*c*c",
			"2*a*a*b",
			"-2*a*a*c",
			"-2*a*b*b",
			"2*a*c*c",
			"1*b*b*b",
			"-1*b*b*c",
			"1*b*c*c",
			"-1*c*c*c",
			"-1*a*a",
			"1*a*b",
			"1*a*c",
			"-1*b*c",
		]);
	});

	it("evaluates random constant expressions to their value", () => {
		const random = createRandom(770);
		for (let run = 0; run < 1000; run++) {
			const [expression, value] = randomExpression(random, 4);
			expect(basicCalculatorIV(expression, [], [])).toEqual(
				value === 0 ? [] : [String(value)],
			);
		}
	});
});
