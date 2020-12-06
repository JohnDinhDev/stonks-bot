import UserAgent from "user-agents";
import puppeteer from "puppeteer";

export default class InStock {
    private static headers = {
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://www.google.com/",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "User-Agent": new UserAgent().toString(),
        "Upgrade-Insecure-Requests": "1",
        Connection: "close",
        "X-Forwarded-For": "68.83.188.67",
        "X-Real-Ip": "68.83.188.67",
        Host: "google.com",
        "Mod-Rewrite": "On",
        DNT: "1",
    };

    public static amazon = async () => {
        if (!process.env.AMAZON) return;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(process.env.AMAZON);
        await page.screenshot({ path: "example.png" });

        await browser.close();
        //const link = process.env.AMAZON;
        //if (!link) return false;

        //const response = await got(link, InStock.headers as any);
        //const dom = new JSDOM(response.body);
        //const isOutOfStock = dom.window.document.getElementById("outOfStock");
        //console.log(response.body);
        //console.log(isOutOfStock);

        //if (isOutOfStock) {
            //return false;
        //} else {
            //return true;
        //}
    };
}
