const { readdir } = require("fs");

class InteractionHandler {
    /**
     * Handler to register all bot interaction files.
     * @param {import("../../bot/index.js")} client MentorQ's Discord Client.
     */
    constructor(client) {
        this.MentorQ = client;
        this.build();
    }

    build() {

        readdir("./bot/interactions/textcommands/", (err, files) => {

            const cmdFiles = files.filter(f => f.split(".").pop() === "js");

            console.log(`INFO | Loading ${cmdFiles.length} text commands...`);

            for (const f in cmdFiles) {
                const cmd = new (require(`../../bot/interactions/textcommands/${cmdFiles[f]}`))(this.MentorQ);
                this.MentorQ.commands.set(cmd.config.name, cmd);
            }

            console.log(`INFO | Loaded ${cmdFiles.length} text commands`);

        });

        readdir("./bot/interactions/slashcommands/", (err, files) => {

            const cmdFiles = files.filter(f => f.split(".").pop() === "js");

            console.log(`INFO | Loading ${cmdFiles.length} slash commands...`);

            for (const f in cmdFiles) {
                const cmd = new (require(`../../bot/interactions/slashcommands/${cmdFiles[f]}`))(this.MentorQ);
                this.MentorQ.slashCommands.set(cmd.config.name, cmd);
            }

            console.log(`INFO | Loaded ${cmdFiles.length} slash commands`);

        });

        readdir("./bot/interactions/components/", (err, categories) => {

            categories.forEach(category => {

                readdir(`./bot/interactions/components/${category}`, (err, files) => {

                    const cmdFiles = files.filter(f => f.split(".").pop() === "js");

                    console.log(`INFO | Loading ${cmdFiles.length} ${category} components...`);

                    for (const f in cmdFiles) {
                        const cmd = new (require(`../../bot/interactions/components/${category}/${cmdFiles[f]}`))(this.MentorQ);
                        this.MentorQ.components.set(cmd.config.name, cmd);
                    }

                    console.log(`INFO | Loaded ${cmdFiles.length} ${category} components`);

                });

            });

        });

    }
}

module.exports = InteractionHandler;