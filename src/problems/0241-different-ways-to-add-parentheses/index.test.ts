import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { differentWaysToAddParentheses } from ".";

/** Writes out every full parenthesisation as a string. */
const parenthesisations = (tokens: string[]): string[] => {
	if (tokens.length === 1) return [tokens[0] ?? ""];
	const results: string[] = [];
	for (let i = 1; i < tokens.length; i += 2) {
		for (const left of parenthesisations(tokens.slice(0, i))) {
			for (const right of parenthesisations(tokens.slice(i + 1))) {
				results.push(`(${left}${tokens[i]}${right})`);
			}
		}
	}
	return results;
};

/** Evaluates every written-out parenthesisation with JavaScript. */
const byEvaluating = (expression: string): number[] =>
	parenthesisations(expression.match(/\d+|[+\-*]/g) ?? []).map(
		(written) =>
			new Function(`return ${written.replaceAll("-", " - ")};`)() as number,
	);

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("241. Different Ways to Add Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(differentWaysToAddParentheses("2-1-1"))).toEqual([0, 2]);
		expect(sorted(differentWaysToAddParentheses("2*3-4*5"))).toEqual([
			-34, -14, -10, -10, 10,
		]);
	});

	it("returns the number itself when there are no operators", () => {
		expect(differentWaysToAddParentheses("99")).toEqual([99]);
	});

	it("matches evaluating every written-out grouping on random expressions", () => {
		const random = createRandom(241);
		for (let run = 0; run < 300; run++) {
			let expression = String(random.int(0, 99));
			for (let i = random.int(0, 5); i > 0; i--) {
				expression += "+-*".charAt(random.int(0, 2)) + random.int(0, 99);
			}
			expect(sorted(differentWaysToAddParentheses(expression))).toEqual(
				sorted(byEvaluating(expression)),
			);
		}
	});
});
