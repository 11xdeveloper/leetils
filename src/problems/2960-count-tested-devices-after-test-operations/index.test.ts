import { describe, expect, it } from "bun:test";
import { countTestedDevicesAfterTestOperations as countTestedDevices } from ".";

describe("2960. Count Tested Devices After Test Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTestedDevices([1, 1, 2, 1, 3])).toBe(3);
		expect(countTestedDevices([0, 1, 2])).toBe(2);
	});
});
