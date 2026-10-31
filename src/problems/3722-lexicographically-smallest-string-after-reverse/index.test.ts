import { describe, expect, it } from "bun:test";
import { lexicographicallySmallestStringAfterReverse as lexSmallest } from ".";

describe("3722. Lexicographically Smallest String After Reverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexSmallest("dcab")).toBe("acdb");
		expect(lexSmallest("abba")).toBe("aabb");
		expect(lexSmallest("zxy")).toBe("xzy");
	});
});
