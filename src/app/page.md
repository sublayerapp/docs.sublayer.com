---
title: Quick Start
---

Sublayer is a model-agnostic Ruby Generative AI DSL and framework to effortlessly integrate generative AI into your applications. {% .lead %}

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Step-by-step guides to setting up your system and installing the library." /%}

{% quick-link title="Framework guide" icon="presets" href="/#framework-guide" description="Learn about sublayer concepts and conventions." /%}

{% quick-link title="API reference" icon="theming" href="/" description="Learn to easily customize and modify your app's visual design to fit your brand." /%}

{% /quick-links %}

Sublayer is a cutting-edge, model-agnostic Ruby Generative AI framework to revolutionize the way AI-powered applications are built in Ruby. Sublayer provides base classes for Generators, Actions, Tasks, and Agents, Sublayer empowers developers to seamlessly integrate AI functionalities into their applications.

---

## Quick start

Sublayer simplifies the process of integrating generative AI into your Ruby applications, allowing you to focus on building innovative features. We'll take you through the basics of Sublayer, showing you how to leverage our framework to enhance your applications with AI.

### Installation {% #installation %}

To get started with Sublayer, you need to install it on your system.

```shell
$ bundle
$ gem build sublayer.gemspec
$ gem install sublayer-0.0.1.gem
```

### Configuring the LLM model

After installing Sublayer, you can configure it to the llm of your choosing. Here are the configuration examples:


#### OpenAI (Default):

Set your `OPENAI_API_KEY` environment variable. (Visit [OpenAI](https://openai.com/product) to get an API key.)

Usage:
```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::OpenAI
Sublayer.configuration.ai_model = "gpt-4-turbo-preview"
```

#### Gemini:

Set your `GEMINI_API_KEY` environment variable. (Visit [Google AI Studio](https://ai.google.dev/) to get an API key.)

Usage:
```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Gemini
Sublayer.configuration.ai_model = "gemini-pro"
```

#### Claude:

Set your `ANTHROPIC_API_KEY` environment variable. (Visit [Anthropic](https://anthropic.com/) to get an API key.)

Usage:
```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Claude
Sublayer.configuration.ai_model ="claude-3-opus-20240229"
```

#### Groq:

Set your `GROQ_API_KEY` environment variable. (Visit [Groq](https://console.groq.com/) to get an API key.)

Usage:
```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Groq
Sublayer.configuration.ai_model = "mixtral-8x7b-32768"
```

#### Hermes2 (Local):

for [Hermes 2 Mistral Model](https://huggingface.co/NousResearch/Hermes-2-Pro-Mistral-7B-GGUF)

1. Download [llamafile](https://github.com/Mozilla-Ocho/llamafile)
2. Download one of the server llamafiles they provide.
3. Run your local model and serve the API on https://localhost:8080


Usage:
```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Local
Sublayer.configuration.ai_model = "LLaMA_CPP"
```

These configuration snippets demonstrate how to configure sublayer for a specific AI model. You can choose a variety of AI models, both public and local, to power your application.

{% callout title="You should know!" %}
Some model versions are _not free_.

When getting your API keys make sure to check the pricing of the model & version you want to use.
{% /callout %}

---

## Framework Guide {% #framework-guide %}

Using Generators, Actions, Tasks, and Agents

### Generators

Generators are responsible for generating specific outputs based on input data. They focus on a single generation task and do not perform any actions or complex decision-making. Generators are the building blocks of the Sublayer framework.

#### [Examples](https://github.com/sublayerapp/sublayer/tree/main/examples):

- [CodeFromDescriptionGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_description_generator.rb): Generates code based on a description and the technologies used.
- [DescriptionFromCodeGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/description_from_code_generator.rb): Generates a description of the code passed in to it.
- [CodeFromBlueprintGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_blueprint_generator.rb): Generates code based on a blueprint, a blueprint description, and a description of the desired code.

#### Try making your own generator:
{% iframe path="interactive-code-generator" /%}

### Actions

Actions are responsible for performing specific operations to get inputs for a Generator or based on the generated output from a Generator. They encapsulate a single action and do not involve complex decision-making. Actions are the executable units that bring the generated inputs to life.

#### Examples:

- SaveToFileAction: Saves generated output to a file.
- RunCommandLineCommandAction: Runs a generated command line command.

### Tasks

Tasks combine Generators and Actions to accomplish a specific goal. They involve a sequence of generation and action steps that may include basic decision-making and flow control. Tasks are the high-level building blocks that define the desired outcome.

#### Examples:

- ModifyFileContentsTask: Generates new file contents based on the existing contents and a set of rules, and then saves the new contents to the file.

### Agents

Agents are high-level entities that coordinate and orchestrate multiple Tasks to achieve a broader goal. They involve complex decision-making, monitoring, and adaptation based on the outcomes of the Tasks. Agents are the intelligent supervisors that manage the overall workflow.

#### Examples:

- CustomerSupportAgent: Handles customer support inquiries by using various Tasks such as understanding the customer's issue, generating appropriate responses, and performing actions like sending emails or creating support tickets.

---

### Join the community

[discord](https://discord.gg/WuefYXr3z8)
