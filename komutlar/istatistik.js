module.exports = [{
name: "istatistik",
executeAt: "both",
guildOnly: false,
aliases: ["stat", "stats", "veri", "bilgi", "info", "i"],
$if: "old",
code: `
$reply
$title[📁 Canlı Destek İstatistik]
$thumbnail[$userAvatar[$mentioned[1;true]]]
$color[#4B81FC]
$description[<@$mentioned[1;true]>
## ✨ Kullanıcı
- **Açılan canlı destek sayısı:** \`$getGlobalUserVar[acilan;$mentioned[1;true]]\`
- **Kapatılan canlı destek sayısı:** \`$getGlobalUserVar[kapatilan;$mentioned[1;true]]\`
## ✨ Yetkili
- **Onaylanan canlı destek sayısı:** \`$getGlobalUserVar[onaylanan;$mentioned[1;true]]\`
- **Reddedilen canlı destek sayısı:** \`$getGlobalUserVar[reddedilen;$mentioned[1;true]]\`]
$addTimestamp

$globalCooldown[15s;
{newEmbed:
{title:❌ **Biraz bekle!**}
{description:Bu komutu tekrar kullanabilmek için **%sec% Saniye** kadar beklemelisin.}
{color:#E34A51}}{options:{reply:$messageID}}]

$onlyIf[$getVar[kurulum]!=yok;
{newEmbed:
{title:❌ **Hata!**}
{description:Canlı Destek kurulumu tamamlanmamış veya kapalı. **$getGuildVar[Prefix]kurulum** yazarak kurulum gerçekleştirilmeli.}
{color:#E34A51}}{options:{ephemeral}}{extraOptions:{interaction}}]
`
}]