import { describe, expect, it } from "bun:test";
import { groupAnagrams } from ".";

/** Groups by sorted letters, then puts everything in a canonical order. */
const bySorting = (strs: string[]): string[][] => {
	const groups = new Map<string, string[]>();
	for (const str of strs) {
		const key = [...str].toSorted().join("");
		groups.set(key, [...(groups.get(key) ?? []), str]);
	}
	return normalize([...groups.values()]);
};

const normalize = (groups: string[][]): string[][] =>
	groups
		.map((group) => group.toSorted())
		.toSorted((a, b) => (a.join(",") < b.join(",") ? -1 : 1));

describe("49. Group Anagrams", () => {
	it("solves the examples from the problem statement", () => {
		expect(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])).toEqual([
			["eat", "tea", "ate"],
			["tan", "nat"],
			["bat"],
		]);
		expect(groupAnagrams([""])).toEqual([[""]]);
		expect(groupAnagrams(["a"])).toEqual([["a"]]);
	});

	it("groups empty strings and repeated strings together", () => {
		expect(groupAnagrams(["", "b", ""])).toEqual([["", ""], ["b"]]);
		expect(groupAnagrams(["ab", "ab", "ba"])).toEqual([["ab", "ab", "ba"]]);
	});

	it("tells apart strings with the same letters in different amounts", () => {
		expect(groupAnagrams(["aab", "abb"])).toEqual([["aab"], ["abb"]]);
	});

	it("matches grouping by sorted letters on random inputs", () => {
		let seed = 49;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 200; run++) {
			const strs = Array.from({ length: 1 + (run % 20) }, () =>
				Array.from({ length: next() % 4 }, () => "abc"[next() % 3]).join(""),
			);
			expect(normalize(groupAnagrams(strs))).toEqual(bySorting(strs));
		}
	});
});
