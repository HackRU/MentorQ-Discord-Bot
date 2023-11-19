class TextCommand {
    /**
     * @typedef {Object} CommandConfigOptions
     * @property {string} name Name of the command.
     * @property {string} category Category of the command.
     * @property {string} description The description for the command.
     * @property {string|string[]} usage The usage of the command.
     * @property {string|string[]} example The example usage of the command.
     * @property {{name: string; description: string;}[]} [subcommands] The subcommands and their respective descriptions, if any.
     * @property {boolean} args Whether the command requires args.
     * @property {number} [cooldown=0] The cooldown for the command.
     */

    /**
     * Base command constructor.
     * @param {import("../../bot/index")} client MentorQ's Discord Client.
     * @param {CommandConfigOptions} commandConfig The command help configuration. 
     */
    constructor(client, commandConfig) {
        this.MentorQ = client;
        this.config = commandConfig;
    }
}

module.exports = TextCommand;