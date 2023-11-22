const { Client, Collection, WebhookClient } = require("discord.js");

require("dotenv").config();

class MentorQClient extends Client {
    constructor() {
        super({
            intents: ["Guilds", "GuildMembers", "GuildMessages", "DirectMessages", "MessageContent"],
            // sweeps messages, members, & users from the cache in intervals of 30min after a lifetime of 10min for memory optimization
            sweepers: {
                messages: {
                    interval: 1800,
                    lifetime: 600,
                },
                guildMembers: {
                    interval: 1800,
                    filter: () => mem => (mem.user.bot && mem.user.id !== this.user.id) || !mem.user.cacheTime || (Date.now() - mem.user.cacheTime) >= 600000,
                },
                users: {
                    interval: 1800,
                    filter: () => user => (user.bot && user.id !== this.user.id) || !user.cacheTime || (Date.now() - user.cacheTime) >= 600000,
                },
            },
        });

        this.config = require("../config.json");

        /**
         * @type {Collection<string, import("../structures/base/BaseTextCommand")>}
         */
        this.commands = new Collection();
        /**
         * @type {Collection<string, import("../structures/base/BaseSlashCommand")>}
         */
        this.slashCommands = new Collection();
        /**
         * @type {Collection<string, import("../structures/base/BaseComponent")>}
         */
        this.components = new Collection();

        // stores command cooldowns data
        this.cooldowns = new Collection();

        // webhook for bot logs
        this.logs = new WebhookClient({ url: this.config.logsWebhook });

        // initialize managers
        /**
         * @type {import("../managers/TicketsManager")}
         */
        this.tickets = (require("../managers/TicketsManager"))(this);
        /**
         * @type {import("../managers/UtilManager")}
         */
        this.util = (require("../managers/UtilManager"))(this);

    }

    init() {
        this.login(process.env.TOKEN);

        // load and register interactions and events
        new (require("../structures/handlers/interactions"))(this);
        new (require("../structures/handlers/events"))(this);
    }

}

const MentorQ = new MentorQClient();
MentorQ.init();
module.exports = MentorQ;