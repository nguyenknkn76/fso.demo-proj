const textToSpeach = require('@google-cloud/text-to-speech')
const fs = require('fs')
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'smart-setting-431107-r3-fc8a6e45b0a0.json'
const transformTextToSpeach = async (text, outputFile) => {
    try
    {
        const client = new textToSpeach.TextToSpeechClient();

        const request = {
            input: {text},
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            audioConfig: {audioEncoding: 'MP3'}
        };
        const [response] = await client.synthesizeSpeech(request);
        fs.writeFileSync(outputFile,response.audioContent,'binary');
        return outputFile;
    } catch(error)
    {
        console.error('Error:', error);
    }
}
transformTextToSpeach('Hi! My name is Nguyen' , 'output.mp3')
