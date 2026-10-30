import { describe, expect, it } from "bun:test";
import { countNumberOfTexts as countTexts } from ".";

describe("2266. Count Number of Texts", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTexts("22233")).toBe(8);
		expect(countTexts("222222222222222222222222222222222222")).toBe(82876089);
	});

	it("lets 7 and 9 take four presses", () => {
		expect(countTexts("7777")).toBe(8);
		expect(countTexts("2222")).toBe(7);
	});
});
