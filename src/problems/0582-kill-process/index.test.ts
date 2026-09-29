import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { killProcess } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("582. Kill Process", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(killProcess([1, 3, 10, 5], [3, 0, 5, 3], 5))).toEqual([
			5, 10,
		]);
		expect(killProcess([1], [0], 1)).toEqual([1]);
	});

	it("kills exactly the processes whose ancestors include the target on random trees", () => {
		const random = createRandom(582);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 15);
			const pid = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			// Each process's parent comes earlier in the list, so the first is the root.
			const ppid = pid.map((_, i) =>
				i === 0 ? 0 : (pid[random.int(0, i - 1)] ?? 0),
			);
			const kill = pid[random.int(0, n - 1)] ?? 1;
			const parentOf = new Map(pid.map((id, i) => [id, ppid[i] ?? 0]));
			const expected = pid.filter((id) => {
				for (
					let current = id;
					current !== 0;
					current = parentOf.get(current) ?? 0
				)
					if (current === kill) return true;
				return false;
			});
			expect(sorted(killProcess(pid, ppid, kill))).toEqual(sorted(expected));
		}
	});
});
