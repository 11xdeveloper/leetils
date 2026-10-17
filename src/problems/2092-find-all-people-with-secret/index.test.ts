import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAllPeopleWithSecret as findAllPeople } from ".";

/** Spreads the secret within each time until nothing changes. */
const byBruteForce = (
	n: number,
	meetings: number[][],
	firstPerson: number,
): number[] => {
	const knows = new Set([0, firstPerson]);
	const times = [...new Set(meetings.map(([, , time = 0]) => time))].sort(
		(a, b) => a - b,
	);
	for (const time of times) {
		const now = meetings.filter(([, , t]) => t === time);
		for (let changed = true; changed; ) {
			changed = false;
			for (const [x = 0, y = 0] of now) {
				if (knows.has(x) !== knows.has(y)) {
					knows.add(x).add(y);
					changed = true;
				}
			}
		}
	}
	return Array.from({ length: n }, (_, i) => i).filter((i) => knows.has(i));
};

describe("2092. Find All People With Secret", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findAllPeople(
				6,
				[
					[1, 2, 5],
					[2, 3, 8],
					[1, 5, 10],
				],
				1,
			),
		).toEqual([0, 1, 2, 3, 5]);
		expect(
			findAllPeople(
				4,
				[
					[3, 1, 3],
					[1, 2, 2],
					[0, 3, 3],
				],
				3,
			),
		).toEqual([0, 1, 3]);
		expect(
			findAllPeople(
				5,
				[
					[3, 4, 2],
					[1, 2, 1],
					[2, 3, 1],
				],
				1,
			),
		).toEqual([0, 1, 2, 3, 4]);
	});

	it("matches spreading the secret step by step on random meetings", () => {
		const random = createRandom(2092);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 8);
			const meetings = Array.from({ length: random.int(1, 10) }, () => {
				const x = random.int(0, n - 1);
				let y = random.int(0, n - 2);
				if (y >= x) y++;
				return [x, y, random.int(1, 4)];
			});
			const firstPerson = random.int(1, n - 1);
			expect(findAllPeople(n, meetings, firstPerson)).toEqual(
				byBruteForce(n, meetings, firstPerson),
			);
		}
	});
});
