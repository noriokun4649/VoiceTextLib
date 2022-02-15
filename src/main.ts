import { stringify } from 'querystringify';
import Joi from 'joi';
import fetch from 'node-fetch';

interface VoiceTextApiParams {
    text: string;
    speaker: string;
    format: string;
    emotion: string;
    emotion_level: number;
    pitch: number;
    speed: number;
    volume: number;
}

export default class VoiceTextApi {
    private readonly _hostname = 'api.voicetext.jp';
    private readonly _endpoint = 'v1/tts';
    private readonly _apitoken: string;
    private readonly _schema = Joi.object().keys({
        text: Joi.string().min(1).max(200).required(),
        speaker: Joi.string().valid('hikari', 'haruka', 'takeru', 'santa', 'bear', 'show').default('hikari'),
        format: Joi.string().valid('wav', 'ogg', 'aac').default('ogg'),
        emotion: Joi.string().valid('happiness', 'anger', 'sadness').optional(),
        emotion_level: Joi.number().min(1).max(4).when('emotion', { is: true, then: Joi.number().default(2) }).optional(),
        pitch: Joi.number().min(50).max(200).default(100).optional(),
        speed: Joi.number().min(50).max(400).default(100).optional(),
        volume: Joi.number().min(50).max(200).default(100).optional(),
    })
        .with('emotion_level', 'emotion');

    constructor(token: string) {
        this._apitoken = token;
    }

    private validate(param: VoiceTextApiParams) {
        return Joi.attempt(param, this._schema);
    }

    private getQueryText(param: VoiceTextApiParams) {
        return stringify(this.validate(param))
    }

    private getRequestUri(param: VoiceTextApiParams) {
        return `https://${this._hostname}/${this._endpoint}?${this.getQueryText(param)}`
    }

    private fetch(param: VoiceTextApiParams) {
        return fetch(this.getRequestUri(param), {
            method: 'post',
            headers: {
                Authorization: "Basic " + Buffer.from(`${this._apitoken}:`).toString("base64"),
            }
        });
    }

    async fetchBuffer(param: VoiceTextApiParams) {
        const res = await this.fetch(param);
        const array = await res.arrayBuffer();
        return new Uint8Array(array);
    }

    async stream(param: VoiceTextApiParams) {
        const res = await this.fetch(param);
        return res.body;
    }
}