import { describe, expect, it } from "bun:test";
import { IteratorForCombination as CombinationIterator } from ".";

/** Every combination, by filtering subsets and sorting. */
const allCombinations = (characters: string, length: number): string[] => {
	const result: string[] = [];
	for (let mask = 0; mask < 2 ** characters.length; mask++) {
		const chosen = [...characters].filter((_, i) => mask & (1 << i));
		if (chosen.length === length) result.push(chosen.join(""));
	}
	return result.sort();
};

describe("1286. Iterator for Combination", () => {
	it("solves the example from the problem statement", () => {
		const iterator = new CombinationIterator("abc", 2);
		expect(iterator.next()).toBe("ab");
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe("ac");
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe("bc");
		expect(iterator.hasNext()).toBeFalse();
	});

	it("lists every combination in order", () => {
		for (const characters of ["a", "abcd", "acegikm"]) {
			for (let length = 1; length <= characters.length; length++) {
				const iterator = new CombinationIterator(characters, length);
				const listed: string[] = [];
				while (iterator.hasNext()) listed.push(iterator.next());
				expect(listed).toEqual(allCombinations(characters, length));
			}
		}
	});
});
