<div align="center">
  <a href="https://github.com/11xdeveloper/leetils#readme">
    <img alt="leetils" src="https://raw.githubusercontent.com/11xdeveloper/leetils/master/logo.png" height="150px" />
  </a>
</div>

<br/>

<div align="center">
  <strong>All (not really) of leetcode's problem solutions in one package</strong>
  <br />
  <a href="https://www.npmjs.com/package/leetils">
    <img src="https://img.shields.io/npm/dw/leetils" alt="Downloads: /week">
  </a>
  <a href="https://bundlephobia.com/package/leetils">
    <img src="https://img.shields.io/bundlephobia/minzip/leetils" alt="bundle size">
  </a>
  <img src="https://img.shields.io/badge/module%20formats-esm-green" alt="module formats: esm">
</div>

---

## Installation

```bash
npm install leetils
```

leetils is ESM-only and needs Node.js 22 or later, or any modern bundler.

## Usage

Each solution is named after its problem's LeetCode URL slug, in camelCase:

```ts
import { combinationSum, twoSum } from "leetils";

twoSum([2, 7, 11, 15], 9); // [0, 1]
combinationSum([2, 3, 6, 7], 7); // [[2, 2, 3], [7]]
```

Linked list and binary tree problems use the same `ListNode` and `TreeNode`
classes LeetCode provides. The package also exports helpers to convert them
to and from LeetCode's array format:

```ts
import { addTwoNumbers, listFromArray, listToArray } from "leetils";

listToArray(addTwoNumbers(listFromArray([2, 4, 3]), listFromArray([5, 6, 4]))); // [7, 0, 8]
```

Unused solutions are removed by your bundler, so you only pay for what you
import.

### How solutions behave

- **Signatures match LeetCode's.** Parameters, return values and in-place
  requirements follow the problem statement.
- **Inputs are assumed to meet the problem's constraints.** Behaviour outside
  them (an empty array where LeetCode guarantees at least one element, say) is
  not defined.
- **Inputs aren't modified** unless the problem requires it. Parameters that
  are left alone are typed `readonly`.
- **Each solution's doc comment** has the problem link, difficulty, approach
  and time/space complexity, so your editor shows them on hover.

### Naming

The export name is the slug in camelCase. Slugs are unique, so names never
collide, even though LeetCode reuses function names like `isPalindrome`
across problems.

| Problem | Slug | Export |
| --- | --- | --- |
| 9. Palindrome Number | `palindrome-number` | `palindromeNumber` |
| 20. Valid Parentheses | `valid-parentheses` | `validParentheses` |
| 15. 3Sum | `3sum` | `threeSum` (leading digits are spelled out) |
| 167. Two Sum II | `two-sum-ii-input-array-is-sorted` | `twoSumIIInputArrayIsSorted` |

## Contributing

You need [Bun](https://bun.sh). Run `bun install`, then scaffold a problem with
its number and slug:

```bash
bun run new 125 valid-palindrome
```

This creates `src/problems/0125-valid-palindrome/` with a solution and test
file to fill in, and adds the export to `src/index.ts`. Tests fail until the
TODOs are done.

`src/index.test.ts` checks that every problem:

- is in a folder named `<4-digit number>-<slug>`
- exports exactly one function, named after its slug
- has a doc comment starting with its number and title, with `@see`,
  `@difficulty`, `@timeComplexity` and `@spaceComplexity` tags
- has tests

| Script | What it does |
| --- | --- |
| `bun test` | Run the tests |
| `bun run typecheck` | Type check with TypeScript |
| `bun run lint` | Check linting and formatting with Biome |
| `bun run format` | Fix linting and formatting with Biome |
| `bun run build` | Build `dist/` with tsdown and update `exports` in package.json |
| `bun run check:package` | Check the built package with publint and attw |
| `bun run smoke` | Import the built package in Node |
| `bun run generate` | Regenerate `src/index.ts` |
| `bun run changeset` | Describe your change for the changelog |

### Releasing

Add a changeset with `bun run changeset` in any PR that changes the published
package. On `master`, the Release workflow opens a "Version Packages" PR that
bumps the version and updates the changelog. Merging it publishes to npm using
[trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm
token is stored in the repo.
