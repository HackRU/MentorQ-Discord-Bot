const Component = require("../../../../structures/base/BaseComponent");

class CloseButton extends Component {
    constructor(client) {
        super(client, {
            name: "close",
            category: "mentor",
            cooldown: 5,
        });
    }

    /**
     * @param {import("discord.js").ButtonInteraction} interaction 
     */
    async run(interaction) {

        if (!this.MentorQ.tickets.isActive(interaction.guild))
            return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed("The MentorQ system is not active. Contact a server admin to complete setup process.")], ephemeral: true });

        await this.MentorQ.tickets.close(interaction.member, interaction.message.channel);

        interaction.reply({ embeds: [this.MentorQ.util.successEmbed(`Ticket ${interaction.message.channel.toString()} has been closed.`)] });

        return;

    }
}

module.exports = CloseButton;