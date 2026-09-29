/**
 * 635. Design Log Storage System
 *
 * Stores logs with IDs and timestamps like `"2017:01:01:23:59:59"`, and
 * retrieves the IDs whose timestamps fall between `start` and `end`
 * (inclusive) when compared only down to a `granularity`: `"Year"`,
 * `"Month"`, `"Day"`, `"Hour"`, `"Minute"` or `"Second"`. IDs are returned in
 * the order they were stored.
 *
 * Every field is zero-padded, so timestamps compare correctly as strings,
 * and a granularity just means comparing a prefix of each.
 *
 * @see https://leetcode.com/problems/design-log-storage-system/
 * @difficulty Medium
 * @timeComplexity O(1) per `put`, O(n) per `retrieve`
 * @spaceComplexity O(n)
 *
 * @example
 * const logs = new DesignLogStorageSystem();
 * logs.put(1, "2017:01:01:23:59:59");
 * logs.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year"); // [1]
 */
export class DesignLogStorageSystem {
	static readonly #prefixLength: Record<string, number> = {
		Year: 4,
		Month: 7,
		Day: 10,
		Hour: 13,
		Minute: 16,
		Second: 19,
	};
	readonly #logs: [id: number, timestamp: string][] = [];

	put(id: number, timestamp: string): void {
		this.#logs.push([id, timestamp]);
	}

	retrieve(start: string, end: string, granularity: string): number[] {
		const length = DesignLogStorageSystem.#prefixLength[granularity] ?? 19;
		const from = start.slice(0, length);
		const to = end.slice(0, length);
		return this.#logs
			.filter(([, timestamp]) => {
				const prefix = timestamp.slice(0, length);
				return from <= prefix && prefix <= to;
			})
			.map(([id]) => id);
	}
}
