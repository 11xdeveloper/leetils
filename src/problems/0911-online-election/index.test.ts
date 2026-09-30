import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { OnlineElection as TopVotedCandidate } from ".";

describe("911. Online Election", () => {
	it("solves the example from the problem statement", () => {
		const election = new TopVotedCandidate(
			[0, 1, 1, 0, 0, 1, 0],
			[0, 5, 10, 15, 20, 25, 30],
		);
		expect([3, 12, 25, 15, 24, 8].map((t) => election.q(t))).toEqual([
			0, 1, 1, 0, 0, 1,
		]);
	});

	it("matches counting the votes up to each query on random elections", () => {
		const random = createRandom(911);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 15);
			const persons = random.array(n, 0, 3);
			const times: number[] = [];
			for (let i = 0; i < n; i++)
				times.push((times.at(-1) ?? -1) + random.int(1, 3));
			const election = new TopVotedCandidate(persons, times);
			for (let query = 0; query < 10; query++) {
				const t = random.int(times[0] ?? 0, (times.at(-1) ?? 0) + 3);
				const counts = new Map<number, number>();
				let leader = -1;
				for (const [i, person] of persons.entries()) {
					if ((times[i] ?? 0) > t) break;
					counts.set(person, (counts.get(person) ?? 0) + 1);
					if ((counts.get(person) ?? 0) >= (counts.get(leader) ?? 0))
						leader = person;
				}
				expect(election.q(t)).toBe(leader);
			}
		}
	});
});
