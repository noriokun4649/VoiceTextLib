import VoiceTextApi from '../src/main';
const Api = new VoiceTextApi('testtoken');

test('text empty test',() =>{
    expect(() => Api['validate']({text:''})).toThrow('"text" is not allowed to be empty');
});