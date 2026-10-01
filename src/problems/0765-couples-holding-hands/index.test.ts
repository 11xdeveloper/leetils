import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { couplesHoldingHands as minSwapsCouples } from ".";

/** Breadth-first search over seatings, swapping any two people. */
const bySearch = (row: number[]): number => {
	const done = (seating: number[]) =>
		seating.every(
			(person, seat) => seat % 2 === 1 || seating[seat + 1] === (person ^ 1),
		);
	const seen = new Set([row.join()]);
	let frontier = [row];
	for (let swaps = 0; ; swaps++) {
		const next: number[][] = [];
		for (const seating of frontier) {
			if (done(seating)) return swaps;
			for (let i = 0; i < seating.length; i++) {
				for (let j = i + 1; j < seating.length; j++) {
					const swapped = [...seating];
					[swapped[i], swapped[j]] = [seating[j] ?? 0, seating[i] ?? 0];
					if (!seen.has(swapped.join())) {
						seen.add(swapped.join());
						next.push(swapped);
					}
				}
			}
		}
		frontier = next;
	}
};

describe("765. Couples Holding Hands", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwapsCouples([0, 2, 1, 3])).toBe(1);
		expect(minSwapsCouples([3, 2, 0, 1])).toBe(0);
	});

	it("matches searching every sequence of swaps on random seatings", () => {
		const random = createRandom(765);
		for (let run = 0; run < 200; run++) {
			const row = Array.from(
				{ length: 2 * random.int(1, 4) },
				(_, i) => i,
			).sort(() => random.next() - 0.5);
			expect(minSwapsCouples(row)).toBe(bySearch(row));
		}
	});
});
