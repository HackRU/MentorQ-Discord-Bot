const TextCommand = require("../../../structures/base/BaseTextCommand");

class PingCommand extends TextCommand {
    /**
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client, {
            name: "ping",
            category: "general",
            description: "Check the bot and API latency.",
            args: false,
            cooldown: 3,
        });
    }

    /**
     * @param {import("discord.js").Message} message 
     */
    async run(message) {
        const msg = await message.reply("🏓 Pinging...");

        msg.edit({ embeds: [this.MentorQ.util.successEmbed(`💗 WS Heartbeat: ${Math.round(this.MentorQ.ws.ping)}ms\n🏓 API Latency: ${msg.createdTimestamp - message.createdTimestamp}ms`)] });

        return;
    }
}

module.exports = PingCommand;