import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { elevatorRequestsIII as elevatorRequests } from ".";

/** Simulates every walk second by second. */
const byBruteForce = (
	n: number,
	start: number,
	requests: number[][],
): number => {
	const r = requests.length;
	let frontier = new Set([`${start},0`]);
	for (let time = 0; ; time++) {
		const next = new Set<string>();
		for (const state of frontier) {
			const [floor = 0, mask = 0] = state.split(",").map(Number);
			let done = mask;
			requests.forEach(([arrival = 0, f = 0], k) => {
				if (f === floor && arrival <= time) done |= 1 << k;
			});
			if (done === (1 << r) - 1) return time;
			for (const d of [-1, 0, 1])
				if (floor + d >= 0 && floor + d < n) next.add(`${floor + d},${done}`);
		}
		frontier = next;
	}
};

describe("4027. Elevator Requests III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			elevatorRequests(9, 0, [
				[0, 8],
				[6, 5],
			]),
		).toBe(9);
		expect(
			elevatorRequests(8, 5, [
				[1, 7],
				[7, 3],
			]),
		).toBe(7);
		expect(
			elevatorRequests(7, 3, [
				[0, 5],
				[0, 1],
				[6, 3],
			]),
		).toBe(8);
	});

	it("matches simulating every walk on random requests", () => {
		const random = createRandom(4027);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 8);
			const requests = Array.from({ length: random.int(1, 4) }, () => [
				random.int(0, 10),
				random.int(0, n - 1),
			]);
			const start = random.int(0, n - 1);
			expect(elevatorRequests(n, start, requests)).toBe(
				byBruteForce(n, start, requests),
			);
		}
	});
});
