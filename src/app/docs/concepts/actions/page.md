---
title: Sublayer Actions
nextjs:
  metadata:
    title: Sublayer Actions
    description: Detailed guide on how to use and build your own Sublayer Actions
---

Actions are responsible for performing specific operations to get inputs for a Generator or based on the generated output from a Generator.
They encapsulate a single action and do not involve complex decision-making. Actions are the executable units that bring the generated inputs and output to life.

## Try making your own Action:

{% iframe path="interactive-code-generator/sublayer-actions" /%}

## Examples:

- [WriteFileAction](https://github.com/sublayerapp/tddbot/blob/43297c5da9445bd6c8882d5e3876cff5fc6b2650/lib/tddbot/sublayer/actions/write_file_action.rb): Writes text to a specified file.
- [RunTestCommandAction](https://github.com/sublayerapp/tddbot/blob/43297c5da9445bd6c8882d5e3876cff5fc6b2650/lib/tddbot/sublayer/actions/run_test_command_action.rb): Runs a test command on the command line returning the output.
- [SpeechToTextAction](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/lib/sublayer/actions/speech_to_text_action.rb): Makes an API call to OpenAI's SpeechToText endpoint with audio data and returns text.
- [TextToSpeechAction](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/lib/sublayer/actions/text_to_speech_action.rb): Makes an API call to OpenAI's Speech Synthesis endpoint with text and returns audio data

