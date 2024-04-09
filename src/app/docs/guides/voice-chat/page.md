---
title: Build voice chat with an LLM on Rails
nextjs:
  metadata:
    title: Build voice chat with an LLM on Rails
    description: Guide on how to build a voice chat application with speech to text, text to speech, and a large language model using the Sublayer gem.
---

## Introduction

In this guide we'll walk through the code for building a simple voice chat
application with speech to text, text to speech, and a large language model
using OpenAI's APIs, GPT-4, and the Sublayer Gem.

You can browse the code for this guide on github: [Rails Voice Chat with LLM](https://github.com/sublayerapp/rails_llm_voice_chat_example)

A detailed video and step by step instructions are coming soon, in the meantime,
we've called out the important parts of the repo above to help you get started
with it.

## Code Walkthrough

### Sublayer Generators

What makes this all work is the use of the Sublayer gem. In particular the
combination of custom Actions and Generators that allow us to easily convert the
audio to text, generate a response, and convert that response back to audio.

For this project we created 2 Actions:
[lib/sublayer/actions/speech_to_text_action.rb](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/lib/sublayer/actions/speech_to_text_action.rb)

```ruby
require "tempfile"

module Sublayer
  module Actions
    class SpeechToTextAction < Base
      def initialize(audio_data)
        @audio_data = audio_data
      end

      def call
        tempfile = Tempfile.new(['audio', '.webm'], encoding: 'ascii-8bit')
        tempfile.write(@audio_data.read)
        tempfile.rewind

        text = HTTParty.post(
          "https://api.openai.com/v1/audio/transcriptions",
          headers: {
            "Authorization" => "Bearer #{ENV["OPENAI_API_KEY"]}",
            "Content-Type" => "multipart/form-data",
          },
          body: {
            file: tempfile,
            model: "whisper-1"
          })

        tempfile.close
        tempfile.unlink

        text["text"]
      end
    end
  end
end
```

[lib/sublayer/actions/text_to_speech_action.rb](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/lib/sublayer/actions/text_to_speech_action.rb)

```ruby
module Sublayer
  module Actions
    class TextToSpeechAction < Base
      def initialize(text)
        @text = text
      end

      def call
        speech = HTTParty.post(
          "https://api.openai.com/v1/audio/speech",
          headers: {
            "Authorization" => "Bearer #{ENV["OPENAI_API_KEY"]}",
            "Content-Type" => "application/json",
          },
          body: {
            "model": "tts-1",
            "input": @text,
            "voice": "nova",
            "response_format": "wav"
          }.to_json
        )

        speech
      end
    end
  end
end
```

and 1 Generator:
[lib/sublayer/generators/conversational_response_generator.rb](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/lib/sublayer/generators/conversational_response_generator.rb)

```ruby
module Sublayer
  module Generators
    class ConversationalResponseGenerator < Base
      llm_output_adapter type: :single_string,
        name: "response_text",
        description: "The response to the latest request from the user"

      def initialize(conversation_context:, latest_request:)
        @conversation_context = conversation_context
        @latest_request = latest_request
      end

      def generate
        super
      end

      def prompt
        <<-PROMPT
          #{@conversational_context}
          #{@latest_request}
        PROMPT
      end
    end
  end
end
```


### Data Model

There are two primary models, `Conversation` and `Message`. A `Conversation` has
many `messages`. A `Message` has an `content` and `role` and belongs to a
`conversation`

[Schema](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/db/schema.rb)

### View

Since this is a simple demo, all the action happens in
[app/views/layouts/application.html.erb](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/app/views/layouts/application.html.erb)
where we have a button that records audio when the button is pressed and
uploads it when the button is released.

```erb
<body>
    <div data-controller="audio-upload" data-audio-upload-conversation-id-value="<%= @conversation.id %>">
        <button data-action="mousedown->audio-upload#startRecording mouseup->audio-upload#stopRecording touchstart->audio-upload#startRecording touchend->audio-upload#stopRecording">
            Press and Hold to Record
        </button>
        <div data-audio-upload-target="status"></div>
        <!-- clear button -->
        <button data-action="click->audio-upload#clearSession">Clear</button
    </div>
</body>
```

### Stimulus Controller

In the
[app/javascript/controllers/audio_upload_controller.js](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/app/javascript/controllers/audio_upload_controller.js)
file we have the Stimulus controller that handles the audio recording,
uploading, and processing the user interactions. The important parts are here in
`connect()` when we set up the media recorder and `uploadAudio()` when we upload
the audio in response to the user releasing the button, and play the audio that
is returned from the backend.

```javascript
connect() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream)
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data)
        }
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' })
          this.uploadAudio(audioBlob)
          this.audioChunks = []
        }
      })
      .catch(error => console.error("Audio recording error:", error))
  }

  uploadAudio(audioBlob) {
    const formData = new FormData()
    formData.append('audio_data', audioBlob)
    formData.append('conversation_id', this.conversationIdValue)

    fetch('/conversation_messages', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Accept': 'application/json',
      },
    })
    .then(response => response.blob())
      .then(audioBlob => {
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audio.play()
        this.statusTarget.textContent = "Playing response..."
      })
    .catch(error => {
      console.error('Error:', error)
      this.statusTarget.textContent = "Upload failed."
    })
  }
```

### ConversationMessagesController

In
[/app/controllers/conversation_messages_controller.rb](https://github.com/sublayerapp/rails_llm_voice_chat_example/blob/93300f268dde359b58c92a60db4b54d128d9d965/app/controllers/conversation_messages_controller.rb)
we have the controller action that does the bulk of the work. It takes in the
audio data from the frontend and loads any previous conversation context. 

Then uses the Sublayer SpeechToTextAction to convert the audio to text using OpenAI's
Speech to Text API.

After that, we pass the user's new text and the previous conversational context
to the Sublayer::Generators::ConversationalResponseGenerator to generate GPT-4
next response in the conversation chain.

Finally, we use the Sublayer TextToSpeechAction to convert the text response to
audio and send it back to the frontend.

```ruby
def create
    conversation = Conversation.find(params[:conversation_id])

    # Convert conversational context to an easy to use format
    conversational_context = conversation.messages.map { |message| {role: message.role, content: message.content} }

    # Convert audio data to text
    text = Sublayer::Actions::SpeechToTextAction.new(params[:audio_data]).call

    # Generate conversational response
    output_text = Sublayer::Generators::ConversationalResponseGenerator.new(
        conversation_context: conversational_context, latest_request: text
    ).generate

    # Convert text to audio data
    speech = Sublayer::Actions::TextToSpeechAction.new(output_text).call

    # Store conversation context for next message
    conversation.messages << Message.new(conversation: conversation, role: "user", content: text)
    conversation.messages << Message.new(conversation: conversation, role: "assistant", content: output_text)

    send_data speech, type: "audio/wav", disposition: "inline"
  end
```

### Coming Soon

We're working on a video and step-by-step instructions on how you could create
this yourself using the Sublayer gem. In the meantime, we'd love to hear from
you and showcase anything you've made off this base! Come chat with us in [Our
Discord](https://discord.gg/pWZ689GW7U)
