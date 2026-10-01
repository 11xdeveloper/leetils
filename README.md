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

Linked list, tree and graph problems use the same node classes LeetCode
provides: `ListNode`, `TreeNode`, `GraphNode`, `RandomListNode`,
`MultilevelListNode`, `TreeNodeWithNext`, `TreeNodeWithParent`,
`TreeNodeWithRandom`, `NaryTreeNode`, `QuadTreeNode`, `ExpressionTreeNode` and
`NestedInteger`. The package also exports
helpers to convert them to and from LeetCode's array formats:

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
- **Problems given an API**, like `isBadVersion` or `read4`, follow
  LeetCode's JavaScript version: pass in the API and get back the solving
  function, e.g. `firstBadVersion(isBadVersion)(n)`.
- **Randomised solutions** take an optional last argument, a random number
  source like `Math.random` (the default). Pass a seeded one for reproducible
  results.
- **Each solution's doc comment** has the problem link, difficulty, approach
  and time/space complexity, so your editor shows them on hover.

### Naming

The export name is the slug in camelCase. Slugs are unique, so names never
collide, even though LeetCode reuses function names like `isPalindrome`
across problems. Design problems, where LeetCode asks for a class, export a
class named with the slug in PascalCase.

| Problem | Slug | Export |
| --- | --- | --- |
| 9. Palindrome Number | `palindrome-number` | `palindromeNumber` |
| 20. Valid Parentheses | `valid-parentheses` | `validParentheses` |
| 15. 3Sum | `3sum` | `threeSum` (leading digits are spelled out) |
| 167. Two Sum II | `two-sum-ii-input-array-is-sorted` | `twoSumIIInputArrayIsSorted` |
| 146. LRU Cache | `lru-cache` | `LruCache` (a class) |

### Scope

SQL, pandas, shell and concurrency problems aren't TypeScript problems, so
they're out of scope. [PROBLEMS.md](PROBLEMS.md) marks them and leaves them
out of its progress totals.

## Contributing

[PROBLEMS.md](PROBLEMS.md) lists every LeetCode problem and whether it's
implemented yet. Pick one, then scaffold it by number:

```bash
bun run new 125
```

For a design problem, add `--class` to scaffold a class instead of a
function. You need [Bun](https://bun.sh) and a `bun install` first. This creates
`src/problems/0125-valid-palindrome/` with a solution and test file to fill in,
using the title, slug and difficulty from LeetCode, and updates `src/index.ts`
and the problem list. Tests fail until the TODOs are done.

`src/index.test.ts` checks that every problem:

- is in a folder named `<4-digit number>-<slug>`, matching LeetCode's number
  and slug
- exports exactly one function, named after its slug
- has a doc comment starting with its number and LeetCode's title, with
  `@see`, `@difficulty` (matching LeetCode's), `@timeComplexity` and
  `@spaceComplexity` tags
- has tests

Code shared by several solutions, like the binary heap in `src/internal/`,
isn't exported from the package. Test helpers, like the seeded random
generator in `src/testing/`, are only used by tests.

The problem list comes from a snapshot of LeetCode's catalogue in
`data/leetcode-problems.json`, so builds don't depend on LeetCode being
reachable. Run `bun run sync` to pick up newly released problems.

| Script | What it does |
| --- | --- |
| `bun test` | Run the tests |
| `bun run typecheck` | Type check with TypeScript |
| `bun run lint` | Check linting and formatting with Biome |
| `bun run format` | Fix linting and formatting with Biome |
| `bun run build` | Build `dist/` with tsdown and update `exports` in package.json |
| `bun run check:package` | Check the built package with publint and attw |
| `bun run smoke` | Import the built package in Node |
| `bun run new <number>` | Scaffold a problem |
| `bun run generate` | Regenerate `src/index.ts` and the problem list |
| `bun run sync` | Download LeetCode's latest problem list, then regenerate |
| `bun run changeset` | Describe your change for the changelog |

### Releasing

Add a changeset with `bun run changeset` in any PR that changes the published
package. On `master`, the Release workflow opens a "Version Packages" PR that
bumps the version and updates the changelog. Merging it publishes to npm using
[trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm
token is stored in the repo.
