// Definitions
import { Msg, Keyable } from "../definitions/interfaces";

import InStock from "./InStock";

// Views
import Message from "../views/Message";
import Embed from "../views/Embed";

export default class Commands {
    private readonly prefix: string = process.env.DISCORD_PREFIX!;
    private args: Array<string> | undefined;
    private command: string | undefined;
    private msg: Message | any;

    constructor(msg: Msg | any, command: string = "") {
        if (command) {
            this.msg = msg;
            (this as Keyable)[command]();
            return;
        }

        // Set properties
        this.msg = new Message(msg);

        // Parses message content for a command and arguments
        this.args = msg.content.slice(this.prefix.length).trim().split(" ");
        this.command = this.args!.shift()?.toLowerCase();

        if (!msg.content.startsWith(this.prefix) || !this.command) return;

        // Run method if input command exists, else run help
        if (this.command in this) {
            (this as Keyable)[this.command]();
        } else {
            this.help();
        }
    }

    private stats = async () => {
        const inStock = await InStock.amazon();

        const embed = Embed.stats(inStock);
        this.msg.send(embed);
    };

    private help = async (): Promise<void> => {
        // If user input command is invalid
        if ((this.command || "") in this === false) {
            this.msg!.reply(
                "`" + this.command + "`" + " is not a valid command"
            );
        }

        // Generate help embed
        const embed = Embed.help();

        // Send embed message
        this.msg!.send(embed);
    };
}
