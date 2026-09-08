# Documentation backlog

| ID | Item | Status |
|---|---|---|
| DOCS-002 | Keep React and React DOM at the same runtime version | PR #54 aligns both locked packages at 19.2.8; fixes the reproducible server-build version mismatch. Local clean install, TypeScript check and production build pass; existing broken-link/anchor warnings remain. |
| DOCS-001 | Align link-checker upgrade with supported Node runtime | Implemented in PR #58: Node >=22.12 locally, Node 22 in CI/SCA/Pages, runtime smoke and lockfile-triggered builds. Local link-checker CLI, typecheck and production build passed; existing broken-link/anchor warnings remain. CI on Node 22 required before merge. |
| DOCS-003 | Align the official Docusaurus package family | PR #56 pins all direct official packages to 3.10.2, removing the core/plugin version mismatch. Initial clean install, typecheck and build passed; final integrated checks required before merge. Existing broken-link/anchor warnings remain. |
