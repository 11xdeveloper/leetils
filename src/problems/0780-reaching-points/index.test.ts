import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reachingPoints } from ".";

/** Steps backwards one subtraction at a time. */
const bySubtraction = (
	sx: number,
	sy: number,
	tx: number,
	ty: number,
): boolean => {
	while (tx >= sx && ty >= sy) {
		if (tx === sx && ty === sy) return true;
		if (tx === ty) return false;
		if (tx > ty) tx -= ty;
		else ty -= tx;
	}
	return false;
};

describe("780. Reaching Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(reachingPoints(1, 1, 3, 5)).toBeTrue();
		expect(reachingPoints(1, 1, 2, 2)).toBeFalse();
		expect(reachingPoints(1, 1, 1, 1)).toBeTrue();
	});

	it("matches stepping back one subtraction at a time on random inputs", () => {
		const random = createRandom(780);
		for (let run = 0; run < 2000; run++) {
			const [sx, sy, tx, ty] = [
				random.int(1, 10),
				random.int(1, 10),
				random.int(1, 200),
				random.int(1, 200),
			];
			expect(reachingPoints(sx, sy, tx, ty)).toBe(
				bySubtraction(sx, sy, tx, ty),
			);
		}
	});

	it("handles the largest inputs quickly", () => {
		expect(reachingPoints(1, 1, 10 ** 9, 1)).toBeTrue();
		// Adding x to y 10^8 times, and one short of a reachable point.
		expect(reachingPoints(3, 7, 3, 7 + 3 * 10 ** 8)).toBeTrue();
		expect(reachingPoints(3, 7, 3, 8 + 3 * 10 ** 8)).toBeFalse();
	});
});
