import { describe, expect, it } from "bun:test";
import { elevatorRequestsI as elevatorRequests } from ".";

describe("4020. Elevator Requests I", () => {
	it("solves the examples from the problem statement", () => {
		expect(elevatorRequests(5, [2, 1, 4, 3])).toBe(7);
		expect(elevatorRequests(3, [2, 0, 0])).toBe(4);
	});
});
