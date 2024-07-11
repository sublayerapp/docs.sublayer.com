---
title: Sublayer Agents
nextjs:
  metadata:
    title: Sublayer Agents
    description: Detailed guide on how to use and build your own Sublayer Agents
---
 
# Understanding Sublayer Agents

Think of Sublayer Agents as your personal assistants, always ready to help with repetitive tasks or respond to changes in your environment.
These agents can assist with a wide range of activities, from coding to data processing to system monitoring and beyond.
You create an agent by defining four key aspects: what should wake it up (triggers), what it's trying to achieve (goal condition), how it checks its progress (check status), and what it actually does (step).

Triggers could be things like file changes, incoming data, time-based events, or even manual calls while the goal might be completing a data analysis or updating a system.
The agent will keep checking its status and taking steps until it reaches its goal. 
It's like having a tireless helper that knows exactly when to jump in and what to do, making a variety of processes more efficient and responsive to change.
Whether you're automating workflows, monitoring systems, or processing data, Sublayer Agents provide a flexible, event-driven approach to tackling complex and repetitive tasks.

## Writing an Agent

Sublayer Agents are autonomous units of execution designed to perform specific tasks or monitor systems.
They are built on top of the `Sublayer::Agents::Base` class and utilize a Domain Specific Language (DSL) for defining their behavior.

The DSL consists of four primary methods:

- `trigger`: Specifies events that activate the agent (e.g., file changes, time-based events, webhooks, etc.)
- `goal_condition`: Defines the criteria for task completion
- `check_status`: Evaluates the current state of the task
- `step`: Implements the actual logic to be executed

These methods work in concert to create a flexible, event-driven system for automating complex workflows and responding to changes in various environments.

## Try generating your own agent:
{% iframe path="interactive-code-generator/sublayer-agents" /%}

## Examples:

- [RSpecAgent](https://github.com/sublayerapp/sublayer/blob/main/spec/agents/examples/rspec_agent.rb)
  - A Sublayer agent that is triggered any time a test file or an implementation
    file changes with a goal of making the tests pass. When one of the files
change, the status is checked by running the tests. If the tests are failing,
the agent sends the tests and the implementation to an LLM (using a
[Sublayer::Generator](/concepts/generators)) to generate a new implementation
that should pass the tests.

