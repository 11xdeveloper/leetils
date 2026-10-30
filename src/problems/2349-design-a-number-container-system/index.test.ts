import { describe, expect, it } from "bun:test";
import { DesignANumberContainerSystem as NumberContainers } from ".";

describe("2349. Design a Number Container System", () => {
	it("solves the example from the problem statement", () => {
		const containers = new NumberContainers();
		expect(containers.find(10)).toBe(-1);
		containers.change(2, 10);
		containers.change(1, 10);
		containers.change(3, 10);
		containers.change(5, 10);
		expect(containers.find(10)).toBe(1);
		containers.change(1, 20);
		expect(containers.find(10)).toBe(2);
	});

	it("handles an index changing back", () => {
		const containers = new NumberContainers();
		containers.change(1, 7);
		containers.change(1, 8);
		containers.change(1, 7);
		expect(containers.find(7)).toBe(1);
		expect(containers.find(8)).toBe(-1);
	});
});
