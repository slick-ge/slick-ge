# Tool icons

The vendored SVGs in `public/tool-icons/` come from Simple Icons 16.24.1, downloaded from `https://cdn.jsdelivr.net/npm/simple-icons@16.24.1/icons/<slug>.svg`. Its CC0 license is retained in that directory. Brand names and marks identify the tools listed; they do not imply endorsement.

`src/data/tool-icons.json` maps supported labels to assets. When no accurate icon is available, the visible tool name is sufficient. The browser never requests a mutable `@latest` icon or a third-party avatar.

To update, choose a specific Simple Icons version, download only the mapped SVGs, retain its license, and check that the marks still represent the adjacent labels. Re-run the asset checks in the browser suite.
