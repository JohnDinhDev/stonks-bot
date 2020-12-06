import Discord from "discord.js";

// Definitions
import { Msg } from "./definitions/interfaces/";

// Controllers
import Commands from "./controllers/Commands";

require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on("message", async (msg: Msg) => {
    if (msg.author.bot || !msg.content.startsWith(process.env.DISCORD_PREFIX!))
        return;

    // Parses message content into a command and runs that command
    new Commands(msg);
});

client.login(process.env.DISCORD_TOKEN);
