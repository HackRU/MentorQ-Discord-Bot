const { EmbedBuilder } = require("discord.js");
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

        const pingEmbed = new EmbedBuilder()
            .setDescription(`💗 WS Heartbeat: ${Math.round(this.MentorQ.ws.ping)}ms\n🏓 API Latency: ${msg.createdTimestamp - message.createdTimestamp}ms`)
            .setColor("Blurple");

        msg.edit({ content: "", embeds: [pingEmbed] });

        return;
    }
}

module.exports = PingCommand;