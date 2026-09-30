import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { basicCalculatorIII as calculate } from ".";

/** A random fully parenthesised expression alongside its value, or undefined after a division by zero. */
const randomExpression = (
	random: Random,
	depth: number,
): [string, number] | undefined => {
	if (depth === 0 || random.int(0, 2) === 0) {
		const value = random.int(0, 30);
		return [String(value), value];
	}
	const left = randomExpression(random, depth - 1);
	const right = randomExpression(random, depth - 1);
	if (!left || !right) return undefined;
	const operator = "+-*/".charAt(random.int(0, 3));
	const [a, b] = [left[1], right[1]];
	if (operator === "/" && b === 0) return undefined;
	const value =
		operator === "+"
			? a + b
			: operator === "-"
				? a - b
				: operator === "*"
					? a * b
					: Math.trunc(a / b);
	return [`(${left[0]}${operator}${right[0]})`, value];
};

/** Evaluates a flat expression by folding * and / first, then + and -. */
const flat = (s: string): number => {
	const terms = s.split(/(?=[+-])/).map((term) => {
		const sign = term.startsWith("-") ? -1 : 1;
		const [first = "0", ...rest] = term.replace(/^[+-]/, "").split(/(?=[*/])/);
		let value = Number(first);
		for (const part of rest)
			value = part.startsWith("*")
				? value * Number(part.slice(1))
				: Math.trunc(value / Number(part.slice(1)));
		return sign * value;
	});
	return terms.reduce((a, b) => a + b, 0);
};

describe("772. Basic Calculator III", () => {
	it("solves the examples from the problem statement", () => {
		expect(calculate("1+1")).toBe(2);
		expect(calculate("6-4/2")).toBe(4);
		expect(calculate("2*(5+5*2)/3+(6/2+8)")).toBe(21);
	});

	it("truncates negative quotients towards zero", () => {
		expect(calculate("(0-7)/2")).toBe(-3);
	});

	it("evaluates random parenthesised expressions", () => {
		const random = createRandom(772);
		for (let run = 0; run < 1000; run++) {
			const generated = randomExpression(random, 4);
			if (generated) expect(calculate(generated[0])).toBe(generated[1]);
		}
	});

	it("follows precedence in random flat expressions", () => {
		const random = createRandom(7720);
		for (let run = 0; run < 1000; run++) {
			let s = String(random.int(0, 20));
			for (let i = random.int(0, 5); i > 0; i--)
				s += "+-*/".charAt(random.int(0, 3)) + random.int(1, 20);
			expect(calculate(s)).toBe(flat(s));
		}
	});

	it("handles very deep nesting", () => {
		expect(calculate(`${"(".repeat(5000)}7${")".repeat(5000)}`)).toBe(7);
	});
});
