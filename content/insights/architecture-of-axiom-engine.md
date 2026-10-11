---
title: "The Architecture of Axiom Engine: Building a Zero-Hallucination RAG Pipeline"
summary: "A deep dive into the 4-node LangGraph circuit powering Axiom Engine V4 — how the Librarian, Editor, Architect, and Prosecutor nodes collaborate to achieve 99.9% verifiable output with adversarial self-correction."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-06-10"
category: "Engineering"
readingTimeMinutes: 12
tags: ["rag", "langgraph", "agents", "evaluation"]
---

A retrieval system that cites a source the client never provided is worse than one
that admits it does not know. Axiom Engine V4 is built around a single rule: no claim
leaves the graph without a citation that was independently re-fetched.

## The four-node circuit

The pipeline is a LangGraph state machine with four roles, each with a narrow
contract:

- **Librarian** — expands the query, retrieves candidates, and attaches a source
  identifier to every chunk it returns.
- **Editor** — compresses retrieved material into a working set, discarding
  anything that does not answer part of the question.
- **Architect** — plans the answer shape before any prose is generated, so the
  model fills slots rather than free-associating.
- **Prosecutor** — attempts to refute each claim against its cited source.

## Why a prosecutor node

Most RAG pipelines stop after generation. Adding an adversarial verifier that is
explicitly trying to *disprove* the answer catches a failure mode that
self-consistency checks miss: fluent, well-formed, confidently wrong synthesis.

The circuit runs up to three correction passes. Claims that survive all passes carry
the verified 99.9% figure; anything that cannot be verified is dropped rather than
hedged, because a silent omission is cheaper for the reader than a fabricated
citation.

## What this costs

Latency. A four-node circuit with up to three verification passes is several times
slower than a single generation call. For the enterprise engagements where this
matters, that trade is correct — an unverifiable answer to a compliance question is
not a deliverable.
