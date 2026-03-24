# How to Contribute Functionalities in `juro-docs`

This guide defines how to contribute documentation functionality and information architecture in `juro-docs`.

Platform abstraction source:
- `/Users/arshdeep/git/juro-platform/contracts/how-to-contribute-functionalities.md`

## Repository scope

Use this repo for:
- docs structure, IA, and navigation
- feature documentation and user guides
- integration guides and deployment documentation
- changelog-style narrative updates

## Feature intake checklist

Before editing:
- identify target audience (developer, operator, business, legal)
- map content to affected service/domain:
  - `docs.jurocompliant.com`
- ensure terms/naming follow platform nomenclature

## Implementation pattern

1. Update/add docs pages in appropriate section.
2. Keep examples and commands aligned with canonical repo/domain names.
3. Cross-link to platform contracts for multi-repo behavior.
4. Avoid duplicating logic docs when source lives in platform repo.

## Required validation

- Build previews render without broken links.
- Commands and URLs in docs are current.
- Terminology matches `juro-platform/contracts/nomenclature.md`.

## Cross-repo obligations

If docs reflect new functionality:
- ensure corresponding repo guide exists/updated
- ensure platform-level abstraction doc is updated when process changes
