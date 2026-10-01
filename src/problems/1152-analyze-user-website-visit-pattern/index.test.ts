import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { analyzeUserWebsiteVisitPattern as mostVisitedPattern } from ".";

/** Scores every triple of websites by checking each user's visits for it as a subsequence. */
const byBruteForce = (
	users: string[],
	times: number[],
	sites: string[],
): string[] => {
	const names = [...new Set(sites)].sort();
	let best: string[] = [];
	let bestScore = 0;
	for (const a of names) {
		for (const b of names) {
			for (const c of names) {
				let score = 0;
				for (const user of new Set(users)) {
					const visited = users
						.map((u, i) => [u, times[i] ?? 0, sites[i] ?? ""] as const)
						.filter(([u]) => u === user)
						.sort((x, y) => x[1] - y[1])
						.map(([, , site]) => site);
					let matched = 0;
					for (const site of visited)
						if (site === [a, b, c][matched]) matched++;
					if (matched >= 3) score++;
				}
				// Triples are tried in lexicographic order, so only a strictly higher score wins.
				if (score > bestScore) [best, bestScore] = [[a, b, c], score];
			}
		}
	}
	return best;
};

describe("1152. Analyze User Website Visit Pattern", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostVisitedPattern(
				[
					"joe",
					"joe",
					"joe",
					"james",
					"james",
					"james",
					"james",
					"mary",
					"mary",
					"mary",
				],
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				[
					"home",
					"about",
					"career",
					"home",
					"cart",
					"maps",
					"home",
					"home",
					"about",
					"career",
				],
			),
		).toEqual(["home", "about", "career"]);
		expect(
			mostVisitedPattern(
				["ua", "ua", "ua", "ub", "ub", "ub"],
				[1, 2, 3, 4, 5, 6],
				["a", "b", "a", "a", "b", "c"],
			),
		).toEqual(["a", "b", "a"]);
	});

	it("orders visits by time, not by input position", () => {
		expect(
			mostVisitedPattern(["u", "u", "u"], [3, 1, 2], ["x", "y", "z"]),
		).toEqual(["y", "z", "x"]);
	});

	it("compares websites whole, so shorter prefixes come first", () => {
		expect(
			mostVisitedPattern(
				["u", "u", "u", "v", "v", "v"],
				[1, 2, 3, 4, 5, 6],
				["ab", "b", "c", "a", "bz", "c"],
			),
		).toEqual(["a", "bz", "c"]);
	});

	it("matches scoring every triple on random inputs", () => {
		const random = createRandom(1152);
		for (let run = 0; run < 150; run++) {
			const n = random.int(3, 12);
			const users = Array.from({ length: n }, () => random.string(1, "pqr"));
			users[0] = users[1] = users[2] = "p";
			const times = [...new Set(random.array(n * 3, 1, 1000))].slice(0, n);
			if (times.length < n) continue;
			const sites = Array.from({ length: n }, () =>
				random.string(random.int(1, 2), "ab"),
			);
			expect(mostVisitedPattern(users, times, sites)).toEqual(
				byBruteForce(users, times, sites),
			);
		}
	});
});
