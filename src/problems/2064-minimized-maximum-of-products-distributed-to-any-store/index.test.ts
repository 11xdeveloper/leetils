import { describe, expect, it } from "bun:test";
import { minimizedMaximumOfProductsDistributedToAnyStore as minimizedMaximum } from ".";

describe("2064. Minimized Maximum of Products Distributed to Any Store", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizedMaximum(6, [11, 6])).toBe(3);
		expect(minimizedMaximum(7, [15, 10, 10])).toBe(5);
		expect(minimizedMaximum(1, [100000])).toBe(100000);
	});
});
