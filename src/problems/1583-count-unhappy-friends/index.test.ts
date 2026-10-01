import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countUnhappyFriends as unhappyFriends } from ".";

/** Checks the definition directly with indexOf. */
const byBruteForce = (
	n: number,
	preferences: number[][],
	pairs: number[][],
): number => {
	const partner = new Map<number, number>();
	for (const [a = 0, b = 0] of pairs) {
		partner.set(a, b);
		partner.set(b, a);
	}
	const prefers = (who: number, a: number, b: number) =>
		(preferences[who] ?? []).indexOf(a) < (preferences[who] ?? []).indexOf(b);
	let count = 0;
	for (let x = 0; x < n; x++) {
		const y = partner.get(x) ?? 0;
		let unhappy = false;
		for (let u = 0; u < n; u++) {
			if (u === x || u === y) continue;
			if (prefers(x, u, y) && prefers(u, x, partner.get(u) ?? 0))
				unhappy = true;
		}
		if (unhappy) count++;
	}
	return count;
};

describe("1583. Count Unhappy Friends", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			unhappyFriends(
				4,
				[
					[1, 2, 3],
					[3, 2, 0],
					[3, 1, 0],
					[1, 2, 0],
				],
				[
					[0, 1],
					[2, 3],
				],
			),
		).toBe(2);
		expect(unhappyFriends(2, [[1], [0]], [[1, 0]])).toBe(0);
		expect(
			unhappyFriends(
				4,
				[
					[1, 3, 2],
					[2, 3, 0],
					[1, 3, 0],
					[0, 2, 1],
				],
				[
					[1, 3],
					[0, 2],
				],
			),
		).toBe(4);
	});

	it("matches the definition on random preferences", () => {
		const random = createRandom(1583);
		for (let run = 0; run < 200; run++) {
			const n = 2 * random.int(1, 4);
			const people = Array.from({ length: n }, (_, i) => i);
			const preferences = people.map((x) =>
				people.filter((p) => p !== x).sort(() => random.next() - 0.5),
			);
			const order = [...people].sort(() => random.next() - 0.5);
			const pairs = Array.from({ length: n / 2 }, (_, i) => [
				order[2 * i] ?? 0,
				order[2 * i + 1] ?? 0,
			]);
			expect(unhappyFriends(n, preferences, pairs)).toBe(
				byBruteForce(n, preferences, pairs),
			);
		}
	});
});
