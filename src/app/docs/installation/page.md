---
title: Installation
nextjs:
  metadata:
    title: Installation
    description: Quidem magni aut exercitationem maxime rerum eos.
---

To get started with Sublayer, you need to install it to your system.

```shell
$ gem install sublayer
```

or add it to your gemfile

```ruby
gem "sublayer"
```

---

## Set Up Your Preferred LLM

After installing Sublayer, you can choose between any of the available LLM
providers we support.

### OpenAI (Default)
[More Info]('/docs/providers/openai')

Set your `OPENAI_API_KEY` environment variable. (Visit [OpenAI](https://openai.com/product) to get an API key.)

Usage:

```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::OpenAI
Sublayer.configuration.ai_model = "gpt-4-turbo-preview"
```

### Anthropic
[More Info]('/docs/providers/anthropic')

Supported Models: Claude 3 Opus, Claude 3 Haiku, Claude 3 Sonnet

Set your `ANTHROPIC_API_KEY` environment variable. (Visit [Anthropic](https://anthropic.com/) to get an API key.)

Usage:

```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Claude
Sublayer.configuration.ai_model ="claude-3-opus-20240229"
```

### Google
[More Info]('/docs/providers/google')

Set your `GOOGLE_API_KEY` environment variable. (Visit [Google AI Studio](https://ai.google.dev/) to get an API key.)

Usage:

```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Gemini
Sublayer.configuration.ai_model = "gemini-pro"
```

### Groq
[More Info]('/docs/providers/groq')

Set your `GROQ_API_KEY` environment variable. (Visit [Groq](https://console.groq.com/) to get an API key.)

Usage:

```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Groq
Sublayer.configuration.ai_model = "mixtral-8x7b-32768"
```

### Nous Research (Running locally):
[More Info]('/docs/providers/nous-research')

Follow our [local model set up
instructions]('/docs/guides/running-local-models')

Usage:

```ruby
Sublayer.configuration.ai_provider = Sublayer::Providers::Local
Sublayer.configuration.ai_model = "LLaMA_CPP"
```
