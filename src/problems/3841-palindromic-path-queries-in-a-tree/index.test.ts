import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromicPathQueriesInATree as palindromePath } from ".";

/** Walks each path directly. */
const byBruteForce = (
	n: number,
	edges: number[][],
	s: string,
	queries: string[],
): boolean[] => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const chars = [...s];
	const answers: boolean[] = [];
	for (const query of queries) {
		const [kind, a = "0", b = "0"] = query.split(" ");
		if (kind === "update") {
			chars[Number(a)] = b;
			continue;
		}
		const path: number[] = [];
		const find = (x: number, from: number): boolean => {
			path.push(x);
			if (x === Number(b)) return true;
			for (const to of adjacent[x] ?? [])
				if (to !== from && find(to, x)) return true;
			path.pop();
			return false;
		};
		find(Number(a), -1);
		const counts = new Map<string, number>();
		for (const x of path)
			counts.set(chars[x] ?? "", (counts.get(chars[x] ?? "") ?? 0) + 1);
		answers.push([...counts.values()].filter((c) => c % 2 === 1).length <= 1);
	}
	return answers;
};

describe("3841. Palindromic Path Queries in a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			palindromePath(
				3,
				[
					[0, 1],
					[1, 2],
				],
				"aac",
				["query 0 2", "update 1 b", "query 0 2"],
			),
		).toEqual([true, false]);
		expect(
			palindromePath(
				4,
				[
					[0, 1],
					[0, 2],
					[0, 3],
				],
				"abca",
				["query 1 2", "update 0 b", "query 2 3", "update 3 a", "query 1 3"],
			),
		).toEqual([false, false, true]);
	});

	it("matches walking each path on random trees", () => {
		const random = createRandom(3841);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 10);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const s = random.string(n, "abc");
			const queries = Array.from({ length: 10 }, () =>
				random.int(0, 2) === 0
					? `update ${random.int(0, n - 1)} ${random.string(1, "abc")}`
					: `query ${random.int(0, n - 1)} ${random.int(0, n - 1)}`,
			);
			expect(palindromePath(n, edges, s, queries)).toEqual(
				byBruteForce(n, edges, s, queries),
			);
		}
	});
});
