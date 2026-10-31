import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumBalancedShipments as maxBalancedShipments } from ".";

/** Dynamic programming over every possible shipment. */
const byBruteForce = (weight: number[]): number => {
	const best = new Array<number>(weight.length + 1).fill(0);
	for (let end = 1; end <= weight.length; end++) {
		best[end] = best[end - 1] ?? 0;
		for (let start = 0; start < end; start++) {
			const part = weight.slice(start, end);
			if ((part.at(-1) ?? 0) < Math.max(...part))
				best[end] = Math.max(best[end] ?? 0, (best[start] ?? 0) + 1);
		}
	}
	return best[weight.length] ?? 0;
};

describe("3638. Maximum Balanced Shipments", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxBalancedShipments([2, 5, 1, 4, 3])).toBe(2);
		expect(maxBalancedShipments([4, 4])).toBe(0);
	});

	it("matches dynamic programming on random weights", () => {
		const random = createRandom(3638);
		for (let run = 0; run < 200; run++) {
			const weight = random.array(random.int(1, 10), 1, 6);
			expect(maxBalancedShipments(weight)).toBe(byBruteForce(weight));
		}
	});
});
