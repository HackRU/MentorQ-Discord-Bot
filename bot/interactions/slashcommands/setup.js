const SlashCommand = require("../../../structures/base/BaseSlashCommand");

class SetupSlashCommand extends SlashCommand {
    constructor(client) {
        super(client, {
            name: "setup",
            category: "admin",
            cooldown: 5,
            guildRequired: true,
            commandData: {
                description: "Automatically set up the channels and roles for the MentorQ system.",
            },
        });
    }

    /**
     * @param {import("discord.js").CommandInteraction} interaction 
     */
    async run(interaction) {

        if (this.MentorQ.tickets.isActive(interaction.guild))
            return interaction.reply({ embeds: [this.MentorQ.util.errorEmbed("The MentorQ system is already active.")] });

        await interaction.deferReply();

        try {
            await this.MentorQ.tickets.setup(interaction.guild);
            interaction.editReply({ embeds: [this.MentorQ.util.successEmbed("The MentorQ system has been set up successfully! Feel free to manually re-order channels/roles or make modifications. Do **NOT** change the names.")] });
        } catch (err) {
            interaction.editReply({ embeds: [this.MentorQ.util.errorEmbed("An error occurred during the setup process: " + err.message)] });
        }

        return;

    }
}

module.exports = SetupSlashCommand;