const Component = require("../../../../structures/base/BaseComponent");

class CancelButton extends Component {
    constructor(client) {
        super(client, {
            name: "cancel",
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

        await this.MentorQ.tickets.cancel(interaction.member, interaction.message);

        interaction.reply({ embeds: [this.MentorQ.util.successEmbed(`[Ticket ${interaction.message.id}](${interaction.message.url}) has been cancelled.`)], ephemeral: true });

        return;

    }
}

module.exports = CancelButton;