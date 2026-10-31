import { describe, expect, it } from "bun:test";
import { DesignRideSharingSystem } from ".";

describe("3829. Design Ride Sharing System", () => {
	it("solves the examples from the problem statement", () => {
		const first = new DesignRideSharingSystem();
		first.addRider(3);
		first.addDriver(2);
		first.addRider(1);
		expect(first.matchDriverWithRider()).toEqual([2, 3]);
		first.addDriver(5);
		first.cancelRider(3);
		expect(first.matchDriverWithRider()).toEqual([5, 1]);
		expect(first.matchDriverWithRider()).toEqual([-1, -1]);

		const second = new DesignRideSharingSystem();
		second.addRider(8);
		second.addDriver(8);
		second.addDriver(6);
		expect(second.matchDriverWithRider()).toEqual([8, 8]);
		second.addRider(2);
		second.cancelRider(2);
		expect(second.matchDriverWithRider()).toEqual([-1, -1]);
	});
});
