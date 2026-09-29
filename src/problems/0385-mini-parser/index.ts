import { NestedInteger } from "../../structures/nested-integer";

/**
 * 385. Mini Parser
 *
 * Parses a serialized nested list like `"[123,[456,[789]]]"` (or a single
 * integer like `"-3"`) into a `NestedInteger`.
 *
 * Reads the string once with a stack of the lists currently open: `[` opens
 * a new list, `]` closes one into its parent, and digits (with an optional
 * `-`) form integers added to the list on top.
 *
 * @see https://leetcode.com/problems/mini-parser/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * miniParser("[123,[456,[789]]]"); // a list holding 123 and the list [456, [789]]
 */
export const miniParser = (s: string): NestedInteger => {
	if (s[0] !== "[") return new NestedInteger(Number(s));

	const stack: NestedInteger[] = [];
	let result = new NestedInteger();
	for (let i = 0; i < s.length; i++) {
		const char = s[i];
		if (char === "[") {
			stack.push(new NestedInteger());
		} else if (char === "]") {
			const list = stack.pop() ?? new NestedInteger();
			const parent = stack.at(-1);
			if (parent) parent.add(list);
			else result = list;
		} else if (char !== ",") {
			let end = i + 1;
			while (end < s.length && s[end] !== "," && s[end] !== "]") end++;
			stack.at(-1)?.add(new NestedInteger(Number(s.slice(i, end))));
			i = end - 1;
		}
	}

	return result;
};
