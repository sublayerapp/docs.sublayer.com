---
title: Custom Output Adapters
nextjs:
  metadata:
    title: Sublayer Custom Output Adapters
    description: Detailed information on what goes into building a custom output adapter
---

## Introduction to Output Adapters

Output adapters in Sublayer are powerful components that define the structure
and format of the AI-generated output. They serve as a bridge between the raw AI
responses and the structured data your application expects.

### The Output Adapter Interface

To create an output adapter in Sublayer, you need to implement the following
interface:

**Required Properties**
- `name`: A string that provides a name for the high level information you're
  expecting to receive from the LLM
- `description`: A string that elaborates on what that name represents. This is
  also sent to the LLM to provide more context on what you're expecting to
receive

**Required Methods**
- `initialize`: A method that initializes the output adapter with at least the
  name and description properties.
- `properties`: A method that returns a single element array of `OpenStruct`
  objects representing the properties of the output. Each element needs at least
a `name`, `description`, and `type` property and follows JSON spec. This is used
for defining the function call in the LLM.

**Optional Methods**
- `load_instance_data(generator)`: A method to loads the instance data from
  the generator in order to be used in the output adapter. This is useful for
times when you might want to pass data into a generator that would be used in
the output adapter. For example cases where you want to pass in a list of items
for an LLM to select from. Used in the `StringSelectionFromList` output adapter
linked below.

- `materialize_result(raw_result)`: A method that receives the raw results from
  the LLM and returns a transformation of it. This is useful when you want to
coerce the results into a specific type, or instantiate an object with the
properties you receive from the LLM. Used in the `NamedStrings` output adapter
linked below.

### Using Your Custom Output Adapter
For custom output adapters, you can pass the class directly into the
`llm_output_adapter` method in the Generator like so:

```ruby
class MyGenerator < Sublayer::Generators::Base
  llm_output_adapter class: MyOutputAdapter,
    name: "My Output Adapter",
    description: "This is a custom output adapter that does something special",
    custom_attribute: "This is a custom attribute that is passed to the output adapter"

# ... rest of the generator code
end
```

### Examples
Below are links to the built in output adapters in Sublayer and are fully tested
against example generators. You can use these as a reference when building your
own output adapters.

- [Single String](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/lib/sublayer/components/output_adapters/single_string.rb)
- [List of Strings](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/lib/sublayer/components/output_adapters/list_of_strings.rb)
- [String Selection from List](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/lib/sublayer/components/output_adapters/string_selection_from_list.rb)
- [Named Strings](https://github.com/sublayerapp/sublayer/blob/e57d4e44117cec6e6c0f750d53b499df7bc66ca1/lib/sublayer/components/output_adapters/named_strings.rb)

