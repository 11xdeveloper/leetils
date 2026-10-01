/**
 * 911. Online Election
 *
 * Vote `i` went to `persons[i]` at `times[i]` (increasing). `q(t)` returns
 * who was leading at time `t`, ties going to the most recent vote among
 * the tied.
 *
 * Replays the votes once, recording the leader after each. A query binary
 * searches for the last vote at or before `t`.
 *
 * @see https://leetcode.com/problems/online-election/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(log n) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const election = new OnlineElection([0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]);
 * election.q(3); // 0
 * election.q(12); // 1
 */
export class OnlineElection {
	readonly #times: readonly number[];
	readonly #leaders: number[] = [];

	constructor(persons: readonly number[], times: readonly number[]) {
		this.#times = times;
		const votes = new Map<number, number>();
		let leader = -1;
		for (const person of persons) {
			const count = (votes.get(person) ?? 0) + 1;
			votes.set(person, count);
			if (count >= (votes.get(leader) ?? 0)) leader = person;
			this.#leaders.push(leader);
		}
	}

	q(t: number): number {
		let low = 0;
		let high = this.#times.length - 1;
		while (low < high) {
			const mid = (low + high + 1) >>> 1;
			if ((this.#times[mid] ?? 0) <= t) low = mid;
			else high = mid - 1;
		}
		return this.#leaders[low] ?? -1;
	}
}
