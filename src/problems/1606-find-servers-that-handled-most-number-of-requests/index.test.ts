import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findServersThatHandledMostNumberOfRequests as busiestServers } from ".";

/** Scans the servers for every request. */
const byBruteForce = (
	k: number,
	arrival: number[],
	load: number[],
): number[] => {
	const freeAt = new Array<number>(k).fill(0);
	const handled = new Array<number>(k).fill(0);
	arrival.forEach((time, i) => {
		for (let step = 0; step < k; step++) {
			const server = (i + step) % k;
			if ((freeAt[server] ?? 0) <= time) {
				freeAt[server] = time + (load[i] ?? 0);
				handled[server] = (handled[server] ?? 0) + 1;
				return;
			}
		}
	});
	const most = Math.max(...handled);
	return handled.flatMap((count, server) => (count === most ? [server] : []));
};

describe("1606. Find Servers That Handled Most Number of Requests", () => {
	it("solves the examples from the problem statement", () => {
		expect(busiestServers(3, [1, 2, 3, 4, 5], [5, 2, 3, 3, 3])).toEqual([1]);
		expect(busiestServers(3, [1, 2, 3, 4], [1, 2, 1, 2])).toEqual([0]);
		expect(busiestServers(3, [1, 2, 3], [10, 12, 11])).toEqual([0, 1, 2]);
	});

	it("matches scanning servers on random requests", () => {
		const random = createRandom(1606);
		for (let run = 0; run < 300; run++) {
			const k = random.int(1, 6);
			const times = [...new Set(random.array(random.int(1, 20), 1, 40))].sort(
				(a, b) => a - b,
			);
			const load = random.array(times.length, 1, 10);
			expect(busiestServers(k, times, load)).toEqual(
				byBruteForce(k, times, load),
			);
		}
	});
});
