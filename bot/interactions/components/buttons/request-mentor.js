const Component = require("../../../../structures/base/BaseComponent");

class RequestMentorButton extends Component {
    constructor(client) {
        super(client, {
            name: "request-mentor",
            category: "general",
        });
    }

    /**
     * 
     * @param {import("discord.js").ButtonInteraction} interaction 
     */
    async run(interaction) {

        if (!this.MentorQ.tickets.isActive(interaction.guild))
            return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed("The MentorQ system is not active. Contact a server admin to complete setup process.")], ephemeral: true });

        const currentTicket = this.MentorQ.tickets.getTicket(interaction.member);
        if (currentTicket) return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed(`You can't request a mentor because you already have an active ticket: ${currentTicket.toString()}`)], ephemeral: true });

        const mentorRequestModal = this.MentorQ.tickets.generateRequestModal();

        interaction.showModal(mentorRequestModal);

        return;

    }
}

module.exports = RequestMentorButton;