const Event = require("../../../structures/base/BaseEvent");
const { EmbedBuilder } = require("discord.js");

class MessageCreateEvent extends Event {
    /**
     * @param {import("../../index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        super(client);
    }

    /**
     * @param {import("discord.js").Message} message 
     * @returns 
     */
    async run(message) {

        if (!message.guild || message.author.bot) return;

        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${this.MentorQ.user.id}> |${escapeRegex(this.MentorQ.config.prefix)})\\s*`);
        const prefix = message.content.match(prefixRegex)?.shift();

        if (!prefix || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = this.MentorQ.commands.get(args.shift().toLowerCase());

        if (!command) return;

        // ensures the user doesn't get sweeped from the cache for now
        message.member.user.cacheTime = Date.now();

        // command permission checks based on category
        if (command.config.category == "dev" && !this.MentorQ.config.developers.includes(message.author.id)) return;
        if (command.config.category == "admin" && !message.member.permissions.has("ManageGuild")) return;
        if (command.config.category == "mentor" && !message.member.roles.cache.find(r => r.name == "Mentor")) return;

        // bot requires admin permission to avoid dealing w/ individual role and channel permission checks (may change in the future)
        if (!message.guild.members.me.permissions.has("Administrator"))
            return message.reply({ embeds: [this.MentorQ.util.errorEmbed("I require `ADMINISTRATOR` permission in this server.")] });

        if (command.config.args && !args.length)
            return message.reply({ embeds: [this.MentorQ.util.errorEmbed("This command requires arguments. Use `help [command]` to see the proper command usage.")] });

        if (this.MentorQ.util.handleCooldown(command, message)) return;

        command.run(message, args).catch(err => {
            console.error(`-----\nCOMMAND (${command.config.name}) ERROR | EXECUTOR: ${message.author.username} | GUILD: ${message.guild.name} |\n` + err.stack + "\n-----");

            const errorEmbed = new EmbedBuilder()
                .setAuthor({ name: `Command Error: ${command.config.name}`, iconURL: this.MentorQ.user.displayAvatarURL() })
                .setColor("Red")
                .addFields([
                    { name: "Executor", value: message.author.username, inline: true },
                    { name: "Channel / Guild", value: message.channel.name + " / " + message.guild.name, inline: true },
                    { name: "Message Content", value: message.content },
                ])
                .setDescription(err.stack.length < 4000 ? err.stack : err.stack.substring(0, 4000))
                .setFooter({ text: this.MentorQ.user.tag })
                .setTimestamp();

            this.MentorQ.logs.send({ embeds: [errorEmbed] });

            message.reply({ embeds: [this.MentorQ.util.errorEmbed("An internal error has occurred. Developers have been notified. Please contact staff for further assistance.")] });
        });

        return;

    }

}

module.exports = MessageCreateEvent;