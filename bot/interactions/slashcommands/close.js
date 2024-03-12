const SlashCommand = require("../../../structures/base/BaseSlashCommand");

class CloseSlashCommand extends SlashCommand {
    constructor(client) {
        super(client, {
            name: "close",
            category: "mentor",
            cooldown: 5,
            guildRequired: true,
            commandData: {
                description: "Close the current ticket.",
            },
        });
    }

    /**
     * @param {import("discord.js").CommandInteraction} interaction 
     */
    async run(interaction) {

        if (!this.MentorQ.tickets.isActive(interaction.guild))
            return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed("The MentorQ system is not active. Contact a server admin to complete setup process.")], ephemeral: true });

        const ticket = interaction.channel;
        if (!ticket.isThread() || ticket.ownerId !== this.MentorQ.user.id || ticket.parentId !== this.MentorQ.tickets.getRequestsChannel()?.id)
            return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed("This is not a valid MentorQ ticket!")], ephemeral: true });

        await this.MentorQ.tickets.close(interaction.member, ticket);

        interaction.reply({ embeds: [this.MentorQ.util.successEmbed(`Ticket ${ticket.toString()} has been closed.`)] });

        return;

    }
}

module.exports = CloseSlashCommand;