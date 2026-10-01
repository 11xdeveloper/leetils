import { describe, expect, it } from "bun:test";
import { crawlerLogFolder as minOperations } from ".";

describe("1598. Crawler Log Folder", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations(["d1/", "d2/", "../", "d21/", "./"])).toBe(2);
		expect(minOperations(["d1/", "d2/", "./", "d3/", "../", "d31/"])).toBe(3);
		expect(minOperations(["d1/", "../", "../", "../"])).toBe(0);
	});
});
