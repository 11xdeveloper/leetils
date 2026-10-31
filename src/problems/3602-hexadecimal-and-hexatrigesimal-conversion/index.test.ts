import { describe, expect, it } from "bun:test";
import { hexadecimalAndHexatrigesimalConversion as concatHex36 } from ".";

describe("3602. Hexadecimal and Hexatrigesimal Conversion", () => {
	it("solves the examples from the problem statement", () => {
		expect(concatHex36(13)).toBe("A91P1");
		expect(concatHex36(36)).toBe("5101000");
	});
});
