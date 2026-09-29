import { describe, expect, it } from "bun:test";
import { findDuplicateFileInSystem as findDuplicate } from ".";

const normalise = (groups: string[][]): string[][] =>
	groups.map((group) => group.toSorted()).sort();

describe("609. Find Duplicate File in System", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			normalise(
				findDuplicate([
					"root/a 1.txt(abcd) 2.txt(efgh)",
					"root/c 3.txt(abcd)",
					"root/c/d 4.txt(efgh)",
					"root 4.txt(efgh)",
				]),
			),
		).toEqual(
			normalise([
				["root/a/2.txt", "root/c/d/4.txt", "root/4.txt"],
				["root/a/1.txt", "root/c/3.txt"],
			]),
		);
		expect(
			normalise(
				findDuplicate([
					"root/a 1.txt(abcd) 2.txt(efgh)",
					"root/c 3.txt(abcd)",
					"root/c/d 4.txt(efgh)",
				]),
			),
		).toEqual(
			normalise([
				["root/a/2.txt", "root/c/d/4.txt"],
				["root/a/1.txt", "root/c/3.txt"],
			]),
		);
	});

	it("leaves out files with unique content", () => {
		expect(findDuplicate(["root 1.txt(a) 2.txt(b)"])).toEqual([]);
	});
});
