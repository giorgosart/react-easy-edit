# AGENTS Instructions

This repository hosts **react-easy-edit**, a small React 18 library that provides inline editing components.

## Development guidelines
- Use `yarn` for all scripts. Install dependencies with `yarn` and run tests with `yarn test`.
- Ensure unit tests pass by running `yarn test` before committing. The tests are located in `src/lib`.
- For coverage reports you can run `yarn coverage`. Building the library is done via `yarn build`.
- Please add or update tests whenever you introduce a new feature or fix a bug.

## Commit style
- Keep commit titles short and descriptive.
- Reference the related GitHub issue in parentheses, e.g. `Fix checkbox value (#123)`.

## Pull request notes
- Summarise the main changes in the PR description and mention any related issues.
- Include the output of `yarn test` (or note if tests fail due to environment issues).

## Code style hints
- The project uses ES6 syntax with semicolons and single quotes. Look at files in `src/lib` for examples.
- Components live in `src/lib`; the `src/demo` folder contains usage examples.

Be mindful of the [Code of Conduct](CODE_OF_CONDUCT.md) and review `CONTRIBUTING.md` for additional information.
