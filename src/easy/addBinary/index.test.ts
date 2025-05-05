import { test, expect, describe } from "bun:test";
import { addBinary } from ".";

describe("Add Binary", () => {
	test("Given two binary strings a and b, return their sum as a binary string.", () => {
		expect(addBinary("11", "1")).toBe("100");
		expect(addBinary("1010", "1011")).toBe("10101");
	});
});
