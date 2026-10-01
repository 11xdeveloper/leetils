import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumBuildingHeight as maxBuilding } from ".";

/** Each building's best height is its tightest cap plus distance, all at once. */
const byBruteForce = (n: number, restrictions: number[][]): number => {
	let best = 0;
	for (let i = 1; i <= n; i++) {
		let height = i - 1;
		for (const [id = 0, cap = 0] of restrictions)
			height = Math.min(height, cap + Math.abs(i - id));
		best = Math.max(best, height);
	}
	return best;
};

describe("1840. Maximum Building Height", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxBuilding(5, [
				[2, 1],
				[4, 1],
			]),
		).toBe(2);
		expect(maxBuilding(6, [])).toBe(5);
		expect(
			maxBuilding(10, [
				[5, 3],
				[2, 5],
				[7, 4],
				[10, 3],
			]),
		).toBe(5);
	});

	it("matches the tightest cap at every building on random inputs", () => {
		const random = createRandom(1840);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 20);
			const ids = [...new Set(random.array(random.int(0, 5), 2, n))];
			const restrictions = ids.map((id) => [id, random.int(0, 10)]);
			expect(maxBuilding(n, restrictions)).toBe(byBruteForce(n, restrictions));
		}
	});
});
