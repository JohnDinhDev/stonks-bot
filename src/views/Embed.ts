import Text from "./Text";
import { Commands } from "../definitions/enums";
import { Keyable } from "../definitions/interfaces";
import { generateLineBreaks } from "../utils";
export default class Embed {

    public static generic = (
        color: string,
        title: string,
        description: string
    ) => {
        return {
            embed: {
                color,
                title,
                description,
            },
        };
    };

    public static stats = (status: any) => {
        console.log(status);
        const message = `[AMD Ryzen 9 5950X](${
            process.env.AMAZON
        }) is currently ${status ? "in stock" : "out of stock"}`;
        return {
            embed: {
                color: 0x197BBD,
                title: "Stats",
                fields: [
                    {
                        name: "Amazon",
                        value: message,
                        inline: false,
                    }
                ]
            }
        }
    }


    public static help = () => {
        const message = [];

        for (const command of Object.keys(Commands)) {
            message.push(
                `\`${process.env.DISCORD_PREFIX + command}\` - ${
                    (Commands as Keyable)[command]
                }`
            );
        }

        return {
            embed: {
                color: 0xff7f50,
                title: "Help",
                fields: [
                    {
                        name: "Commands",
                        value: generateLineBreaks(message, false, 2),
                        inline: false,
                    },
                ],
            },
        };
    };
}
