import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumRemoveToMakeValidParentheses as minRemoveToMakeValid } from ".";

const isValid = (s: string): boolean => {
	let depth = 0;
	for (const char of s) {
		if (char === "(") depth++;
		else if (char === ")") depth--;
		if (depth < 0) return false;
	}
	return depth === 0;
};

/** The fewest removals, trying every set of parentheses to keep. */
const fewestRemovals = (s: string): number => {
	const parens = [...s].flatMap((char, i) =>
		char === "(" || char === ")" ? [i] : [],
	);
	let fewest = parens.length;
	for (let mask = 0; mask < 2 ** parens.length; mask++) {
		const removed = new Set(parens.filter((_, k) => mask & (1 << k)));
		if (isValid([...s].filter((_, i) => !removed.has(i)).join("")))
			fewest = Math.min(fewest, removed.size);
	}
	return fewest;
};

const isSubsequence = (sub: string, of: string) => {
	let i = 0;
	for (const char of of) if (char === sub[i]) i++;
	return i === sub.length;
};

describe("1249. Minimum Remove to Make Valid Parentheses", () => {
	it("solves the examples from the problem statement", () => {
		expect(minRemoveToMakeValid("lee(t(c)o)de)")).toBe("lee(t(c)o)de");
		expect(minRemoveToMakeValid("a)b(c)d")).toBe("ab(c)d");
		expect(minRemoveToMakeValid("))((")).toBe("");
	});

	it("removes as few parentheses as possible on random inputs", () => {
		const random = createRandom(1249);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "()a");
			const result = minRemoveToMakeValid(s);
			expect(isValid(result)).toBeTrue();
			expect(isSubsequence(result, s)).toBeTrue();
			expect(result.replace(/[()]/g, "")).toBe(s.replace(/[()]/g, ""));
			expect(s.length - result.length).toBe(fewestRemovals(s));
		}
	});
});
