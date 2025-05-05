import { describe, expect, it } from "bun:test";
import { addBinary } from "./index";

describe("addBinary", () => {
	it("should add two binary strings correctly", () => {
		expect(addBinary("11", "1")).toBe("100");
		expect(addBinary("1010", "1011")).toBe("10101");
	});

	it("should handle single digit binary strings", () => {
		expect(addBinary("0", "0")).toBe("0");
		expect(addBinary("1", "0")).toBe("1");
		expect(addBinary("0", "1")).toBe("1");
		expect(addBinary("1", "1")).toBe("10");
	});

	it("should handle strings of different lengths", () => {
		expect(addBinary("111", "1")).toBe("1000");
		expect(addBinary("1", "111")).toBe("1000");
	});

	it("should handle multiple binary strings", () => {
		expect(addBinary("1", "1", "1")).toBe("11");
		expect(addBinary("10", "10", "10")).toBe("110");
	});

	it("should handle large binary numbers", () => {
		expect(addBinary("1111111111", "1")).toBe("10000000000");
		expect(addBinary("1111111111", "1111111111")).toBe("11111111110");
	});
});
