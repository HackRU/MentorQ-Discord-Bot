const SlashCommand = require("../../../structures/base/BaseSlashCommand");

class RequestMentorSlashCommand extends SlashCommand {
    constructor(client) {
        super(client, {
            name: "requestmentor",
            category: "general",
            cooldown: 5,
            guildRequired: true,
            commandData: {
                description: "Fill out a form to request a mentor for help!",
            },
        });
    }

    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction 
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

module.exports = RequestMentorSlashCommand;