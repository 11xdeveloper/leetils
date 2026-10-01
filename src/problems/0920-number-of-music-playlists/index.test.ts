import { describe, expect, it } from "bun:test";
import { numberOfMusicPlaylists as numMusicPlaylists } from ".";

/** Counts playlists one song at a time. */
const byBruteForce = (n: number, goal: number, k: number): number => {
	const count = (playlist: number[]): number => {
		if (playlist.length === goal) return new Set(playlist).size === n ? 1 : 0;
		let total = 0;
		const recent = k === 0 ? [] : playlist.slice(-k);
		for (let song = 0; song < n; song++)
			if (!recent.includes(song)) total += count([...playlist, song]);
		return total;
	};
	return count([]);
};

describe("920. Number of Music Playlists", () => {
	it("solves the examples from the problem statement", () => {
		expect(numMusicPlaylists(3, 3, 1)).toBe(6);
		expect(numMusicPlaylists(2, 3, 0)).toBe(6);
		expect(numMusicPlaylists(2, 3, 1)).toBe(2);
	});

	it("matches building every playlist for small inputs", () => {
		for (let n = 1; n <= 4; n++) {
			for (let goal = n; goal <= 6; goal++)
				for (let k = 0; k < n; k++)
					expect(numMusicPlaylists(n, goal, k)).toBe(byBruteForce(n, goal, k));
		}
	});
});
