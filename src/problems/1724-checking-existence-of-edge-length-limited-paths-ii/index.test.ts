import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { CheckingExistenceOfEdgeLengthLimitedPathsII as DistanceLimitedPathsExist } from ".";

/** Searches from p using only short enough edges. */
const byBruteForce = (
	edges: number[][],
	p: number,
	q: number,
	limit: number,
): boolean => {
	const seen = new Set([p]);
	const stack = [p];
	for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
		for (const [u, v, length = 0] of edges) {
			if (length >= limit) continue;
			const other = u === node ? v : v === node ? u : undefined;
			if (other === undefined || seen.has(other)) continue;
			seen.add(other);
			stack.push(other);
		}
	}
	return seen.has(q);
};

describe("1724. Checking Existence of Edge Length Limited Paths II", () => {
	it("solves the example from the problem statement", () => {
		const paths = new DistanceLimitedPathsExist(6, [
			[0, 2, 4],
			[0, 3, 2],
			[1, 2, 3],
			[2, 3, 1],
			[4, 5, 5],
		]);
		expect(paths.query(2, 3, 2)).toBeTrue();
		expect(paths.query(1, 3, 3)).toBeFalse();
		expect(paths.query(2, 0, 3)).toBeTrue();
		expect(paths.query(0, 5, 6)).toBeFalse();
	});

	it("matches a search per query on random graphs", () => {
		const random = createRandom(1724);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const edges = Array.from({ length: random.int(0, 12) }, () => {
				const u = random.int(0, n - 1);
				return [u, (u + random.int(1, n - 1)) % n, random.int(1, 10)];
			});
			const paths = new DistanceLimitedPathsExist(n, edges);
			for (let query = 0; query < 10; query++) {
				const [p, q, limit] = [
					random.int(0, n - 1),
					random.int(0, n - 1),
					random.int(1, 11),
				];
				expect(paths.query(p, q, limit)).toBe(byBruteForce(edges, p, q, limit));
			}
		}
	});
});
