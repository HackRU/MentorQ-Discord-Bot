const Component = require("../../../../structures/base/BaseComponent");

class MentorRequestModal extends Component {
    constructor(client) {
        super(client, {
            name: "mentor-request-form",
            category: "general",
        });
    }

    /**
     * 
     * @param {import("discord.js").ModalSubmitInteraction} interaction 
     */
    async run(interaction) {

        try {
            await this.MentorQ.tickets.create(interaction.member, {
                name: interaction.fields.getTextInputValue("name-input"),
                team: interaction.fields.getTextInputValue("team-input"),
                title: interaction.fields.getTextInputValue("title-input"),
                language: interaction.fields.getTextInputValue("lang-input"),
                techStack: interaction.fields.getTextInputValue("tech-stack-input"),
                description: interaction.fields.getTextInputValue("desc-input"),
            });

            interaction.reply({ embeds: [this.MentorQ.util.successEmbed("Your mentor request has been submitted to the queue. You will receive a notification when a mentor reviews it.")], ephemeral: true });
        } catch (err) {
            interaction.reply({ embeds: [this.MentorQ.util.errorEmbed(err.message)], ephemeral: true });
        }

    }
}

module.exports = MentorRequestModal;