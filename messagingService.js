import axios from "axios";

export default class MessagingService {
    constructor(username, apiUrl) {
        this.username = username;
        this.sentMessages = [];
        this.receivedMessage = [];
        this.apiUrl = apiUrl;
    }

    updateUsername(newUsername) {
        this.username = newUsername;
    }

    async sendMessage(to, message) {
        try {
            const messageId = await axios.post(`${this.apiUrl}/send?to=${to}`, { message });
            this.sentMessages.push(messageId);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}