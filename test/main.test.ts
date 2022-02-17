import VoiceTextApi from '../src/main';
const Api = new VoiceTextApi('testtoken');

test('text empty test', () => {
    expect(() => Api['validate']({ text: '' })).toThrow('"text" is not allowed to be empty');
});

test('test accept params', () => {
    expect(Api['validate']({ text: 'あ', speaker: 'haruka', speed: 400, pitch: 50, volume: 200, format: 'mp3' })).toEqual({ 'format': 'mp3', 'pitch': 50, 'speaker': 'haruka', 'speed': 400, 'text': 'あ', 'volume': 200 });
});
test('test emotion_level', () => {
    expect(() => Api['validate']({ text: 'あ', emotion_level: 2 })).toThrow('"emotion_level" missing required peer "emotion"');
});

test('test defalut values', () => {
    expect(Api['validate']({ text: 'あ' })).toEqual({
        'format': 'wav',
        'pitch': 100,
        'speaker': 'hikari',
        'speed': 100,
        'text': 'あ',
        'volume': 100,
    });
});

test('test speed', () => {
    expect(() => Api['validate']({ text: 'あ', speed: 401 })).toThrow('\"speed\" must be less than or equal to 400');
});
test('test speed', () => {
    expect(() => Api['validate']({ text: 'あ', speed: 49 })).toThrow('\"speed\" must be greater than or equal to 50');
});
test('test pitch', () => {
    expect(() => Api['validate']({ text: 'あ', pitch: 201 })).toThrow('\"pitch\" must be less than or equal to 200');
});
test('test pitch', () => {
    expect(() => Api['validate']({ text: 'あ', pitch: 49 })).toThrow('\"pitch\" must be greater than or equal to 50');
});
test('test volume', () => {
    expect(() => Api['validate']({ text: 'あ', volume: 201 })).toThrow('\"volume\" must be less than or equal to 200');
});
test('test volume', () => {
    expect(() => Api['validate']({ text: 'あ', volume: 49 })).toThrow('\"volume\" must be greater than or equal to 50');
});

test('test getQueryText', () => {
    expect(Api['getQueryText']({ text: 'あ' })).toBe('text=%E3%81%82&speaker=hikari&format=wav&pitch=100&speed=100&volume=100');
});

test('test getRequestUri', () => {
    expect(Api['getRequestUri']({ text: 'あ' })).toBe('https://api.voicetext.jp/v1/tts?text=%E3%81%82&speaker=hikari&format=wav&pitch=100&speed=100&volume=100');
});
