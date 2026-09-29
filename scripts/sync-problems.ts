// Downloads LeetCode's problem list into data/leetcode-problems.json, then
// regenerates the problem list in PROBLEMS.md and docs/problems.
// Usage: bun run sync

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
	CATALOGUE_FILE,
	type Catalogue,
	type Difficulty,
	type LeetCodeProblem,
	ROOT_DIR,
	writeGeneratedFiles,
} from "./problems";

interface ApiResponse {
	stat_status_pairs: {
		stat: {
			frontend_question_id: number;
			question__title: string;
			question__title_slug: string;
		};
		difficulty: { level: number };
		paid_only: boolean;
	}[];
}

const DIFFICULTIES: Record<number, Difficulty> = {
	1: "Easy",
	2: "Medium",
	3: "Hard",
};

const response = await fetch("https://leetcode.com/api/problems/all/", {
	headers: {
		"User-Agent": "leetils (https://github.com/11xdeveloper/leetils)",
	},
});
if (!response.ok) {
	throw new Error(`LeetCode responded with ${response.status}`);
}

const { stat_status_pairs } = (await response.json()) as ApiResponse;

const problems = stat_status_pairs
	.map(({ stat, difficulty, paid_only }): LeetCodeProblem => {
		const level = DIFFICULTIES[difficulty.level];
		if (!level) {
			throw new Error(`Unknown difficulty level ${difficulty.level}`);
		}
		return {
			number: stat.frontend_question_id,
			title: stat.question__title,
			slug: stat.question__title_slug,
			difficulty: level,
			premium: paid_only,
		};
	})
	.toSorted((a, b) => a.number - b.number);

const catalogue: Catalogue = {
	syncedAt: new Date().toISOString().slice(0, 10),
	problems,
};

const cataloguePath = join(ROOT_DIR, CATALOGUE_FILE);
mkdirSync(dirname(cataloguePath), { recursive: true });
writeFileSync(cataloguePath, `${JSON.stringify(catalogue, null, "\t")}\n`);
writeGeneratedFiles();

console.log(`Synced ${problems.length} problems and updated the problem list`);
