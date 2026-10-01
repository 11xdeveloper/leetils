import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { parsingABooleanExpression as parseBoolExpr } from ".";

/** A random expression, returned with its value worked out as it's built. */
const randomExpression = (random: Random, depth: number): [string, boolean] => {
	const kind = depth === 0 ? random.int(0, 1) : random.int(0, 4);
	if (kind === 0) return ["t", true];
	if (kind === 1) return ["f", false];
	if (kind === 2) {
		const [inner, value] = randomExpression(random, depth - 1);
		return [`!(${inner})`, !value];
	}
	const parts = Array.from({ length: random.int(1, 4) }, () =>
		randomExpression(random, depth - 1),
	);
	const text = parts.map(([part]) => part).join(",");
	return kind === 3
		? [`&(${text})`, parts.every(([, value]) => value)]
		: [`|(${text})`, parts.some(([, value]) => value)];
};

describe("1106. Parsing A Boolean Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(parseBoolExpr("&(|(f))")).toBeFalse();
		expect(parseBoolExpr("|(f,f,f,t)")).toBeTrue();
		expect(parseBoolExpr("!(&(f,t))")).toBeTrue();
	});

	it("handles bare values", () => {
		expect(parseBoolExpr("t")).toBeTrue();
		expect(parseBoolExpr("f")).toBeFalse();
	});

	it("handles deep nesting", () => {
		expect(
			parseBoolExpr(`${"!(".repeat(5000)}t${")".repeat(5000)}`),
		).toBeTrue();
		expect(
			parseBoolExpr(`${"!(".repeat(4999)}t${")".repeat(4999)}`),
		).toBeFalse();
	});

	it("matches the value worked out while building random expressions", () => {
		const random = createRandom(1106);
		for (let run = 0; run < 500; run++) {
			const [expression, value] = randomExpression(random, random.int(0, 5));
			expect(parseBoolExpr(expression)).toBe(value);
		}
	});
});
