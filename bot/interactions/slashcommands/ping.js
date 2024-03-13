const { EmbedBuilder } = require("discord.js");
const SlashCommand = require("../../../structures/base/BaseSlashCommand");

class PingCommand extends SlashCommand {
    /**
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client, {
            name: "ping",
            category: "general",
            guildRequired: false,
            cooldown: 3,
            commandData: {
                description: "Check the bot and API latency.",
            },
        });
    }

    /**
     * @param {import("discord.js").CommandInteraction} interaction 
     */
    async run(interaction) {
        const msg = await interaction.reply({ content: "🏓 Pinging...", fetchReply: true });

        const pingEmbed = new EmbedBuilder()
            .setDescription(`💗 WS Heartbeat: ${Math.round(this.MentorQ.ws.ping)}ms\n🏓 API Latency: ${msg.createdTimestamp - interaction.createdTimestamp}ms`)
            .setColor("Blurple");

        interaction.editReply({ content: "", embeds: [pingEmbed] });

        return;
    }
}

module.exports = PingCommand;