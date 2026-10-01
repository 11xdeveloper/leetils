/**
 * 1487. Making File Names Unique
 *
 * Creates folders named `names[i]` in order; a name already taken gets the
 * smallest suffix `(k)` that makes it unique. Returns the names given.
 *
 * Remembers, for each name, the next suffix worth trying, so repeated
 * clashes don't rescan suffixes already known to be taken.
 *
 * @see https://leetcode.com/problems/making-file-names-unique/
 * @difficulty Medium
 * @timeComplexity O(total length of names), amortised
 * @spaceComplexity O(total length of names)
 *
 * @example
 * makingFileNamesUnique(["gta", "gta(1)", "gta", "avalon"]); // ["gta", "gta(1)", "gta(2)", "avalon"]
 */
export const makingFileNamesUnique = (names: readonly string[]): string[] => {
	const nextSuffix = new Map<string, number>();
	return names.map((name) => {
		let given = name;
		if (nextSuffix.has(name)) {
			let k = nextSuffix.get(name) ?? 1;
			while (nextSuffix.has(`${name}(${k})`)) k++;
			given = `${name}(${k})`;
			nextSuffix.set(name, k + 1);
		}
		nextSuffix.set(given, 1);
		return given;
	});
};
