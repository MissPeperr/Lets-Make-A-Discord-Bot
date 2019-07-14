const randomNum = () => {
    return Math.floor(Math.random() * Math.floor(40))
}

const insults = {
    descriptorArray: ["artless",
        "bawdy",
        "beslubbering",
        "bootless",
        "churlish",
        "cockered",
        "clouded",
        "craven",
        "currish",
        "dankish",
        "dissembling",
        "droning",
        "errant",
        "fawning",
        "fobbing",
        "froward",
        "frothy",
        "gleeking",
        "goatish",
        "gorbellied",
        "impertinent",
        "infectious",
        "jarring",
        "loggerheaded",
        "lumpish",
        "mammering",
        "mangled",
        "mewling",
        "paunchy",
        "pribbling",
        "puking",
        "puny",
        "qualing",
        "rank",
        "reeky",
        "roguish",
        "ruttish",
        "saucy",
        "spleeny",
        "spongy",
        "surly",
        "tottering",
        "unmuzzled",
        "vain",
        "venomed",
        "vallainous",
        "warped",
        "wayword",
        "weedy",
        "yeasty"],
    verbArray: ["base-court",
        "bat-fowling",
        "beef-witted",
        "beetle-headed",
        "boil-brained",
        "clapper-clawed",
        "clay-brained",
        "common-kissing",
        "crook-pated",
        "dismal-dreaming",
        "dizzy-eyed",
        "doghearted",
        "dread-bolted",
        "earth-vexing",
        "elf-skinned",
        "fat-kidneyed",
        "fen-sucked",
        "flap-mouthed",
        "fly-bitten",
        "folly-fallen",
        "fool-born",
        "full-gorged",
        "guts-griping",
        "half-faced",
        "hasty-witted",
        "hedge-born",
        "hell-hated",
        "idle-headed",
        "ill-breeding",
        "ill-nurtured",
        "knotty-pated",
        "milk-livered",
        "motley-minded",
        "onion-eyed",
        "plume-plucked",
        "pottle-deep",
        "pox-marked",
        "reeling-ripe",
        "rough-hewn",
        "rude-growing",
        "rump-fed",
        "shard-borne",
        "sheep-biting",
        "spur-galled",
        "swag-bellied",
        "tardy-gaited",
        "tickle-brained",
        "toad-spotted",
        "unchin-snouted",
        "weather-bitten"],
    nounArray: ["clotpole",
        "coxcomb",
        "codpiece",
        "death-token",
        "dewberry",
        "flap-dragon",
        "flax-wench",
        "flirt-gill",
        "foot-licker",
        "fustilarian",
        "giglet",
        "gudgeon",
        "haggard",
        "harpy",
        "hedge-pig",
        "horn-beast",
        "hugger-mugger",
        "joithead",
        "lewster",
        "lout",
        "maggot-pie",
        "malt-worm",
        "mammet",
        "measle",
        "minnow",
        "miscreant",
        "moldwarp",
        "mumble-news",
        "nut-hook",
        "pigeon-egg",
        "pignut",
        "puttock",
        "pumpion",
        "ratsbane",
        "scut",
        "skainsmate",
        "strumpet",
        "varlot",
        "vassal",
        "whey-face",
        "wagtail"],
    randomInsultForUser(user) {
        return `${user.username} is a ${insults.descriptor[randomNum()]}, ${insults.verb[randomNum()]}, ${insults.nouns[randomNum()]}.`
    },
    randomInsultForMe() {
        return `You ${insults.descriptorArray[randomNum()]}, ${insults.verbArray[randomNum()]}, ${insults.nounArray[randomNum()]}.`
    }
}

module.exports = insults;