import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfFrogsCroaking as minNumberOfFrogs } from ".";

describe("1419. Minimum Number of Frogs Croaking", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNumberOfFrogs("croakcroak")).toBe(1);
		expect(minNumberOfFrogs("crcoakroak")).toBe(2);
		expect(minNumberOfFrogs("croakcrook")).toBe(-1);
	});

	it("rejects unfinished croaks", () => {
		expect(minNumberOfFrogs("croakcr")).toBe(-1);
		expect(minNumberOfFrogs("k")).toBe(-1);
	});

	it("needs as many frogs as croaks overlap in random interleavings", () => {
		const random = createRandom(1419);
		for (let run = 0; run < 300; run++) {
			// Each frog croaks over [start, start + 4] in time; letters are ordered by time.
			const croaks = random.int(1, 5);
			const events: [number, number, string][] = [];
			const starts: number[] = [];
			for (let frog = 0; frog < croaks; frog++) {
				const start = random.int(0, 12);
				starts.push(start);
				[..."croak"].forEach((char, i) => {
					events.push([start * 10 + i * 3, frog, char]);
				});
			}
			events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
			const s = events.map(([, , char]) => char).join("");
			// The least frogs needed is the most croaks running at any moment.
			const intervals = starts.map((start) => [start * 10, start * 10 + 12]);
			const overlap = Math.max(
				...intervals.map(
					([t = 0]) =>
						intervals.filter(([a = 0, b = 0]) => a <= t && t <= b).length,
				),
			);
			expect(minNumberOfFrogs(s)).toBe(overlap);
		}
	});
});
