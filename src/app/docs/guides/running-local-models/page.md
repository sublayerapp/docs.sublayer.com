---
title: Run LLM Models Locally
nextjs:
  metadata:
    title: Run LLM Models Locally
    description: Guide on how to set up local models to work with Sublayer.
---

1. [Install Llamfile](#install-llamafile)
2. [Download the model](#download-the-model)
3. [Run the model with Llamafile](#run-the-model)
4. [Use with Sublayer](#use-with-sublayer)
5. [Basic Demo](#basic-demo)

## Install [Llamafile](https://github.com/Mozilla-Ocho/llamafile) {% #install-llamafile %}
1. ```bash
   git clone git@github.com:Mozilla-Ocho/llamafile.git
   ```
2. [Click to download make](https://cosmo.zip/pub/cosmos/bin/make)
3. ```bash
   chmod +x /path/to/make
   path/to/make -j8
   sudo path/to/make install PREFIX=/usr/local
   ```

## Download the [model](https://huggingface.co/models) {% #download-the-model %}
* Click below to download the recommended Model:
    * [Meta Llama3](https://huggingface.co/QuantFactory/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct.Q5_K_M.gguf?download=true) [recommended]
    * [Hermes 2 Pro Mistral 7B](https://huggingface.co/NousResearch/Hermes-2-Pro-Mistral-7B-GGUF/resolve/main/Hermes-2-Pro-Mistral-7B.gguf?download=true)
* To find your own model: go to [Hugging Face](https://huggingface.co/models)

## Run the model {% #run-the-model %}
* ```bash
  llamafile -ngl 9999 -m path/to/model.gguf —host 0.0.0.0 -c 2048
  ```
* Recommended settings for Apple M1 users:
  ```bash
  llamafile -ngl 9999 -m path/to/model.gguf --host 0.0.0.0 -c 2048 --gpu APPLE -t 12
  ```
* visit [localhost:8080](http://localhost:8080)


## Use with Sublayer (skip to [Basic Demo](#basic-demo) if you don't have a project) {% #use-with-sublayer %}
1. Add to Gemfile:
    ```ruby
    gem 'sublayer'
    ```
2. Run:
    ```bash
    bundle install
    ```
3. Add to your configuration file:
    ```ruby
    Sublayer.configuration.ai_provider = Sublayer::Providers::Local
    Sublayer.configuration.ai_model = "LLaMA_CPP"
    ```
4. Build a sublayer generator:
    {% iframe path="interactive-code-generator" /%}

5. Use in your code:
    ```ruby
    MyGenerator.new(attributes).generate
    ```

## Basic Demo {% #basic-demo %}
Let's make a ruby project to find a past historical event on today's date
* ```bash
  # bash
  mkdir historical_event_finder
  cd historical_event_finder
  touch Gemfile
  touch historical_event_finder.rb
  ```
* ```ruby
  # Gemfile
  source 'https://rubygems.org'
  gem 'sublayer'
  ```
* ```bash
  # bash
  bundle install
  ```
* Build a sublayer generator with the following description:
    * "generator that uses Time.now and finds a significant historical event from the past that occurred on the same month/day"
    {% iframe path="interactive-code-generator" example="false" /%}
* Paste the result from above into `historical_event_generator.rb` (rename if needed)
* Write the following code in `historical_event_finder.rb`:
  ```ruby
  # historical_event_finder.rb
  require 'sublayer'
  require_relative 'historical_event_generator'

  HistoricalEventGenerator.new.generate
  ```
* run your code:
  ```bash
  ruby historical_event_finder.rb
  ```
