import { describe, expect, it } from "bun:test";
import { maximumContainersOnAShip as maxContainers } from ".";

describe("3492. Maximum Containers on a Ship", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxContainers(2, 3, 15)).toBe(4);
		expect(maxContainers(3, 5, 20)).toBe(4);
	});
});
