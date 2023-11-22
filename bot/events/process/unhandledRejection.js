const { EmbedBuilder } = require("discord.js");
const Event = require("../../../structures/base/BaseEvent");

class UnhandledRejectionProcessEvent extends Event {
    /**
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client);
    }

    /**
     * @param {Error} error 
     */
    async run(error) {

        console.error("ERROR | " + error.stack);

        const errorEmbed = new EmbedBuilder()
            .setAuthor({ name: "Error: Unhandled Rejection", iconURL: this.MentorQ.user.displayAvatarURL() })
            .setColor("Red")
            .setDescription(error.stack.length < 4000 ? error.stack : error.stack.substring(0, 4000))
            .setFooter({ text: this.MentorQ.user.tag })
            .setTimestamp();

        this.MentorQ.logs.send({ embeds: [errorEmbed] });

        return;

    }

}

module.exports = UnhandledRejectionProcessEvent;