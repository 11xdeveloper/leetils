import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { elevatorRequestsII as elevatorRequests } from ".";

/** Tries every visiting order. */
const byBruteForce = (start: number, requests: number[]): number => {
	let best = Number.POSITIVE_INFINITY;
	const go = (
		at: number,
		time: number,
		rest: number[],
		total: number,
	): void => {
		if (rest.length === 0) best = Math.min(best, total);
		rest.forEach((f, i) => {
			const t = time + Math.abs(f - at);
			go(
				f,
				t,
				rest.filter((_, j) => j !== i),
				total + t,
			);
		});
	};
	go(start, 0, requests, 0);
	return best;
};

describe("4023. Elevator Requests II", () => {
	it("solves the examples from the problem statement", () => {
		expect(elevatorRequests(6, 4, [1, 5])).toBe(6);
		expect(elevatorRequests(8, 3, [3, 7, 1])).toBe(10);
		expect(elevatorRequests(10, 5, [0, 2, 9])).toBe(22);
	});

	it("matches trying every order on random requests", () => {
		const random = createRandom(4023);
		for (let run = 0; run < 200; run++) {
			const requests = [...new Set(random.array(random.int(1, 6), 0, 20))];
			const start = random.int(0, 20);
			expect(elevatorRequests(21, start, requests)).toBe(
				byBruteForce(start, requests),
			);
		}
	});
});
