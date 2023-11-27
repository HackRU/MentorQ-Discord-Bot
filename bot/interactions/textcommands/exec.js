const { ChildProcess } = require("child_process");
const TextCommand = require("../../../structures/base/BaseTextCommand");
const { EmbedBuilder } = require("discord.js");

class ExecCommand extends TextCommand {
    /**
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client, {
            name: "exec",
            category: "dev",
            description: "Run commands in the terminal.",
            args: true,
        });
    }

    /**
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns
     */
    async run(message, args) {

        const hrStart = process.hrtime();

        ChildProcess.exec(args.join(" "), (error, stdout) => {

            const hrDiff = process.hrtime(hrStart);

            let result = error?.toString() ?? stdout.toString();
            result = result.length > 4000 ? result.substring(0, 4000) : result;

            const execEmbed = new EmbedBuilder()
                .setAuthor({ name: `Exec | ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                .setTitle(error ? "**__``EXEC ERROR``__**" : "**__``EXEC RESULT``__**")
                .setColor(error ? "Red" : "Blurple")
                .setDescription(result)
                .setFooter({ text: `Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000}ms` })
                .setTimestamp();

            message.channel.send({ embeds: [execEmbed] });

        });

        return;

    }

}

module.exports = ExecCommand;