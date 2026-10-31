import { describe, expect, it } from "bun:test";
import { ImplementRouter as Router } from ".";

describe("3508. Implement Router", () => {
	it("solves the examples from the problem statement", () => {
		const a = new Router(3);
		expect(a.addPacket(1, 4, 90)).toBeTrue();
		expect(a.addPacket(2, 5, 90)).toBeTrue();
		expect(a.addPacket(1, 4, 90)).toBeFalse();
		expect(a.addPacket(3, 5, 95)).toBeTrue();
		expect(a.addPacket(4, 5, 105)).toBeTrue();
		expect(a.forwardPacket()).toEqual([2, 5, 90]);
		expect(a.addPacket(5, 2, 110)).toBeTrue();
		expect(a.getCount(5, 100, 110)).toBe(1);

		const b = new Router(2);
		expect(b.addPacket(7, 4, 90)).toBeTrue();
		expect(b.forwardPacket()).toEqual([7, 4, 90]);
		expect(b.forwardPacket()).toEqual([]);
	});
});
