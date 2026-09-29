import { describe, expect, it } from "bun:test";
import { exportName, problemFolder } from "./problems";

describe("exportName", () => {
	it("camel-cases the slug", () => {
		expect(exportName("two-sum")).toBe("twoSum");
		expect(exportName("string-to-integer-atoi")).toBe("stringToIntegerAtoi");
	});

	it("spells out leading digits so the name is a valid identifier", () => {
		expect(exportName("3sum")).toBe("threeSum");
		expect(exportName("3sum-closest")).toBe("threeSumClosest");
		expect(exportName("2-keys-keyboard")).toBe("twoKeysKeyboard");
		expect(exportName("01-matrix")).toBe("zeroOneMatrix");
	});

	it("keeps digits after the first word", () => {
		expect(exportName("base-7")).toBe("base7");
		expect(exportName("powx-n")).toBe("powxN");
	});

	it("upper-cases roman numeral suffixes", () => {
		expect(exportName("two-sum-ii-input-array-is-sorted")).toBe(
			"twoSumIIInputArrayIsSorted",
		);
		expect(exportName("house-robber-iii")).toBe("houseRobberIII");
	});

	it("uses PascalCase for classes", () => {
		expect(exportName("lru-cache", "class")).toBe("LruCache");
		expect(exportName("min-stack", "class")).toBe("MinStack");
		expect(exportName("2-keys-keyboard", "class")).toBe("TwoKeysKeyboard");
	});
});

describe("problemFolder", () => {
	it("zero-pads the problem number", () => {
		expect(problemFolder(1, "two-sum")).toBe("0001-two-sum");
		expect(problemFolder(1234, "some-problem")).toBe("1234-some-problem");
	});
});
