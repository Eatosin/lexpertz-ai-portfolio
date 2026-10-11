---
title: "Physics-Informed MLOps: Using Z-Scores to Detect Drift Before It Breaks Prod"
summary: "Why I use 2.5σ thresholds instead of arbitrary alert rules. A practical guide to building self-healing monitoring with physics-grounded anomaly detection and automated RAG-powered root cause analysis."
author: "Owadokun Tosin Tobi"
publishedAt: "2026-03-18"
category: "Engineering"
readingTimeMinutes: 8
tags: ["mlops", "monitoring", "statistics"]
---

Most drift alerts are a threshold someone picked in a dashboard and never revisited.
The problem is not the threshold value — it is that a fixed number has no relationship
to the variance of the metric it guards.

## Z-scores instead of constants

A z-score expresses an observation as a distance from the metric's own mean, in
standard deviations:

```text
z = (x - μ) / σ
```

Because both `μ` and `σ` are computed from a rolling window of recent traffic, the
alert adapts. A metric that is normally stable at 40 requests/second and a metric
that swings between 8 and 12 are judged by different yardsticks, which is exactly
what you want.

I set the bar at **2.5σ**. Two standard deviations produces roughly 5% false positives
on normal data — an alert rate engineers learn to ignore. Three is too late for
incidents that compound.

## Distinguishing drift from noise

A single outlier is noise. Drift is a *sustained* shift in the distribution, so the
detector watches the z-score of a rolling median rather than of individual points. That
survives the seasonal spikes that would otherwise page someone every Monday morning.

## Closing the loop

Detection is half the system. Pairing the z-score trigger with a retrieval step over
recent deploys, config changes, and incident notes turns a bare alert into a ranked
list of likely causes — which is the difference between a page and a starting point.
