import { describe, expect, it } from "bun:test";
import { countHousesInACircularStreetII as houseCount } from ".";

const street = (doors: number[]) => {
	const open = doors.map(Boolean);
	let at = 0;
	return {
		closeDoor: () => {
			open[at] = false;
		},
		isDoorOpen: () => open[at] ?? false,
		moveRight: () => {
			at = (at + 1) % open.length;
		},
	};
};

describe("2753. Count Houses in a Circular Street II", () => {
	it("solves the examples from the problem statement", () => {
		expect(houseCount(street([1, 1, 1, 1]), 10)).toBe(4);
		expect(houseCount(street([1, 0, 1, 1, 0]), 5)).toBe(5);
	});

	it("starts away from an open door", () => {
		expect(houseCount(street([0, 0, 1]), 3)).toBe(3);
	});
});
