import { describe, expect, it } from "bun:test";
import { countHousesInACircularStreet as houseCount } from ".";

const street = (doors: number[]) => {
	const open = doors.map(Boolean);
	let at = 0;
	return {
		openDoor: () => {
			open[at] = true;
		},
		closeDoor: () => {
			open[at] = false;
		},
		isDoorOpen: () => open[at] ?? false,
		moveRight: () => {
			at = (at + 1) % open.length;
		},
		moveLeft: () => {
			at = (at + open.length - 1) % open.length;
		},
	};
};

describe("2728. Count Houses in a Circular Street", () => {
	it("solves the examples from the problem statement", () => {
		expect(houseCount(street([0, 0, 0, 0]), 10)).toBe(4);
		expect(houseCount(street([1, 0, 1, 1, 0]), 5)).toBe(5);
	});

	it("handles a single house", () => {
		expect(houseCount(street([1]), 3)).toBe(1);
	});
});
