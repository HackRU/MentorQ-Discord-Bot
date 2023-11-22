const { EmbedBuilder } = require("discord.js");

class UtilManager {
    /**
     * Manager for misc utilities.
     * @param {import("../bot/index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        this.MentorQ = client;
    }

    // default message embeds
    successEmbed(text) {
        const successEmbed = new EmbedBuilder()
            .setColor("DarkGreen")
            .setDescription("✅ " + text);

        return successEmbed;
    }

    errorEmbed(text) {
        const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("❌ " + text);

        return errorEmbed;
    }

    /**
     * Format a date into Discord's timestamp.
     * @param {Date} date The date to format. (optional)
     * @param {boolean} relative Whether to use the relative time style. (optional)
     * @returns {string} Formatted timestamp.
     */
    createTimestamp(date = Date.now(), relative = false) {
        return `<t:${Math.round(new Date(date).getTime() / 1000)}${relative ? ":R" : ""}>`;
    }

    /**
     * @typedef {Object} FetchMemberOptions
     * @property {boolean} [allowQuery=false] Whether fetching by username is allowed. (optional)
     * @property {boolean} [fetchUser=false] Whether to fetch user if no guild member. (optional)
     */

    /**
     * Fetch a member from a guild.
     * @param {import("discord.js").Guild} guild Guild to fetch member from. (required)
     * @param {import("discord.js").User|string} user User/ID of the member to fetch. (required)
     * @param {FetchMemberOptions} options FetchMemberOptions: allowQuery, fetchUser. (optional)
     * @returns {Promise<import("discord.js").GuildMember|import("discord.js").User>} GuildMember, User, or undefined.
     */
    fetchMember(guild, user, options = { allowQuery: false, fetchUser: false }) {
        return new Promise(async (resolve) => {

            let fetchedMember = guild.members.cache.get(user.id ?? user);

            if (fetchedMember) {
                fetchedMember.user.cacheTime = Date.now();
                return resolve(fetchedMember);
            }

            try {

                if (isNaN(user.id ?? user) && !options.allowQuery) throw "no member found";

                if (isNaN(user.id ?? user) && options.allowQuery) {

                    fetchedMember = await guild.members.fetch({ query: user.id ?? user, limit: 1 });

                    if (!fetchedMember?.first()?.id) throw "no member found";
                    else {
                        fetchedMember.first().user.cacheTime = Date.now();
                        return resolve(fetchedMember.first());
                    }

                } else {

                    fetchedMember = await guild.members.fetch({ user: user.id ?? user, limit: 1 });

                    if (!fetchedMember?.id) throw "no member found";
                    else {
                        fetchedMember.user.cacheTime = Date.now();
                        return resolve(fetchedMember);
                    }

                }

            } catch (e) {

                if (!options.fetchUser) return resolve(undefined);

                try {

                    if (isNaN(user.id ?? user)) throw "no member found";

                    fetchedMember = await this.MentorQ.users.fetch(user.id ?? user);

                    if (!fetchedMember?.id) throw "no member found";
                    else {
                        fetchedMember.cacheTime = Date.now();
                        return resolve(fetchedMember);
                    }

                } catch (e) {
                    return resolve(undefined);
                }

            }

        });
    }

}

module.exports = UtilManager;