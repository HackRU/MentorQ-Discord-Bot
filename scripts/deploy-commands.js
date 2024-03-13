const { REST, Routes, ApplicationCommand, ApplicationCommandType } = require("discord.js");
const { readdirSync } = require("node:fs");
require("dotenv").config();

const rest = new REST().setToken(process.env.TOKEN);

const commands = [];

const cmdFiles = readdirSync("./bot/interactions/slashcommands/").filter(f => f.endsWith(".js"));

for (const file in cmdFiles) {
    const cmd = new (require(`../bot/interactions/slashcommands/${cmdFiles[file]}`))();
    commands.push(transformCommand(cmd.config.commandData));
}

(async () => {
    try {
        console.log("Started refreshing application commands...");

        await rest.put(
            Routes.applicationCommands(process.env.BOT_ID),
            { body: commands },
        );

        console.log("Successfully reloaded application commands.");
    } catch (error) {
        console.error(error);
    }
})();

function transformCommand(command) {
    return {
        name: command.name,
        description: command.description,
        type: typeof command.type === "number" ? command.type : ApplicationCommandType[command.type],
        options: command.options?.map(o => ApplicationCommand.transformOption(o)),
        default_permission: command.defaultPermission ?? command.default_permission,
    };
}