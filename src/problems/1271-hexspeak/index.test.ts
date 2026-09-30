import { describe, expect, it } from "bun:test";
import { hexspeak as toHexspeak } from ".";

describe("1271. Hexspeak", () => {
	it("solves the examples from the problem statement", () => {
		expect(toHexspeak("257")).toBe("IOI");
		expect(toHexspeak("3")).toBe("ERROR");
	});

	it("handles every allowed letter and the largest input", () => {
		// 0xABCDEF10 = 2882400016.
		expect(toHexspeak("2882400016")).toBe("ABCDEFIO");
		// 10^12 = 0xE8D4A51000, which has an 8.
		expect(toHexspeak("1000000000000")).toBe("ERROR");
		// 0xDDDDDDDDDD = 952910077405, within the limit of 10^12.
		expect(toHexspeak("952910077405")).toBe("DDDDDDDDDD");
	});
});
