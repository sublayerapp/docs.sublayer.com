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

## Try making your own generator:
{% iframe path="interactive-code-generator/sublayer-generators" /%}

## [Examples](https://github.com/sublayerapp/sublayer/tree/main/examples):

- [CodeFromDescriptionGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_description_generator.rb): Generates code based on a description and the technologies used.
- [DescriptionFromCodeGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/description_from_code_generator.rb): Generates a description of the code passed in to it.
- [CodeFromBlueprintGenerator](https://github.com/sublayerapp/sublayer/blob/main/examples/code_from_blueprint_generator.rb): Generates code based on a blueprint, a blueprint description, and a description of the desired code.
