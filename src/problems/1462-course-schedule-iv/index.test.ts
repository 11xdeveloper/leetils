import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { courseScheduleIV as checkIfPrerequisite } from ".";

/** Searches forwards from u for each query. */
const byBruteForce = (
	n: number,
	prerequisites: number[][],
	queries: number[][],
): boolean[] =>
	queries.map(([u = 0, v = 0]) => {
		const seen = new Set([u]);
		const stack = [u];
		for (let at = stack.pop(); at !== undefined; at = stack.pop()) {
			for (const [a, b = 0] of prerequisites) {
				if (a !== at || seen.has(b)) continue;
				seen.add(b);
				stack.push(b);
			}
		}
		return seen.has(v) && u !== v;
	});

describe("1462. Course Schedule IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkIfPrerequisite(
				2,
				[[1, 0]],
				[
					[0, 1],
					[1, 0],
				],
			),
		).toEqual([false, true]);
		expect(
			checkIfPrerequisite(
				2,
				[],
				[
					[1, 0],
					[0, 1],
				],
			),
		).toEqual([false, false]);
		expect(
			checkIfPrerequisite(
				3,
				[
					[1, 2],
					[1, 0],
					[2, 0],
				],
				[
					[1, 0],
					[1, 2],
				],
			),
		).toEqual([true, true]);
	});

	it("matches searching from each query on random acyclic graphs", () => {
		const random = createRandom(1462);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const prerequisites: number[][] = [];
			// Edges only go from lower to higher numbers, then get relabelled.
			const label = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			for (let a = 0; a < n; a++) {
				for (let b = a + 1; b < n; b++)
					if (random.next() < 0.3)
						prerequisites.push([label[a] ?? 0, label[b] ?? 0]);
			}
			const queries = Array.from({ length: 6 }, () => {
				const u = random.int(0, n - 1);
				return [u, (u + random.int(1, n - 1)) % n];
			});
			expect(checkIfPrerequisite(n, prerequisites, queries)).toEqual(
				byBruteForce(n, prerequisites, queries),
			);
		}
	});
});
