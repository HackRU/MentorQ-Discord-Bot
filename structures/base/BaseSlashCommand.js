const { ApplicationCommandType } = require("discord.js");

class SlashCommand {

    /**
     * Data for creating or editing a slash command.
     * @typedef {Object} SlashCommandData
     * @property {string} name The name of the command.
     * @property {string} description The description of the command.
     * @property {ApplicationCommandType} [type] The type of application command (ChatInput for slash commands).
     * @property {import("discord.js").ApplicationCommandOptionData[]} options Options for the command.
     */

    /**
     * @typedef {Object} SlashCommandConfigOptions
     * @property {string} name Name of the command.
     * @property {boolean} guildRequired Whether the command must be used in a guild.
     * @property {string} category Category of the command.
     * @property {number} [cooldown=0] The cooldown for the command.
     * @property {SlashCommandData} commandData The slash command data.
     */

    /**
     * Base slash command constructor.
     * @param {import("../../bot/index.js")} client MentorQ's Discord Client.
     * @param {SlashCommandConfigOptions} commandConfig The slash command help configuration. 
     */
    constructor(client, commandConfig) {
        this.MentorQ = client;

        // ensures commandData is properly formatted to load/register Discord app commands
        commandConfig.commandData.type = ApplicationCommandType.ChatInput;
        commandConfig.commandData.defaultPermission = true;
        commandConfig.commandData.options = commandConfig.commandData.options?.map(o => { return { autocomplete: o.autocomplete, choices: o.choices, options: o.options, channelTypes: o.channelTypes, ...o } }) || [];
        this.config = commandConfig;
    }
}

module.exports = SlashCommand;