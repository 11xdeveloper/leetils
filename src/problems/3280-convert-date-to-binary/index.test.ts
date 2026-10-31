import { describe, expect, it } from "bun:test";
import { convertDateToBinary } from ".";

describe("3280. Convert Date to Binary", () => {
	it("solves the examples from the problem statement", () => {
		expect(convertDateToBinary("2080-02-29")).toBe("100000100000-10-11101");
		expect(convertDateToBinary("1900-01-01")).toBe("11101101100-1-1");
	});
});
