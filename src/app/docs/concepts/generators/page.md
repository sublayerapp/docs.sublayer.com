---
title: Sublayer Generators
nextjs:
  metadata:
    title: Sublayer Generators
    description: Detailed guide on how to use and build your own Sublayer Generators
---

Generators are responsible for generating specific outputs based on input data.
They focus on a single generation task and do not perform any actions or complex decision-making.
Generators are the building blocks of the Sublayer framework.

## llm\_output\_adapter

Output adapters in Sublayer are powerful components that define the structure
and format of the AI-generated output. They serve as a bridge between the raw AI
responses and the structured data your application expects.

The framework comes with a set of built-in output adapters for common use-cases,
as well as the ability to create custom output adapters for more specialized
ones.

To learn more about creating your own custom output adapters, check out the
[Custom Components: Output Adapters](/docs/custom_components/output_adapters)
page.

The name, description, and structure defined in the output adapter is passed to
the LLM to provide a structure for the output that the generator will produce.
This is useful when building applications that make calls to LLMs so that you
can be sure of the structure of the output that you will receive.

The current built in output adapters are:

### Single String
`:single_string` is used when you just want a
single, specific string back from the LLM. For example, if you want the LLM to
generate a specific piece of code for you, or a description of a piece of code.

**Usage:**

```ruby
llm_output_adapter type: :single_string,
  name: "code_description",
  description: "A description of what the code does, its purpose,functionality, and any noteworthy details"
```

**Examples:**

- [CodeFromDescriptionGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_description_generator.rb): Generates code based on a description and the technologies used.
- [DescriptionFromCodeGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/description_from_code_generator.rb): Generates a description of the code passed in to it.
- [CodeFromBlueprintGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_blueprint_generator.rb): Generates code based on a blueprint, a blueprint description, and a description of the desired code.

### List of Strings
`:list_of_strings` is used when you want the LLM to return you a list of
strings for a specific topic. For example if you want the LLM to generate a list
of keywords from a text, or a list of suggestions for a specific topic.

```ruby
llm_output_adapter type: :list_of_strings,
  name: "suggestions",
  description: "List of keyword suggestions"
```

**Examples:**
- [BlogPostKeywordSuggestionGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/blog_post_keyword_suggestions_generator.rb):
  Generate a list of keyword suggestions for a blog post.

### String Selection From List
`:string_selection_from_list` is used when you want the LLM to select a specific
option from a list that you give it. For example if you give the LLM a comment
from social media and you want to give it a sentiment grade or if you have a
list of options and you want the LLM to select one of them given some user
action.

```ruby
  llm_output_adapter type: :string_selection_from_list,
    name: "sentiment_value",
    description: "A sentiment value from the list",
    options: -> { @sentiment_options }

```

- [SentimentFromTextGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/sentiment_from_text_generator.rb):
  Generate a sentiment value out of the sentiment\_options from a given piece of
text.
- [RouteSelectionFromUserIntentGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/route_selection_from_user_intent_generator.rb):
  Generate a route selection from a list of options based on the users intent

**Examples:##

### Named Strings
`:named_strings` is used when you want to receive an object back with a specific
set of string attributes. For example if you give the LLM a blog post, you can
have it return a twitter blurb, a linkedin blurb, and a short summary of the
post.

```ruby
llm_output_adapter type: :named_strings,
  name: "blog_post_blurbs",
  description: "A set of social media blurbs for the given blog post",
  attributes: [
    { name: "twitter_blurb", description: "A 2 sentence blurb for sharing the blog post on twitter" },
    { name: "linkedin_blurb", description: "A blurb for the blog post for sharing on LinkedIn" },
    { name: "short_description", description: "A short summary of the blog post" }
  ]
```

**Examples:**
- [ProductDescriptionGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/product_description_generator.rb):
  Generate a set of descriptions given some information about a product

## Prompt
This method is required for all generators and is used to define the input that
we'll send to the model. In the examples below we use heredoc syntax for the
whole method, but as long as the method returns a string, you can use any
mechanism you'd like.

**Example:**
```ruby
def prompt
  <<~PROMPT
    Please provide a description of the code you would like to generate.
  PROMPT
end
```

## [Examples](https://github.com/sublayerapp/sublayer/tree/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples)

- [CodeFromDescriptionGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_description_generator.rb): Generates code based on a description and the technologies used.
- [DescriptionFromCodeGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/description_from_code_generator.rb): Generates a description of the code passed in to it.
- [CodeFromBlueprintGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_blueprint_generator.rb): Generates code based on a blueprint, a blueprint description, and a description of the desired code.
- [SentimentFromTextGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/sentiment_from_text_generator.rb):
  Generate a sentiment value out of the sentiment\_options from a given piece of
text.
- [RouteSelectionFromUserIntentGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/route_selection_from_user_intent_generator.rb):
  Generate a route selection from a list of options based on the users intent
- [BlogPostKeywordSuggestionGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/blog_post_keyword_suggestions_generator.rb):
- [ProductDescriptionGenerator](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/spec/generators/examples/product_description_generator.rb):
  Generate a set of descriptions given some information about a product

## Generate your own generator:
{% iframe path="interactive-code-generator/sublayer-generators" /%}

