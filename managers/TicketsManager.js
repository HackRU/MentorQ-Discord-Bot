const { ChannelType, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

class TicketsManager {
    /**
     * Manager for mentor request tickets.
     * @param {import("../bot/index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        this.MentorQ = client;
    }

    /**
     * @typedef {object} MentorRequestData
     * @prop {string} name
     * @prop {string} team
     * @prop {string} title
     * @prop {string} language
     * @prop {string} techStack
     * @prop {string} description
     */

    /**
     * Creates a mentor request and adds to the queue.
     * @param {import("discord.js").GuildMember} member 
     * @param {MentorRequestData} requestData 
     */
    async create(member, requestData) {

        const queueEmbed = new EmbedBuilder()
            .setAuthor({ name: `Mentor Request - ${member.user.username}`, iconURL: member.displayAvatarURL() })
            .setTitle(`Project: ${requestData.title}`)
            .setDescription(requestData.description)
            .addFields([
                { name: "Name:", value: requestData.name, inline: true },
                { name: "Team Members:", value: requestData.team, inline: true },
                { name: "Programming Language:", value: requestData.language, inline: true },
                { name: "Tech Stack", value: requestData.techStack },
            ])
            .setFooter({ text: `User ID: ${member.id}` })
            .setTimestamp();

        await this.getQueueChannel(member.guild).send({ embeds: [queueEmbed] });

    }

    // claim(mentor, queueEmbed) {

    // }

    // close(ticketChannel) {

    // }

    // cancel(mentor, queueEmbed) {

    // }

    // handleDelete(ticketChannel) {

    // }

    /**
     * @param {import("discord.js").GuildMember} member 
     * @returns {import("discord.js").ThreadChannel}
     */
    getTicket(member) {
        return this.getRequestsChannel(member.guild).threads.cache.find(t => t.name.includes(member.id));
    }

    /**
     * @param {import("discord.js").Guild} guild 
     * @returns {import("discord.js").TextChannel}
     */
    getRequestsChannel(guild) {
        return guild.channels.cache.find(c => c.type == "GuildText" && c.name == "mentorq");
    }

    /**
     * @param {import("discord.js").Guild} guild 
     * @returns {import("discord.js").TextChannel}
     */
    getQueueChannel(guild) {
        return guild.channels.cache.find(c => c.type == "GuildText" && c.name == "mentorq-queue");
    }

    /**
     * @param {import("discord.js").Guild} guild 
     * @returns {import("discord.js").TextChannel}
     */
    getLogsChannel(guild) {
        return guild.channels.cache.find(c => c.type == "GuildText" && c.name == "mentorq-logs");
    }

    /**
     * @param {import("discord.js").Guild} guild 
     * @returns {import("discord.js").Role}
     */
    getMentorRole(guild) {
        return guild.roles.cache.find(r => r.name == "Mentor");
    }

    /**
     * Checks if the mentor tickets system is fully setup.
     * @param {import("discord.js").Guild} guild 
     * @returns {boolean}
     */
    isActive(guild) {
        if (this.getRequestsChannel(guild) && this.getQueueChannel(guild) && this.getLogsChannel(guild) && this.getMentorRole(guild))
            return true;
        else return false;
    }

    /**
     * Set up the required roles and channels for the MentorQ system.
     * @param {import("discord.js").Guild} guild 
     * @returns {Promise<boolean>}
     */
    async setup(guild) {

        if (this.isActive(guild)) return Promise.resolve(false);

        try {
            const mentorRole = this.getMentorRole(guild) || await guild.roles.create({ name: "Mentor" });

            const category = await guild.channels.create({
                type: ChannelType.GuildText,
                name: "MentorQ",
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionFlagsBits.SendMessages] },
                ],
            });

            const requestsChannel = await guild.channels.create({
                type: ChannelType.GuildText,
                name: "mentorq",
                parent: category,
            });

            await guild.channels.create({
                type: ChannelType.GuildText,
                name: "mentorq-queue",
                parent: category,
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: mentorRole.id, deny: [PermissionFlagsBits.ViewChannel] },
                ],
            });

            await guild.channels.create({
                type: ChannelType.GuildText,
                name: "mentorq-logs",
                parent: category,
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
                    { id: mentorRole.id, deny: [PermissionFlagsBits.ViewChannel] },
                ],
            });

            const infoEmbed = new EmbedBuilder()
                .setTitle("MentorQ - Request mentors during HackRU!")
                .setDescription("MentorQ is a custom Discord bot for HackRU to facilitate a ticket queue system connecting hackers and mentors. Submit a mentor request with basic project details to the queue by clicking the button below and we'll match you with a mentor! You'll get a ping in this server when a mentor accepts your request.\n\nDon't worry if you're just starting out, we're here to help!")
                .setColor("Blurple")
                .setFooter({ text: "MentorQ is an open source project developed by HackRU RnD." });

            const requestButton = new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                        .setLabel("Request a mentor")
                        .setCustomId("request-mentor")
                        .setStyle(ButtonStyle.Success),
                );

            requestsChannel.send({ embeds: [infoEmbed], components: [requestButton] });

            return Promise.resolve(true);
        } catch (err) {
            console.error(err);
            return Promise.reject(err);
        }

    }

    generateRequestModal() {
        const mentorRequestModal = new ModalBuilder()
            .setTitle("Mentor Request Form")
            .setCustomId("mentor-request-form");

        const nameInput = new TextInputBuilder()
            .setCustomId("name-input")
            .setStyle(TextInputStyle.Short)
            .setLabel("What's your name?")
            .setPlaceholder("Enter your name (not username).")
            .setRequired(true);

        const teamInput = new TextInputBuilder()
            .setCustomId("team-input")
            .setStyle(TextInputStyle.Short)
            .setLabel("How many team members (including you)?")
            .setPlaceholder("Enter the amount of people in your team.")
            .setRequired(true);

        const titleInput = new TextInputBuilder()
            .setCustomId("title-input")
            .setStyle(TextInputStyle.Short)
            .setLabel("Project Title/Overview:")
            .setPlaceholder("Enter your project title and/or very brief description.")
            .setRequired(true);

        const langInput = new TextInputBuilder()
            .setCustomId("lang-input")
            .setStyle(TextInputStyle.Short)
            .setLabel("What programming language(s) are you using?")
            .setRequired(true);

        const techStackInput = new TextInputBuilder()
            .setCustomId("tech-stack-input")
            .setStyle(TextInputStyle.Short)
            .setLabel("What tools are you using for development (tech stack)?")
            .setPlaceholder("It's fine if you don't know yet!")
            .setRequired(true);

        const descInput = new TextInputBuilder()
            .setCustomId("desc-input")
            .setStyle(TextInputStyle.Paragraph)
            .setLabel("Project Description:")
            .setPlaceholder("Give us any details about your project idea.")
            .setRequired(true);

        mentorRequestModal.addComponents(
            new ActionRowBuilder(nameInput),
            new ActionRowBuilder(teamInput),
            new ActionRowBuilder(titleInput),
            new ActionRowBuilder(langInput),
            new ActionRowBuilder(techStackInput),
            new ActionRowBuilder(descInput),
        );

        return mentorRequestModal;
    }

    // generateLog(action, executor, details, color) {

    // }

    // parseQueueEmbed(queueEmbed) {

    // }

}

module.exports = TicketsManager;