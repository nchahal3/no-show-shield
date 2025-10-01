"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TwilioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const common_1 = require("@nestjs/common");
const twilio_1 = require("twilio");
const constants_1 = require("../common/constants");
let TwilioService = TwilioService_1 = class TwilioService {
    constructor() {
        this.logger = new common_1.Logger(TwilioService_1.name);
        const credentialsConfigured = !!constants_1.TWILIO_ACCOUNT_SID &&
            !!constants_1.TWILIO_AUTH_TOKEN &&
            !constants_1.TWILIO_ACCOUNT_SID.startsWith('your_') &&
            !constants_1.TWILIO_AUTH_TOKEN.startsWith('your_');
        if (credentialsConfigured) {
            this.client = new twilio_1.Twilio(constants_1.TWILIO_ACCOUNT_SID, constants_1.TWILIO_AUTH_TOKEN);
        }
        else {
            this.logger.warn('Twilio credentials are not configured; SMS notifications are disabled.');
            this.client = null;
        }
    }
    async sendSms(to, body) {
        if (!this.client) {
            this.logger.debug(`SMS to ${to} skipped: Twilio not configured.`);
            return;
        }
        try {
            await this.client.messages.create({
                to,
                from: constants_1.TWILIO_PHONE_NUMBER,
                body,
            });
        }
        catch (error) {
            const err = error;
            this.logger.error('Failed to send SMS', err.stack);
            throw new Error('SMS sending failed');
        }
    }
};
exports.TwilioService = TwilioService;
exports.TwilioService = TwilioService = TwilioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TwilioService);
