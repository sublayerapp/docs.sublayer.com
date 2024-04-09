---
title: Quick Start
---

## Quick start

Sublayer is made up of four main concepts: Generators, Actions, Tasks, and
Agents. You can concepts combine to create powerful AI-powered applications in a
simple and easy to user interface.

---

### Step 1 - Installation

Install the Sublayer gem:

```shell
$ gem install sublayer
```

or add it to your Gemfile:

```ruby
gem "sublayer"
```

### Step 2 - Environment Setup

Set your OpenAI API key as an environment variable:

```shell
export OPENAI_API_KEY="your-api-key"
```

Don't have a key? Visit [OpenAI](https://openai.com/product) to get one.

### Step 3a - Create a Generator

Create a Sublayer Generator. Generators are responsible for taking input from
your application and generating output using an LLM like GPT-4.

Here's an example of a generator that takes a description of code to generate
and the technologies to use and generates code with an llm:

```ruby
module Sublayer
  module Generators
    class CodeFromDescriptionGenerator < Base
        llm_output_adapter type: :single_string,
            name: "generated_code",
            description: "The generated code in the requested language"

        def initialize(description:, technologies:)
            @description = description
            @technologies = technologies
        end

        def generate
            super
        end

        def prompt
            <<-PROMPT
                You are an expert programmer in #{@technologies.join(", ")}.

                You are tasked with writing code using the following technologies: #{@technologies.join(", ")}.

                The description of the task is #{@description}

                Take a deep breath and think step by step before you start coding.
            PROMPT
        end
    end
  end
```

To learn more about everything you can do with a generator, check out the [Generators](/docs/concepts/generators) page.

### Step 3b - Try Generating One!
Try generating your own generator with our interactive code generator below:

{% iframe path="interactive-code-generator" /%}


### Step 4 - Use Your Generator

Require your generator and the Sublayer gem and use it in your application:

```ruby
require 'sublayer'
require './code_from_description_generator'

generator = CodeFromDescriptionGenerator.new(description: 'a function that returns the first 10 happy numbers', technologies: ['ruby'])

puts generator.generate
```

### Next Steps

Now that you've created your first generator, you can:

* Create some [Actions](/docs/concepts/actions) to do something with whatever you've generated
* Browse some [Examples](/docs/guides/overview) to learn how to use the Sublayer gem in different types of projects.
* Join our Discord to chat with us, for support, and to keep up with the latest as we get ready to release [Tasks](/docs/concepts/tasks) and [Agents](/docs/concepts/agents).
