import React, { useState, useEffect } from 'react'
import axios from 'axios'

const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient();

const [result] = await client.listVoices({});
const voices = result.voices;

console.log('Voices:');

voices.forEach(voice => {
  console.log(`Name: ${voice.name}`);
  console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
  console.log(`  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
  console.log('  Supported languages:');
  voice.languageCodes.forEach(languageCode => {
    console.log(`    ${languageCode}`);
  });
});

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])
  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

//   const url = 'https://notes2023.fly.dev/api/notes'
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>

      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App