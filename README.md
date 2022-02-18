# VoiceTextAPI
Converts text to speech using the [VoiceText Web API](https://cloud.voicetext.jp/webapi/docs/api).

# How to use
## Install
```
yarn add voicetextlib
```

## Usage
### ```stream(param = {})``` -> ```Promise<NodeJS.ReadableStream>```
```ts
import VoiceTextApi from 'voicetextlib';
import fs from 'node:fs';

const voice = new VoiceTextApi('API TOKEN');
voice.stream({text:'読み上げたイオン性です',format:'wav',speaker:'haruka',speed:50})
.then((body) => body.pipe(fs.createWriteStream('test.wav')));
```
### ```fetchBuffer(param = {})``` -> ```Promise<Uint8Array>```
```ts
import VoiceTextApi from 'voicetextlib';
import fs from 'node:fs';

const voice = new VoiceTextApi('API TOKEN');
voice.fetchBuffer({text:'読み上げたイオン性です',format:'wav',speaker:'haruka',speed:50})
.then((body) => fs.writeFileSync('tes3t.wav',body));
```

## Build
```
yarn run build
```

# Special Thanks
This project has been strongly influenced by the following projects.
- [59naga/voice-text](https://github.com/59naga/voice-text)
