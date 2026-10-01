/**
 * 726. Number of Atoms
 *
 * Counts the atoms in a chemical formula like `"K4(ON(SO3)2)2"`: elements
 * are a capital letter and optional lowercase letters, followed by an
 * optional count, and parenthesised groups can be followed by a
 * multiplier. Returns each element in sorted order followed by its count
 * (left out when it's 1), e.g. `"K4N2O14S4"`.
 *
 * Parses left to right with a stack of counts, one per open group. A `)`
 * multiplies the group's counts and merges them into the enclosing one.
 *
 * @see https://leetcode.com/problems/number-of-atoms/
 * @difficulty Hard
 * @timeComplexity O(n^2) in the worst case, merging nested groups
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfAtoms("Mg(OH)2"); // "H2MgO2"
 */
export const numberOfAtoms = (formula: string): string => {
	const stack = [new Map<string, number>()];
	let i = 0;
	const readCount = (): number => {
		const start = i;
		while (i < formula.length && /\d/.test(formula.charAt(i))) i++;
		return start === i ? 1 : Number(formula.slice(start, i));
	};

	while (i < formula.length) {
		const char = formula.charAt(i);
		if (char === "(") {
			stack.push(new Map());
			i++;
		} else if (char === ")") {
			i++;
			const multiplier = readCount();
			const group = stack.pop() ?? new Map<string, number>();
			const outer = stack.at(-1) ?? new Map<string, number>();
			for (const [element, count] of group)
				outer.set(element, (outer.get(element) ?? 0) + count * multiplier);
		} else {
			const start = i++;
			while (i < formula.length && /[a-z]/.test(formula.charAt(i))) i++;
			const element = formula.slice(start, i);
			const counts = stack.at(-1) ?? new Map<string, number>();
			counts.set(element, (counts.get(element) ?? 0) + readCount());
		}
	}

	const counts = stack[0] ?? new Map<string, number>();
	return [...counts.keys()]
		.sort()
		.map((element) => {
			const count = counts.get(element) ?? 0;
			return count > 1 ? `${element}${count}` : element;
		})
		.join("");
};
