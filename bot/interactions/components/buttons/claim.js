const Component = require("../../../../structures/base/BaseComponent");

class ClaimButton extends Component {
    constructor(client) {
        super(client, {
            name: "claim",
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

        const ticket = await this.MentorQ.tickets.claim(interaction.member, interaction.message);
        if (!ticket) return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed("A ticket could not be created because the member was not found.")], ephemeral: true });

        interaction.reply({ embeds: [this.MentorQ.util.successEmbed(`Ticket ${ticket} has been created.`)], ephemeral: true });

        return;

    }
}

module.exports = ClaimButton;