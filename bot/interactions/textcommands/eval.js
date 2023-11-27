const TextCommand = require("../../../structures/base/BaseTextCommand");
const { EmbedBuilder } = require("discord.js");
const { inspect } = require("util");

class EvalCommand extends TextCommand {
    /**
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client, {
            name: "eval",
            category: "dev",
            description: "Evaluate code.",
            args: true,
        });
    }

    /**
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns
     */
    async run(message, args) {

        const code = args.join(" ");

        const hrStart = process.hrtime();

        try {

            let evaled = eval(`(async () => {${code}})()`);
            const hrDiff = process.hrtime(hrStart);

            if (evaled.then && evaled.catch) evaled = await evaled;
            if (typeof evaled !== "string") evaled = inspect(evaled, { depth: 0 });

            const result = evaled.length > 4000 ? evaled.substring(0, 4000) : evaled;

            const resultEmbed = new EmbedBuilder()
                .setAuthor({ name: "Eval | " + message.author.username, iconURL: message.author.displayAvatarURL() })
                .setTitle("**``EVAL RESULT``**")
                .setDescription("```js\n" + result + "```")
                .setColor("Blurple")
                .setFooter({ text: `Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000}ms` })
                .setTimestamp();

            message.channel.send({ embeds: [resultEmbed] });

        } catch (err) {

            const hrDiff = process.hrtime(hrStart);

            const result = err.stack.length > 4000 ? err.stack.substring(0, 4000) : err.stack;

            const resultEmbed = new EmbedBuilder()
                .setAuthor({ name: "Eval | " + message.author.username, iconURL: message.author.displayAvatarURL() })
                .setTitle("**``EVAL ERROR``**")
                .setDescription("```js\n" + result + "```")
                .setColor("Red")
                .setFooter({ text: `Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000}ms` })
                .setTimestamp();

            message.channel.send({ embeds: [resultEmbed] });

        }

        return;

    }

}

module.exports = EvalCommand;