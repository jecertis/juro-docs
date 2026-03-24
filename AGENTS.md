# AGENTS

## Purpose

Defines agent responsibilities for the `juro-docs` repository.

## Scope

- Documentation IA and content
- Integration guides and examples
- Consistency with live platform topology

## Agent Rules

- Follow platform abstraction: `/Users/arshdeep/git/juro-platform/contracts/how-to-contribute-functionalities.md`
- Follow naming standard: `/Users/arshdeep/git/juro-platform/contracts/nomenclature.md`
- Keep commands/URLs aligned with canonical repo and domain names
- Avoid duplicating source-of-truth contracts owned by `juro-platform`

## Required Checks

- Links and references resolve
- Terminology and naming are consistent
- Docs reflect current service map

## PR Acceptance Checklist

- [ ] Scope is clearly documented and aligned with repository purpose.
- [ ] Naming and domain references follow platform nomenclature rules.
- [ ] Tests or validation evidence are included for behavior changes.
- [ ] Required docs/contracts are updated when assumptions changed.
- [ ] Rollback or mitigation path is stated for risky changes.
