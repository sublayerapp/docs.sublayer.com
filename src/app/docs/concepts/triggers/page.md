---
title: Sublayer Triggers
nextjs:
  metadata:
    title: Sublayer Triggers
    description: Detailed guide on how to use and build your own Sublayer Triggers
---

A trigger is a activation mechanism in an agent that determines when an agent perform its tasks.
Triggers can respond to various events or conditions (changes in files, time intervals,
or any external inputs) providing flexibility in how and when agents operate.
By defining custom triggers, developers can create agents that react dynamically
or execute tasks on precise schedules.

## Try making your own trigger:
{% iframe path="interactive-code-generator/sublayer-triggers" /%}

## Examples:

- [FileChange](https://github.com/sublayerapp/sublayer/blob/main/lib/sublayer/triggers/file_change.rb): Activate agent when a file has changed.
