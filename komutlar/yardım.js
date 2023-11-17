module.exports = [{
name: "help",
executeAt: "both",
guildOnly: false,
aliases: ["yardım", "yardim", "menü", "liste", "list", "menu"],
code: `
$reply
$title[📁 Canlı Destek Yardım]
$thumbnail[$userAvatar[$clientID]]
$color[#4B81FC]
$description[\`$getGuildVar[Prefix]destek\` - **Canlı Destek açarsınız.**

\`$getGuildVar[Prefix]kurulum\` - **Botu kurarsınız.**

\`$getGuildVar[Prefix]istatistik\` - **Canlı Destek istatistiklerinize bakarsınız.**]
$addTimestamp

$globalCooldown[15s;
{newEmbed:
{title:❌ **Biraz bekle!**}
{description:Bu komutu tekrar kullanabilmek için **%sec% Saniye** kadar beklemelisin.}
{color:#E34A51}}{options:{reply:$messageID}}]
`
}]