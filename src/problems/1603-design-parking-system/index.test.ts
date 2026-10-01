import { describe, expect, it } from "bun:test";
import { DesignParkingSystem as ParkingSystem } from ".";

describe("1603. Design Parking System", () => {
	it("solves the example from the problem statement", () => {
		const parking = new ParkingSystem(1, 1, 0);
		expect(parking.addCar(1)).toBeTrue();
		expect(parking.addCar(2)).toBeTrue();
		expect(parking.addCar(3)).toBeFalse();
		expect(parking.addCar(1)).toBeFalse();
	});

	it("fills each size independently", () => {
		const parking = new ParkingSystem(0, 0, 2);
		expect([3, 3, 3].map((type) => parking.addCar(type))).toEqual([
			true,
			true,
			false,
		]);
	});
});
