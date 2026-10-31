import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countRobotGroups as countGroups } from ".";

/** Event simulation with exact fractions: merge the earliest-touching neighbours repeatedly. */
const byBruteForce = (
	position: number[],
	speed: number[],
	distance: number,
): number => {
	// Groups as [position at time now (numerator over shared denominator), speed].
	let groups = position.map((p, i) => ({
		p: BigInt(p),
		v: BigInt(speed[i] ?? 0),
	}));
	let [now, den] = [0n, 1n];
	const d = BigInt(distance);
	const at = (g: { p: bigint; v: bigint }) =>
		[g.p * den + g.v * now, den] as const;
	for (;;) {
		// Merge every chain of neighbours already within distance, all at once.
		const merged: typeof groups = [];
		for (let i = groups.length - 1; i >= 0; i--) {
			const g = groups[i];
			const ahead = groups[i + 1];
			if (g && ahead) {
				const [x, xd] = at(g);
				const [y, yd] = at(ahead);
				if (y * xd - x * yd <= d * xd * yd) continue;
			}
			if (g) merged.unshift(g);
		}
		groups = merged;
		// Earliest future touching time.
		let best: [bigint, bigint] | undefined;
		for (let i = 0; i + 1 < groups.length; i++) {
			const [a, b] = [groups[i], groups[i + 1]];
			if (!a || !b || a.v <= b.v) continue;
			const t: [bigint, bigint] = [b.p - a.p - d, a.v - b.v];
			if (!best || t[0] * best[1] < best[0] * t[1]) best = t;
		}
		if (!best) return groups.length;
		[now, den] = best;
	}
};

describe("4045. Count Robot Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGroups([1, 5, 6, 20], [4, 3, 2, 3], 1)).toBe(2);
		expect(countGroups([1, 5, 9], [3, 2, 2], 2)).toBe(2);
		expect(countGroups([9], [8], 5)).toBe(1);
	});

	it("matches an event simulation on random robots", () => {
		const random = createRandom(4045);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 7);
			let p = 0;
			const position = Array.from({ length: n }, () => (p += random.int(1, 6)));
			const speed = random.array(n, 1, 5);
			const distance = random.int(1, 3);
			expect(countGroups(position, speed, distance)).toBe(
				byBruteForce(position, speed, distance),
			);
		}
	});
});
