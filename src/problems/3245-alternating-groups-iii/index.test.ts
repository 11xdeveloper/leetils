import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { alternatingGroupsIII as numberOfAlternatingGroups } from ".";

/** Counts groups from every start for each query. */
const byBruteForce = (colors: number[], queries: number[][]): number[] => {
	const color = [...colors];
	const n = color.length;
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0] of queries) {
		if (type === 2) {
			color[a] = b;
			continue;
		}
		let groups = 0;
		for (let start = 0; start < n; start++) {
			let ok = true;
			for (let j = 1; j < a; j++)
				if (color[(start + j) % n] === color[(start + j - 1) % n]) ok = false;
			if (ok) groups++;
		}
		answers.push(groups);
	}
	return answers;
};

describe("3245. Alternating Groups III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfAlternatingGroups(
				[0, 1, 1, 0, 1],
				[
					[2, 1, 0],
					[1, 4],
				],
			),
		).toEqual([2]);
		expect(
			numberOfAlternatingGroups(
				[0, 0, 1, 0, 1, 1],
				[
					[1, 3],
					[2, 3, 0],
					[1, 5],
				],
			),
		).toEqual([2, 0]);
	});

	it("matches counting directly on random queries", () => {
		const random = createRandom(3245);
		for (let run = 0; run < 300; run++) {
			const colors = random.array(random.int(4, 10), 0, 1);
			const queries = Array.from({ length: random.int(1, 10) }, () =>
				random.int(0, 1) === 0
					? [1, random.int(3, colors.length - 1)]
					: [2, random.int(0, colors.length - 1), random.int(0, 1)],
			);
			expect(numberOfAlternatingGroups(colors, queries)).toEqual(
				byBruteForce(colors, queries),
			);
		}
	});
});
