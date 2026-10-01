import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { minimumCostToChangeTheFinalValueOfExpression as minOperationsToFlip } from ".";

/** Evaluates left to right with parentheses. */
const evaluate = (expression: string): number => {
	const frames: [number | undefined, string][] = [[undefined, ""]];
	const push = (value: number) => {
		const frame = frames.at(-1);
		if (!frame) return;
		frame[0] =
			frame[0] === undefined
				? value
				: frame[1] === "&"
					? frame[0] & value
					: frame[0] | value;
	};
	for (const char of expression) {
		if (char === "(") frames.push([undefined, ""]);
		else if (char === ")") push(frames.pop()?.[0] ?? 0);
		else if (char === "&" || char === "|") {
			const frame = frames.at(-1);
			if (frame) frame[1] = char;
		} else push(Number(char));
	}
	return frames[0]?.[0] ?? 0;
};

/** Tries every set of changed characters. */
const byBruteForce = (expression: string): number => {
	const changeable = [...expression].flatMap((c, i) =>
		"01&|".includes(c) ? [i] : [],
	);
	const original = evaluate(expression);
	let best = Infinity;
	for (let mask = 1; mask < 1 << changeable.length; mask++) {
		const chars = [...expression];
		let flips = 0;
		for (const [bit, i] of changeable.entries()) {
			if (!(mask & (1 << bit))) continue;
			chars[i] =
				({ "0": "1", "1": "0", "&": "|", "|": "&" } as Record<string, string>)[
					chars[i] ?? ""
				] ?? "";
			flips++;
		}
		if (evaluate(chars.join("")) !== original) best = Math.min(best, flips);
	}
	return best;
};

const randomExpression = (random: Random, depth: number): string => {
	const terms = Array.from({ length: random.int(1, 3) }, () =>
		depth > 0 && random.int(0, 2) === 0
			? `(${randomExpression(random, depth - 1)})`
			: random.string(1, "01"),
	);
	return terms.reduce(
		(expr, term) => `${expr}${random.string(1, "&|")}${term}`,
	);
};

describe("1896. Minimum Cost to Change the Final Value of Expression", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperationsToFlip("1&(0|1)")).toBe(1);
		expect(minOperationsToFlip("(0&0)&(0&0&0)")).toBe(3);
		expect(minOperationsToFlip("(0|(1|0&1))")).toBe(1);
	});

	it("matches trying every set of changes on random expressions", () => {
		const random = createRandom(1896);
		for (let run = 0; run < 200; run++) {
			const expression = randomExpression(random, 2);
			if ([...expression].filter((c) => "01&|".includes(c)).length > 12)
				continue;
			expect(minOperationsToFlip(expression)).toBe(byBruteForce(expression));
		}
	});
});
