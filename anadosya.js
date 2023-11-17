const aoijs = require("aoi.js")
const { Util } = require("aoi.js");
const { AoiClient, LoadCommands } = require("aoi.js");
const { parse, createAst } = require('aoi.parser');
const {
parseFiles,
parseExtraOptions
} = require('aoi.parser/components');

Util.parsers.ErrorHandler = parse;

Util.parsers.FileParser = (data) => {
return createAst(data).children.map(parseFiles);
}

Util.parsers.OptionsParser = (data) => {
return createAst(data).children.map(parseExtraOptions);
}

const bot = new aoijs.AoiClient({
token: "TOKEN BURAYA",
prefix: ["$getGuildVar[Prefix]", "$getGuildVar[Prefix] ", "<@!$clientID>", "<@$clientID> "],
intents: ["MessageContent", "GuildMessages", "Guilds", "GuildMembers", "DirectMessages"],
events: ["onMessage", "onInteractionCreate"],
suppressAllErrors: true,
errorMessage: "",
database: {
type: "aoi.db",
db: require("@akarui/aoi.db"),
tables: ["main"],
path: "./database/",
extraOptions: {
dbType: "KeyValue"
}
}
});

bot.status({
name: "Maze Development | Canlı Destek",
type: "STREAMING",
url: "https://www.twitch.tv/ardawn9",
time: "12",
});

bot.command({
name: "$alwaysExecute",
executeAt: "both",
guildOnly: false,
$if: "old",
code: `
$if[($getGlobalUserVar[talep;$authorID]==var)&&($getGlobalUserVar[dm;$authorID]==var)&&($isDM[$channelID]==true)]
$channelSendMessage[$getGlobalUserVar[kanal;$authorID];{newEmbed:{author:$username:$userAvatar}{description:$noMentionMessage}{color:Random}{timestamp}}]
$addMessageReactions[$channelID;$messageID;✅]
$endif

$if[($getGlobalUserVar[talep;$getChannelVar[kullanici;$channelID]]==var)&&($getGlobalUserVar[dm;$getChannelVar[kullanici;$channelID]]==var)&&($isDM[$channelID]==false)&&($stringStartsWith[$noMentionMessage;!]==true)&&($channelName[$channelID]==$username[$getChannelVar[kullanici;$channelID]]-$discriminator[$getChannelVar[kullanici;$channelID]])]
$sendDm[{newEmbed:{author:Yetkili $username:$userAvatar}{description:$replaceText[$noMentionMessage;!;]}{color:Random}{timestamp}};$getChannelVar[kullanici;$channelID];false]
$addMessageReactions[$channelID;$messageID;✅]

$onlyIf[$isUserDmEnabled[$getChannelVar[kullanici;$channelID]]!=false;
{newEmbed:
{title:❌ **Hata!**}
{description:Karşı tarafın DM kutucuğu kapalı.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
$endif

$onlyIf[$getVar[kurulum]!=yok;]
`
});

bot.variables(require('./değişkenler.js'));

bot.loadCommands("./komutlar/", true);

try { } catch (error) { console.log(error) }