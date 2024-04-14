---
title: Build an LLM TDD Bot with Sublayer
nextjs:
  metadata:
    title: Build an LLM TDD Bot with Sublayer
    description: Guide on how to build your own bot to do test driven development with an LLM writing code to pass your tests
---

## Introduction

In this guide, we'll walk through step by step on how to create a bot with the
Sublayer gem that takes your tests, any failures of those tests, and gets an LLM
to write code to pass those tests.

If you'd like to follow along on the guide and with the video you can grab the
code here on the "starting\_point" branch: [TDD Bot](https://github.com/sublayerapp/tddbot/tree/starting_point)

The final code for this guide is available on the "main" branch: [TDD
Bot](https://github.com/sublayerapp/tddbot)

{% video-embed src="https://www.loom.com/embed/c9a41f43e18c4d40ae23034620149a1a?sid=bcc8bc66-c639-4081-a51a-b83c8fb8d81a" /%}

## Step 0 - The MakeTestsPass Command and includes

We're using Shopify's `cli-kit` for this tutorial, and the main entry point for this program is the MakeTestsPass command.

The file is located at
[lib/tddbot/commands/make_tests_pass.rb](https://github.com/sublayerapp/tddbot/blob/43297c5da9445bd6c8882d5e3876cff5fc6b2650/lib/tddbot/commands/make_tests_pass.rb)

```ruby
require 'tddbot'

module Tddbot
  module Commands
    class MakeTestsPass < Tddbot::Command
      def call(_args, _name)
        Sublayer::Tasks::MakeRspecTestsPassTask.new(implementation_file_path: _args[0], test_command: _args[1]).run
      end

      def self.help
        "Have an LLM continually modify the implementation file until the test command passes successfully.\n
        Usage: {{command:#{Tddbot::TOOL_NAME} make_tests_pass <implementation_file_path> \"<test_command>\"}}\n
        Example: {{command:#{Tddbot::TOOL_NAME} make_tests_pass lib/my_class.rb \"rspec spec/my_class_spec.rb\"}}"
      end
    end
  end
end
```

We've also included the folders and libraries needed in
[/lib/tddbot.rb](https://github.com/sublayerapp/tddbot/blob/43297c5da9445bd6c8882d5e3876cff5fc6b2650/lib/tddbot.rb)

Most importantly in lines 3 and 4:
```ruby
require 'sublayer'
require 'open3'
```

and lines 16-20
```ruby
 ['generators', 'tasks', 'actions'].each do |subfolder|
    Dir[File.join(ROOT, 'lib', 'tddbot', 'sublayer', subfolder, '*.rb')].each do |file|
      require file
    end
  end
```


## Step 1 - MakeRspecTestsPassTask

The first step is to create the Sublayer Task that's used in the MakeTestsPass
command. It takes the `implementation\_file\_path` and the `test\_command` which
correspond to the first and second arguments to the command line command.

What we do is perform a loop of:
1. check if the tests pass
2. if they do, we're done
3. If they aren't, generate a new implementation to try to pass the tests
4. Save that new implementation to the file
5. Go back to step 1

This code is located at [/lib/tddbot/sublayer/tasks/make\_rspec\_tests\_pass\_task.rb](https://github.com/sublayerapp/tddbot/blob/main/lib/tddbot/sublayer/tasks/make_rspec_tests_pass_task.rb)

```ruby
module Sublayer
  module Tasks
    class MakeRspecTestsPassTask < Base
      def initialize(implementation_file_path:, test_command:)
        @implementation_file_path = implementation_file_path
        @test_command = test_command
      end

      def run
        loop do
          stdout, stderr, status = Sublayer::Actions::RunTestCommandAction.new(test_command: @test_command).call

          puts stdout
          puts stderr

          if status.exitstatus == 0
            puts "All tests pass!"
            return
          end

          modified_implementation = Sublayer::Generators::ModifiedImplementationToPassTestsGenerator.new(
            implementation_file_contents: File.read(@implementation_file_path),
            test_file_contents: File.read(@test_command.split(" ")[1]),
            test_output: stdout
          ).generate

          Sublayer::Actions::WriteFileAction.new(
            file_contents: modified_implementation,
            file_path: @implementation_file_path
          ).call
        end
      end
    end
  end
end
```

## Step 2 - The Actions

The task uses two different Sublayer actions that we need to create: `RunTestCommandAction` and `WriteFileAction`.

[lib/tddbot/sublayer/actions/run_test_command_action.rb](https://github.com/sublayerapp/tddbot/blob/main/lib/tddbot/sublayer/actions/run_test_command_action.rb)
```ruby
module Sublayer
  module Actions
    class RunTestCommandAction < Base
      def initialize(test_command:)
        @test_command = test_command
      end

      def call
        stdout, stderr, status = Open3.capture3(@test_command)
        [stdout, stderr, status]
      end
    end
  end
end
```

[lib/tddbot/sublayer/actions/write_file_action.rb](https://github.com/sublayerapp/tddbot/blob/main/lib/tddbot/sublayer/actions/write_file_action.rb)
```ruby
module Sublayer
  module Actions
    class WriteFileAction < Base
      def initialize(file_contents:, file_path:)
        @file_contents = file_contents
        @file_path = file_path
      end

      def call
        File.open(@file_path, 'wb') do |file|
          file.write(@file_contents)
        end
      end
    end
  end
end
```

## Step 3 - The Generator

Finally, we need to take the output of the test run, the test code, and the
implementation file and generate the new code to try to pass the tests.

That's accomplished with this generator below:

[lib/tddbot/sublayer/generators/modified_implementation_to_pass_tests_generator.rb](https://github.com/sublayerapp/tddbot/blob/main/lib/tddbot/sublayer/generators/modified_implementation_to_pass_tests_generator.rb)

```ruby
module Sublayer
  module Generators
    class ModifiedImplementationToPassTestsGenerator < Base
      llm_output_adapter type: :single_string,
        name: "modified_implementation",
        description: "The modified implementation that will pass the tests"

      def initialize(implementation_file_contents:, test_file_contents:, test_output:)
        @implementation_file_contents = implementation_file_contents
        @test_file_contents = test_file_contents
        @test_output = test_output
      end

      def generate
        super
      end

      def prompt
        <<-PROMPT
        You are an expert in debugging and test resolution.

        You have the current implementation, the tests, and the latest failure information at your disposal.

        Your task is to modify the existing implementation using the implementation file content: #{@implementation_file_contents},
        the test file content: #{@test_file_contents},
        and the latest test output: #{@test_output},
        to ensure that the tests will pass.

        Approach this task with careful analysis and methodical thinking.
        PROMPT
      end
    end
  end
end
```

## Step 4 - Run the bot!

After all this you should be where we are in the video when we run the bot.

The only thing to do now is to install the gem you've created and try to run the
bot:
```shell
$ bundle install
$ gem build tddbot.gemspec
$ gem install ./tddbot-0.0.1.gem
$ tddbot make_tests_pass {YOUR IMPLEMENTATION FILE} {YOUR TEST COMMAND}
```
