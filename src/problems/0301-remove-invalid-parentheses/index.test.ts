import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeInvalidParentheses } from ".";

const isBalanced = (text: string): boolean => {
	let depth = 0;
	for (const char of text) {
		if (char === "(") depth++;
		else if (char === ")" && --depth < 0) return false;
	}
	return depth === 0;
};

/** Breadth-first search over removing one parenthesis at a time. */
const byBreadthFirst = (s: string): string[] => {
	let level = new Set([s]);
	while (level.size > 0) {
		const valid = [...level].filter(isBalanced);
		if (valid.length > 0) return valid.toSorted();
		const next = new Set<string>();
		for (const text of level) {
			for (let i = 0; i < text.length; i++) {
				if (text[i] === "(" || text[i] === ")")
					next.add(text.slice(0, i) + text.slice(i + 1));
			}
		}
		level = next;
	}
	return [""];
};

describe("301. Remove Invalid Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeInvalidParentheses("()())()").toSorted()).toEqual([
			"(())()",
			"()()()",
		]);
		expect(removeInvalidParentheses("(a)())()").toSorted()).toEqual([
			"(a())()",
			"(a)()()",
		]);
		expect(removeInvalidParentheses(")(")).toEqual([""]);
	});

	it("returns the string unchanged when it's already balanced", () => {
		expect(removeInvalidParentheses("(a(b)c)")).toEqual(["(a(b)c)"]);
	});

	it("matches a breadth-first search on random inputs", () => {
		const random = createRandom(301);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "(()a");
			expect(removeInvalidParentheses(s).toSorted()).toEqual(byBreadthFirst(s));
		}
	});
});
