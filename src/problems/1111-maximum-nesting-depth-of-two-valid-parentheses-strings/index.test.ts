import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNestingDepthOfTwoValidParenthesesStrings as maxDepthAfterSplit } from ".";

/** The nesting depth of a string, or -1 if it isn't a valid parentheses string. */
const depthOf = (s: string): number => {
	let [depth, deepest] = [0, 0];
	for (const char of s) {
		depth += char === "(" ? 1 : -1;
		if (depth < 0) return -1;
		deepest = Math.max(deepest, depth);
	}
	return depth === 0 ? deepest : -1;
};

/** Checks the split is valid and halves the depth, which is the best possible. */
const expectBestSplit = (seq: string) => {
	const split = maxDepthAfterSplit(seq);
	expect(split).toHaveLength(seq.length);
	const [a, b] = [0, 1].map((side) =>
		[...seq].filter((_, i) => split[i] === side).join(""),
	);
	const [depthA, depthB] = [depthOf(a ?? ""), depthOf(b ?? "")];
	expect(depthA).toBeGreaterThanOrEqual(0);
	expect(depthB).toBeGreaterThanOrEqual(0);
	expect(Math.max(depthA, depthB)).toBe(Math.ceil(depthOf(seq) / 2));
};

describe("1111. Maximum Nesting Depth of Two Valid Parentheses Strings", () => {
	it("solves the examples from the problem statement", () => {
		expectBestSplit("(()())");
		expectBestSplit("()(())()");
	});

	it("handles flat and deeply nested strings", () => {
		expectBestSplit("()()()");
		expectBestSplit(`${"(".repeat(5000)}${")".repeat(5000)}`);
	});

	it("splits random valid strings as evenly as possible", () => {
		const random = createRandom(1111);
		for (let run = 0; run < 300; run++) {
			let [seq, open] = ["", 0];
			const pairs = random.int(1, 30);
			for (let opened = 0; opened < pairs || open > 0; ) {
				if (opened < pairs && (open === 0 || random.next() < 0.5)) {
					seq += "(";
					open++;
					opened++;
				} else {
					seq += ")";
					open--;
				}
			}
			expectBestSplit(seq);
		}
	});
});
