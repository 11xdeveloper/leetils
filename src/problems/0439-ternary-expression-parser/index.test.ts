import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { ternaryExpressionParser as parseTernary } from ".";

/** A random valid expression, alongside its value. */
const randomExpression = (
	random: Random,
	depth: number,
): [text: string, value: string] => {
	if (depth === 0 || random.int(0, 2) === 0) {
		const value = "0123456789TF".charAt(random.int(0, 11));
		return [value, value];
	}
	const condition = random.int(0, 1) === 0 ? "T" : "F";
	const [yes, yesValue] = randomExpression(random, depth - 1);
	const [no, noValue] = randomExpression(random, depth - 1);
	return [`${condition}?${yes}:${no}`, condition === "T" ? yesValue : noValue];
};

describe("439. Ternary Expression Parser", () => {
	it("solves the examples from the problem statement", () => {
		expect(parseTernary("T?2:3")).toBe("2");
		expect(parseTernary("F?1:T?4:5")).toBe("4");
		expect(parseTernary("T?T?F:5:3")).toBe("F");
	});

	it("evaluates random nested expressions", () => {
		const random = createRandom(439);
		for (let run = 0; run < 1000; run++) {
			const [text, value] = randomExpression(random, 5);
			expect(parseTernary(text)).toBe(value);
		}
	});
});
