import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { groupShiftedStrings } from ".";

const shift = (s: string, by: number): string =>
	Array.from(s, (c) =>
		String.fromCharCode(97 + ((c.charCodeAt(0) - 97 + by) % 26)),
	).join("");

/** Two strings are in the same group when some shift turns one into the other. */
const sameGroup = (a: string, b: string): boolean =>
	a.length === b.length &&
	Array.from({ length: 26 }, (_, by) => shift(a, by)).includes(b);

const normalize = (groups: string[][]): string[] =>
	groups.map((group) => group.toSorted().join(",")).toSorted();

describe("249. Group Shifted Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			normalize(
				groupShiftedStrings([
					"abc",
					"bcd",
					"acef",
					"xyz",
					"az",
					"ba",
					"a",
					"z",
				]),
			),
		).toEqual(
			normalize([["acef"], ["a", "z"], ["abc", "bcd", "xyz"], ["az", "ba"]]),
		);
		expect(groupShiftedStrings(["a"])).toEqual([["a"]]);
	});

	it("keeps strings of different lengths apart", () => {
		expect(normalize(groupShiftedStrings(["ab", "abc"]))).toEqual([
			"ab",
			"abc",
		]);
	});

	it("groups exactly the strings that shift into each other on random inputs", () => {
		const random = createRandom(249);
		for (let run = 0; run < 300; run++) {
			const strings = Array.from({ length: random.int(1, 10) }, () =>
				random.int(0, 1) === 0
					? shift("abz", random.int(0, 25))
					: random.string(random.int(1, 3), "abyz"),
			);
			const groups = groupShiftedStrings(strings);
			expect(groups.flat().toSorted()).toEqual(strings.toSorted());
			for (const group of groups) {
				for (const other of groups) {
					const same = group === other;
					expect(sameGroup(group[0] ?? "", other[0] ?? "")).toBe(same);
					if (same)
						for (const s of group)
							expect(sameGroup(group[0] ?? "", s)).toBeTrue();
				}
			}
		}
	});
});
