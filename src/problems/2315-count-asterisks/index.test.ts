import { describe, expect, it } from "bun:test";
import { countAsterisks } from ".";

describe("2315. Count Asterisks", () => {
	it("solves the examples from the problem statement", () => {
		expect(countAsterisks("l|*e*et|c**o|*de|")).toBe(2);
		expect(countAsterisks("iamprogrammer")).toBe(0);
		expect(countAsterisks("yo|uar|e**|b|e***au|tifu|l")).toBe(5);
	});
});
