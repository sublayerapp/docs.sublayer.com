---
title: Build a Custom Trigger
nextjs:
  metadata:
    title: Build a Custom Trigger
    description: Guide on how to Build a Custom Trigger for a Sublayer Agent.
---

<!-- {% video-embed src="https://www.youtube.com/embed/L0kTksoFaVM?si=Ltk41LtlNflobV8R" /%} -->

Let's make a simple time interval trigger for a hello world sublayer agent
* ```bash
  # bash
  mkdir hello_world_agent
  cd hello_world_agent
  touch Gemfile
  touch hello_world_agent.rb
  touch time_interval.rb
  ```
* ```ruby
  # Gemfile
  source 'https://rubygems.org'
  gem 'sublayer', '~>0.1'
  ```
* ```bash
  # bash
  bundle install
  ```
* Build a sublayer generator with the following description:
    * "A Time Interval Trigger that takes an integer for seconds to wait"
    {% iframe path="interactive-code-generator/sublayer-triggers" example="false" /%}

* Paste the result from above into `time_interval.rb` (rename and adjust arguments if needed)
* Write the following code in `hello_world_agent.rb`:
  ```ruby
  # hello_world_agent.rb
  require "sublayer"
  require "./time_interval.rb"

  class HelloWorldAgent < Sublayer::Agents::Base
    trigger TimeInterval.new(2)

    goal_condition { false }

    check_status {}

    step do
      puts "hello world"
    end
  end

  HelloWorldAgent.new.run
  ```
  Adjust the name of the TimeInterval class and the arguments as needed!

* Run your code:
  ```bash
  ruby hello_world_agent.rb
  ```
