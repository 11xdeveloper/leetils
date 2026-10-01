import { describe, expect, it } from "bun:test";
import { deleteDuplicateFoldersInSystem as deleteDuplicateFolder } from ".";

const sorted = (paths: string[][]) =>
	paths.map((path) => path.join("/")).sort();

describe("1948. Delete Duplicate Folders in System", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sorted(
				deleteDuplicateFolder([
					["a"],
					["c"],
					["d"],
					["a", "b"],
					["c", "b"],
					["d", "a"],
				]),
			),
		).toEqual(sorted([["d"], ["d", "a"]]));
		expect(
			sorted(
				deleteDuplicateFolder([
					["a"],
					["c"],
					["a", "b"],
					["c", "b"],
					["a", "b", "x"],
					["a", "b", "x", "y"],
					["w"],
					["w", "y"],
				]),
			),
		).toEqual(sorted([["c"], ["c", "b"], ["a"], ["a", "b"]]));
		expect(
			sorted(deleteDuplicateFolder([["a", "b"], ["c", "d"], ["c"], ["a"]])),
		).toEqual(sorted([["c"], ["c", "d"], ["a"], ["a", "b"]]));
	});

	it("deletes identical folders at different depths", () => {
		const paths = [
			["a"],
			["a", "x"],
			["a", "x", "y"],
			["b"],
			["b", "c"],
			["b", "c", "x"],
			["b", "c", "x", "y"],
		];
		// "/a" and "/b/c" both hold x/y, so both go, leaving only "/b".
		expect(sorted(deleteDuplicateFolder(paths))).toEqual(["b"]);
	});
});
