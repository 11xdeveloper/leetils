import { describe, expect, it } from "bun:test";
import { handshakesThatDontCross as numberOfWays } from ".";

/** Pairs up people directly, rejecting crossing handshakes. */
const byBruteForce = (people: number): number => {
	const partner = new Array<number>(people).fill(-1);
	// Chords a–b and i–p cross when exactly one of i and p lies between a and b.
	const crosses = (a: number, b: number) =>
		partner.some((p, i) => p > i && (a < i && i < b) !== (a < p && p < b));
	const pair = (): number => {
		const first = partner.indexOf(-1);
		if (first === -1) return 1;
		let ways = 0;
		for (let other = first + 1; other < people; other++) {
			if (partner[other] !== -1 || crosses(first, other)) continue;
			partner[first] = other;
			partner[other] = first;
			ways += pair();
			partner[first] = -1;
			partner[other] = -1;
		}
		return ways;
	};
	return pair();
};

describe("1259. Handshakes That Don't Cross", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays(4)).toBe(2);
		expect(numberOfWays(6)).toBe(5);
	});

	it("gives the Catalan numbers", () => {
		expect([2, 4, 6, 8, 10, 12, 14].map(numberOfWays)).toEqual([
			1, 2, 5, 14, 42, 132, 429,
		]);
	});

	it("matches pairing people directly up to 12", () => {
		for (let people = 2; people <= 12; people += 2) {
			expect(numberOfWays(people)).toBe(byBruteForce(people));
		}
	});

	it("reduces modulo 10^9 + 7", () => {
		const ways = numberOfWays(1000);
		expect(ways).toBeGreaterThanOrEqual(0);
		expect(ways).toBeLessThan(1_000_000_007);
		// 100 people pair up in Catalan(50) = 1978261657756160653623774456 ways.
		expect(numberOfWays(100)).toBe(
			Number(1978261657756160653623774456n % 1_000_000_007n),
		);
	});
});
