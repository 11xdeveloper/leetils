import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ExamRoom } from ".";

describe("855. Exam Room", () => {
	it("solves the example from the problem statement", () => {
		const room = new ExamRoom(10);
		expect([room.seat(), room.seat(), room.seat(), room.seat()]).toEqual([
			0, 9, 4, 2,
		]);
		room.leave(4);
		expect(room.seat()).toBe(5);
	});

	it("matches measuring every free seat on random operations", () => {
		const random = createRandom(855);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const room = new ExamRoom(n);
			const taken = new Set<number>();
			for (let op = 0; op < 30; op++) {
				if (taken.size > 0 && (taken.size === n || random.int(0, 2) === 0)) {
					const seat = [...taken][random.int(0, taken.size - 1)] ?? 0;
					room.leave(seat);
					taken.delete(seat);
					continue;
				}
				let best = -1;
				let bestDistance = -1;
				for (let seat = 0; seat < n; seat++) {
					if (taken.has(seat)) continue;
					const distance =
						taken.size === 0
							? n
							: Math.min(...[...taken].map((other) => Math.abs(other - seat)));
					if (distance > bestDistance) [best, bestDistance] = [seat, distance];
				}
				expect(room.seat()).toBe(best);
				taken.add(best);
			}
		}
	});
});
