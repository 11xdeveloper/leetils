import { describe, expect, it } from "bun:test";
import { minimumSubstringPartitionOfEqualCharacterFrequency as minimumSubstringsInPartition } from ".";

describe("3144. Minimum Substring Partition of Equal Character Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSubstringsInPartition("fabccddg")).toBe(3);
		expect(minimumSubstringsInPartition("abababaccddb")).toBe(2);
	});

	it("handles single letters", () => {
		expect(minimumSubstringsInPartition("a")).toBe(1);
		expect(minimumSubstringsInPartition("aab")).toBe(2);
	});
});
