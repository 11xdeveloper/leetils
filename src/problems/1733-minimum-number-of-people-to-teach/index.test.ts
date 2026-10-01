import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfPeopleToTeach as minimumTeachings } from ".";

/** Tries every language and every set of users to teach it to. */
const byBruteForce = (
	n: number,
	languages: number[][],
	friendships: number[][],
): number => {
	let best = Infinity;
	for (let language = 1; language <= n; language++) {
		for (let mask = 0; mask < 1 << languages.length; mask++) {
			const known = languages.map(
				(list, i) => new Set(mask & (1 << i) ? [...list, language] : list),
			);
			const ok = friendships.every(([u = 1, v = 1]) =>
				[...(known[u - 1] ?? [])].some((l) => known[v - 1]?.has(l)),
			);
			if (!ok) continue;
			let taught = 0;
			for (let i = 0; i < languages.length; i++)
				if (mask & (1 << i) && !languages[i]?.includes(language)) taught++;
			best = Math.min(best, taught);
		}
	}
	return best;
};

describe("1733. Minimum Number of People to Teach", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumTeachings(
				2,
				[[1], [2], [1, 2]],
				[
					[1, 2],
					[1, 3],
					[2, 3],
				],
			),
		).toBe(1);
		expect(
			minimumTeachings(
				3,
				[[2], [1, 3], [1, 2], [3]],
				[
					[1, 4],
					[1, 2],
					[3, 4],
					[2, 3],
				],
			),
		).toBe(2);
	});

	it("matches trying every choice on random inputs", () => {
		const random = createRandom(1733);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 3);
			const m = random.int(2, 6);
			const languages = Array.from({ length: m }, () => [
				...new Set(random.array(random.int(1, 2), 1, n)),
			]);
			const friendships: number[][] = [];
			for (let u = 1; u <= m; u++)
				for (let v = u + 1; v <= m; v++)
					if (random.int(0, 2) === 0) friendships.push([u, v]);
			expect(minimumTeachings(n, languages, friendships)).toBe(
				byBruteForce(n, languages, friendships),
			);
		}
	});
});
