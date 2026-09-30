import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { getWatchedVideosByYourFriends as watchedVideosByFriends } from ".";

/** Finds distances by relaxing friendships until stable, then counts and sorts. */
const byBruteForce = (
	videos: string[][],
	friends: number[][],
	id: number,
	level: number,
) => {
	const distance = friends.map((_, person) => (person === id ? 0 : Infinity));
	for (let changed = true; changed; ) {
		changed = false;
		friends.forEach((list, person) => {
			for (const friend of list) {
				if (
					(distance[person] ?? Infinity) + 1 <
					(distance[friend] ?? Infinity)
				) {
					distance[friend] = (distance[person] ?? 0) + 1;
					changed = true;
				}
			}
		});
	}
	const watched = videos
		.filter((_, person) => distance[person] === level)
		.flat();
	const count = (video: string) => watched.filter((v) => v === video).length;
	return [...new Set(watched)].sort(
		(a, b) => count(a) - count(b) || a.localeCompare(b, "en"),
	);
};

describe("1311. Get Watched Videos by Your Friends", () => {
	const videos = [["A", "B"], ["C"], ["B", "C"], ["D"]];
	const friends = [
		[1, 2],
		[0, 3],
		[0, 3],
		[1, 2],
	];

	it("solves the examples from the problem statement", () => {
		expect(watchedVideosByFriends(videos, friends, 0, 1)).toEqual(["B", "C"]);
		expect(watchedVideosByFriends(videos, friends, 0, 2)).toEqual(["D"]);
	});

	it("matches relaxing distances on random networks", () => {
		const random = createRandom(1311);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 7);
			const pairs = new Set<string>();
			for (let i = random.int(0, 10); i > 0; i--) {
				const [a, b] = [random.int(0, n - 1), random.int(0, n - 1)];
				if (a !== b) pairs.add(`${Math.min(a, b)},${Math.max(a, b)}`);
			}
			const network = Array.from({ length: n }, (): number[] => []);
			for (const pair of pairs) {
				const [a = 0, b = 0] = pair.split(",").map(Number);
				network[a]?.push(b);
				network[b]?.push(a);
			}
			const watched = Array.from({ length: n }, () => [
				...new Set(
					Array.from({ length: random.int(1, 3) }, () =>
						random.string(random.int(1, 2), "ab"),
					),
				),
			]);
			const [id, level] = [random.int(0, n - 1), random.int(1, n - 1)];
			expect(watchedVideosByFriends(watched, network, id, level)).toEqual(
				byBruteForce(watched, network, id, level),
			);
		}
	});
});
