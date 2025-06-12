## Chatbot project from SuperSimpleDev's React Course

This project is the first project in SuperSimpleDev's React Course. To run:

```bash
npm install
npm run dev
```

I added Gemini to it because I am a real gangsta :smile: This is added in an unsafe way - as part of the frontend instead of the backend. I did this because I wanted to learn how to make calls from langchain.js. Don't worry I won't expose your (or my!) API key :wink:

By default, this app runs using a dump chatbot provided by the supersimpledev package. But if you set **VITE_GOOGLE_API_KEY** environmental variable then you will get to experience the lovely company of Gemini 2.0 Flash Lite.

You can set this by running:

```bash
export VITE_GOOGLE_API_KEY=<you google api key>
```
