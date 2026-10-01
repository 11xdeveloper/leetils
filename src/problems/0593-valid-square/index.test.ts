import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validSquare } from ".";

describe("593. Valid Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSquare([0, 0], [1, 1], [1, 0], [0, 1])).toBeTrue();
		expect(validSquare([0, 0], [1, 1], [1, 0], [0, 12])).toBeFalse();
		expect(validSquare([1, 0], [-1, 0], [0, 1], [0, -1])).toBeTrue();
	});

	it("rejects degenerate squares and rhombuses", () => {
		expect(validSquare([0, 0], [0, 0], [0, 0], [0, 0])).toBeFalse();
		expect(validSquare([0, 0], [1, 1], [0, 0], [1, 1])).toBeFalse();
		expect(validSquare([0, 0], [2, 1], [3, 3], [1, 2])).toBeFalse();
	});

	it("accepts random squares in any order and rejects them with one corner moved", () => {
		const random = createRandom(593);
		for (let run = 0; run < 1000; run++) {
			const [x = 0, y = 0, dx = 0, dy = 0] = [
				random.int(-50, 50),
				random.int(-50, 50),
				random.int(-20, 20),
				random.int(-20, 20),
			];
			if (dx === 0 && dy === 0) continue;
			const corners = [
				[x, y],
				[x + dx, y + dy],
				[x + dx - dy, y + dy + dx],
				[x - dy, y + dx],
			].sort(() => random.next() - 0.5);
			const [a = [], b = [], c = [], d = []] = corners;
			expect(validSquare(a, b, c, d)).toBeTrue();
			expect(
				validSquare(a, b, c, [(d[0] ?? 0) + random.int(1, 3), d[1] ?? 0]),
			).toBeFalse();
		}
	});
});
