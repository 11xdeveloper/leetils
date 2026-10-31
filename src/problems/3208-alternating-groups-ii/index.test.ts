import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { alternatingGroupsII as numberOfAlternatingGroups } from ".";

/** Checks every starting tile. */
const byBruteForce = (colors: number[], k: number): number => {
	const n = colors.length;
	let groups = 0;
	for (let start = 0; start < n; start++) {
		let ok = true;
		for (let j = 1; j < k; j++)
			if (colors[(start + j) % n] === colors[(start + j - 1) % n]) ok = false;
		if (ok) groups++;
	}
	return groups;
};

describe("3208. Alternating Groups II", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfAlternatingGroups([0, 1, 0, 1, 0], 3)).toBe(3);
		expect(numberOfAlternatingGroups([0, 1, 0, 0, 1, 0, 1], 6)).toBe(2);
		expect(numberOfAlternatingGroups([1, 1, 0, 1], 4)).toBe(0);
	});

	it("matches checking every start on random circles", () => {
		const random = createRandom(3208);
		for (let run = 0; run < 300; run++) {
			const colors = random.array(random.int(3, 12), 0, 1);
			const k = random.int(3, colors.length);
			expect(numberOfAlternatingGroups(colors, k)).toBe(
				byBruteForce(colors, k),
			);
		}
	});
});
