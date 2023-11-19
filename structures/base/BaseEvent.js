class Event {

    /**
     * Base event constructor.
     * @param {import("../../bot/index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        this.MentorQ = client;
    }
}

module.exports = Event;