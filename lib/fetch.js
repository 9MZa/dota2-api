const puppeteer = require('puppeteer');
const path = require("path");
const fs = require("fs");

const savePath = path.join(`${__dirname}../../db.json`)

const getHero = async () => {
    console.log("Start to fetching Heroes...🚀")

    const dotaUrl = "https://www.dota2.com/heroes"
    const totalHero = 123;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(dotaUrl, { waitUntil: 'networkidle2' });

    let resultObj = {
        heroes: []
    }

    for (let i = 1; i <= 2; i++) {

        const nameSelector = await page.waitForSelector(`#dota_react_root > div > div > div.herogridpage_HeroGrid_D36V- > div.herogridpage_GridList_3LrTP > a:nth-child(${i}) > div.herogridpage_HeroNameContainer_3ldbS > div`);

        const avatarSelector = await page.waitForSelector(`#dota_react_root > div > div > div.herogridpage_HeroGrid_D36V- > div.herogridpage_GridList_3LrTP > a:nth-child(${i})`);



        const nameEvaluate = await nameSelector.evaluate(element => element.textContent, nameSelector);

        const avatarEvaluate = await avatarSelector.evaluate(element => element.getAttribute("style"))
        const avatarUrl = avatarEvaluate.split(/\"/gm);



        const linkSelector = await page.waitForSelector(`#dota_react_root > div > div > div.herogridpage_HeroGrid_D36V- > div.herogridpage_GridList_3LrTP > a:nth-child(${i})`)

        const linkEvaluate = await linkSelector.evaluate(element => element.getAttribute("href"), linkSelector)

        const detailPage = await browser.newPage();
        await detailPage.goto(`https://www.dota2.com${linkEvaluate}`, { waitUntil: 'networkidle2' })

        // New Page
        const detailSelector = await detailPage.waitForSelector(`#dota_react_root > div > div > div.heropage_UpperSection_l2rxD > div.heropage_HeroSummary_2jP25 > div.heropage_HeroOneLiner_2r7td`)

        const detailEvaluate = await detailSelector.evaluate(element => element.textContent, detailSelector)


        const heroSectionSelector = await detailPage.waitForSelector("#dota_react_root > div > div > div.heropage_UpperSection_l2rxD > div.heropage_HeroPortraitContainer_3oI3C")

        const heroEvaluate = await heroSectionSelector.evaluate(() => document.querySelector('*').outerHTML)
        const heroSplit = heroEvaluate.split(/(<video)/gm)[2]
        const imageUrl = heroSplit.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/mg)

        const statNameSelector = await detailPage.waitForSelector(`#dota_react_root > div > div > div.heropage_UpperSection_l2rxD > div.heropage_HeroSummary_2jP25 > div.heropage_HeroTypeTitle_11Ymq > div`)
        const statNameEvaluate = await statNameSelector.evaluate(element => element.textContent, statNameSelector)

        const statIconSelector = await detailPage.waitForSelector(`#dota_react_root > div > div > div.heropage_UpperSection_l2rxD > div.heropage_HeroSummary_2jP25 > div.heropage_HeroTypeTitle_11Ymq > img`)

        const statIconEvaluate = await statIconSelector.evaluate(element => element.getAttribute("src"), statIconSelector)


        console.log(i, nameEvaluate, "✅")

        resultObj.heroes.push({
            id: i,
            name: nameEvaluate,
            primary_stat: {
                icon: statIconEvaluate,
                name: statNameEvaluate
            },
            hero_one_liner: detailEvaluate,
            small_thumbnail: avatarUrl[1],
            big_thumbnail: imageUrl[0],
            video_thumbnail: imageUrl[1],
            source_link: `https://www.dota2.com${linkEvaluate}`,
        })

        detailPage.close()

    }


    fs.writeFile(savePath, JSON.stringify(resultObj), "utf-8", (err) => {
        if (!err) {
            console.log("saved!")
        }
    })

    browser.close()

}

getHero()