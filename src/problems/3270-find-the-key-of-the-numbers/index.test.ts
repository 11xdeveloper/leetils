import { describe, expect, it } from "bun:test";
import { findTheKeyOfTheNumbers as generateKey } from ".";

describe("3270. Find the Key of the Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(generateKey(1, 10, 1000)).toBe(0);
		expect(generateKey(987, 879, 798)).toBe(777);
		expect(generateKey(1, 2, 3)).toBe(1);
	});
});
