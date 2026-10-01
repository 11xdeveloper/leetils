import { describe, expect, it } from "bun:test";
import { theEarliestAndLatestRoundsWherePlayersCompete as earliestAndLatest } from ".";

/** Plays out every tournament with the actual player numbers. */
const byBruteForce = (n: number, first: number, second: number): number[] => {
	let [earliest, latest] = [Infinity, 0];
	const play = (row: number[], round: number) => {
		const pairs = Math.floor(row.length / 2);
		for (let i = 0; i < pairs; i++) {
			const pair = [row[i], row[row.length - 1 - i]];
			if (pair.includes(first) && pair.includes(second)) {
				earliest = Math.min(earliest, round);
				latest = Math.max(latest, round);
				return;
			}
		}
		for (let mask = 0; mask < 1 << pairs; mask++) {
			const next: number[] = [];
			let valid = true;
			for (let i = 0; i < pairs; i++) {
				const [front = 0, back = 0] = [row[i], row[row.length - 1 - i]];
				const winner = (mask >> i) & 1 ? front : back;
				const loser = winner === front ? back : front;
				if (loser === first || loser === second) valid = false;
				next.push(winner);
			}
			if (!valid) continue;
			if (row.length % 2 === 1) next.push(row[pairs] ?? 0);
			play(
				next.sort((x, y) => x - y),
				round + 1,
			);
		}
	};
	play(
		Array.from({ length: n }, (_, i) => i + 1),
		1,
	);
	return [earliest, latest];
};

describe("1900. The Earliest and Latest Rounds Where Players Compete", () => {
	it("solves the examples from the problem statement", () => {
		expect(earliestAndLatest(11, 2, 4)).toEqual([3, 4]);
		expect(earliestAndLatest(5, 1, 5)).toEqual([1, 1]);
	});

	it("matches playing out every tournament for small n", () => {
		for (let n = 2; n <= 9; n++) {
			for (let first = 1; first <= n; first++) {
				for (let second = first + 1; second <= n; second++) {
					expect(earliestAndLatest(n, first, second)).toEqual(
						byBruteForce(n, first, second),
					);
				}
			}
		}
	});

	it("handles 28 players", () => {
		// Players 1 and 2 stay at the front, so they only meet once two players remain.
		expect(earliestAndLatest(28, 1, 2)).toEqual([5, 5]);
		expect(earliestAndLatest(28, 1, 28)).toEqual([1, 1]);
	});
});
