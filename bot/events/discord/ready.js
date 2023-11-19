const Event = require("../../../structures/base/BaseEvent");
const { EmbedBuilder } = require("discord.js");

class ReadyEvent extends Event {
    /**
     * ready event constructor.
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client);
    }

    async run() {

        const onlineEmbed = new EmbedBuilder()
            .setTitle("MentorQ is Online")
            .addFields([
                { name: "User", value: `**${this.MentorQ.user.tag}**`, inline: true },
                { name: "Guilds", value: `\`${this.MentorQ.guilds.cache.size}\``, inline: true },
            ])
            .setColor("DarkGreen")
            .setTimestamp();

        this.MentorQ.logs.send({ embeds: [onlineEmbed] });

        return;

    }

}

module.exports = ReadyEvent;