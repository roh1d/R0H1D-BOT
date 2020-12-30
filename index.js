/*Script ARIS187 ID
RECODE BY MRC0D3 (ROH1D 21)
JANGAN UBAH NAMA INI TANPA SEIZIN KAMI
JANGAN MODAL UBAH NAMA DOANG BRO!!
HARGAILAH PEMBUATNYA DAN RECODE NYA
*/

const XBOT = 'ROHID X-BOT';  //JANGAN UBAH INI
const instagram = 'https://bit.ly/2KYlka9'; //JANGAN UBAH INI
const nomer = 'Wa.me/+6282124946711'; // JANGAN UBAH INI
const aktif = 'Tergantung internet'; // JANGAN UBAH INI

const qrcode = require("qrcode-terminal");
const moment = require("moment");
const cheerio = require("cheerio");
const fs = require("fs");
const dl = require("./lib/downloadImage.js");
const fetch = require('node-fetch');
const urlencode = require("urlencode");
const axios = require("axios");
const imageToBase64 = require('image-to-base64');
const menu = require("./menu.js");
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
var jam = moment().format("HH:mm");

function foreach(arr, func)
{
   for (var i in arr)
   {
      func(i, arr[i]);
   }
}
const conn = new WAConnection()
conn.on('qr', qr =>
{
   qrcode.generate(qr,
   {
      small: true
   });
   console.log(`[ ${moment().format("HH:mm:ss")} ] Langsung scan QR nya gan!`);
});

conn.on('credentials-updated', () =>
{
   // save credentials whenever updated
   console.log(`credentials updated!`)
   const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
})
fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
// uncomment the following line to proxy the connection; some random proxy I got off of: https://proxyscrape.com/free-proxy-list
//conn.connectOptions.agent = ProxyAgent ('http://1.0.180.120:8080')
conn.connect();

conn.on('user-presence-update', json => console.log(json.id + ' presence is ' + json.type))
conn.on('message-status-update', json =>
{
   const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
   console.log(`${json.to}${participant} acknlowledged message(s) ${json.ids} as ${json.type}`)
})

conn.on('message-new', async(m) =>
{

   const messageContent = m.message
   const text = m.message.conversation
   let id = m.key.remoteJid
   const messageType = Object.keys(messageContent)[0] // message will always contain one key signifying what kind of message
   let imageMessage = m.message.imageMessage;
   console.log(`[ ${moment().format("HH:mm:ss")} ] (${id.split("@s.whatsapp.net")[0]} => ${text}`);


// FITUR MENU

if (text == 'menu'){
conn.sendMessage(id, menu.menu ,MessageType.text);
}
else if (text == 'menu1'){
conn.sendMessage(id, menu.menu1 ,MessageType.text);
}
else if (text == 'menu2'){
conn.sendMessage(id, menu.menu2 ,MessageType.text);
}
else if (text == 'menu3'){
conn.sendMessage(id, menu.menu3 ,MessageType.text);
}
else if (text == 'menu4'){
conn.sendMessage(id, menu.menu4 ,MessageType.text);
}
else if (text == 'donasi'){
conn.sendMessage(id, menu.donasi ,MessageType.text);
}

// SAMPAI SINI//


//SEMUA FITURNYA

   if (messageType == 'imageMessage')
   {
      let caption = imageMessage.caption.toLocaleLowerCase()
      const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
      if (caption == 'stiker')
      {
         const stiker = await conn.downloadAndSaveMediaMessage(m) // to decrypt & save to file

         const
         {
            exec
         } = require("child_process");
         exec('cwebp -q 50 ' + stiker + ' -o temp/' + jam + '.webp', (error, stdout, stderr) =>
         {
            let stik = fs.readFileSync('temp/' + jam + '.webp')
            conn.sendMessage(id, stik, MessageType.sticker)
         });
      }
   }
            
            
   if (messageType === MessageType.text)
   {
      let is = m.message.conversation.toLocaleLowerCase()

      if (is == 'pantun')
      {

         fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
            .then(res => res.text())
            .then(body =>
            {
               let tod = body.split("\n");
               let pjr = tod[Math.floor(Math.random() * tod.length)];
               let pantun = pjr.replace(/pjrx-line/g, "\n");
               conn.sendMessage(id, pantun, MessageType.text)
            });
      }

   }

   if (text == 'assalamualaikum'){
conn.sendMessage(id, ' _waalaikumsalam, _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'salam'){
conn.sendMessage(id, ' _Waalaikumsalam, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'asalamualaikum'){
conn.sendMessage(id, ' _Waalaikumsalam, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Assalamualaikum'){
conn.sendMessage(id, ' _Waalaikumsalam, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'p'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'P'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Halo'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Asu'){
conn.sendMessage(id, 'Lu Asw' ,MessageType.text);
}
else if (text == 'owner'){
conn.sendMessage(id, ' *Owner MUHAMMAD ROHID HIDAYAT Wa.me/+6282124946711* ' ,MessageType.text);
}
else if (text == 'creator'){
conn.sendMessage(id, ' *Creator MUHAMMAD ROHID HIDAYAT Wa.me/+6282124946711* ' ,MessageType.text);
}
else if (text == 'Pagi'){
conn.sendMessage(id, ' _Pagi juga, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Siang'){
conn.sendMessage(id, ' _Siang juga, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Sore'){
conn.sendMessage(id, ' _Sore juga, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Malam'){
conn.sendMessage(id, ' _Malam juga, Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Ngentod'){
conn.sendMessage(id, 'Pengen ngentod? Nikah sono ajg!!' ,MessageType.text);
}
else if (text == 'Anjing'){
conn.sendMessage(id, 'Jangan toxic goblok' ,MessageType.text);
}
else if (text == 'Bacot'){
conn.sendMessage(id, ' *lu yang bacot* ' ,MessageType.text);
}
else if (text == 'Tes'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Test'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Hai'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Woi'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Eoy'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Hi'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Gan'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Sis'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Bro'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Min'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Sayang'){
conn.sendMessage(id, ' _Iya aku disini sayang...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'I love u'){
conn.sendMessage(id, ' _love you too😻_ ' ,MessageType.text);
}
else if (text == 'Love you'){
conn.sendMessage(id, ' _love you too😻_ ' ,MessageType.text);
}
else if (text == 'Lope you'){
conn.sendMessage(id, ' _love you too😻_ ' ,MessageType.text);
}
else if (text == 'Mas'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Mba'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Bro'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Bre'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Cuy'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Euy'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Bot'){
conn.sendMessage(id, ' _Iya aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'makasi'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'Makasi'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'makasih'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'Makasih'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'tq'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'Tq'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'thank'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'Thank'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'thanks'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'Thanks'){
conn.sendMessage(id, ' _Sama sama, semoga harimu menyenangkan :)_ ' ,MessageType.text);
}
else if (text == 'guy lo'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *gay lo* ' ,MessageType.text);
}
else if (text == 'sticker'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *stiker* ' ,MessageType.text);
}
else if (text == 'sholat'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *jsholat* ' ,MessageType.text);
}
else if (text == 'bmkg'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *bmkg infogempa* ' ,MessageType.text);
}
else if (text == 'covid'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *covid19* ' ,MessageType.text);
}
else if (text == 'Menu'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *menu* ' ,MessageType.text);
}
else if (text == 'Nulis'){
conn.sendMessage(id, ' SALAH❗, ketikkan perintah *nulis* ' ,MessageType.text);
}

if (text.includes('nulis')){
  var teks = text.replace(/nulis /, '')
    axios.get('https://arugaz.herokuapp.com/nulis?teks='+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes("covidindo")){
const teks = text.replace(/covidindo /, "")
axios.get(`https://arugaz.herokuapp.com/api/coronaindo`).then((res) => {
conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
    let hasil = ` *🔎DATA WABAH COVID-19 TERBARU DI INDONESIA🔍* \n\n *Kasus Baru* : _${res.data.kasus_baru}_ \n\n *Kasus Total* : _${res.data.kasus_total}_ \n\n *Meninggal* : _${res.data.meninggal}_ \n\n *Negara* : _${res.data.negara}_ \n\n *Penanganan* : _${res.data.penanganan}_ \n\n *Sembuh* : _${res.data.sembuh}_ \n\n *Terakhir* : _${res.data.terakhir}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("covid19")){
const aris = text.replace(/covid19 /, "")
axios.get(`https://arugaz.herokuapp.com/api/corona?country=${aris}`).then((res) => {
conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `Negara : ${res.data.result.country}\n\nAktif : ${res.data.result.active}\nKasus :${res.data.result.casesPerOneMillion}\nKritis : ${res.data.result.critical}\nMeninggal : ${res.data.result.deathsPerOneMillion}\nPenanganan : ${res.data.result.recovered}\nDampak : ${res.data.result.testPerOneMillion}\nKasus hari ini : ${res.data.result.todayCases}\nKematian hari ini : ${res.data.result.todayDeath}\nTotal kasus : ${res.data.result.totalCases}\nTotal dampak : ${res.data.result.totalTest}`;
    conn.sendMessage(id, hasil ,MessageType.text);
  })
 }

if (text.includes("bmkg")){
  const aris = text.replace(/infogempa /, "")
  axios.get(`https://arugaz.herokuapp.com/api/infogempa`).then ((res) =>{
  conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
  let hasil = ` *Info Gempa* \n\ *Lokasi 📍* : _${res.data.lokasi}_ \n *Kedalaman 〽 ️* : _${res.data.kedalaman}_ \n *Koordinat ️📌* : _${res.data.koordinat}_ \n *Magnitude 💢* : _${res.data.magnitude}_ \n *Waktu ⏳* : _${res.data.waktu}_ `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("cuaca")){
const teks = text.replace(/cuaca /, "")
axios.get(`https://arugaz.herokuapp.com/api/cuaca?q=${teks}`).then((res) => {
conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `➸ Tempat : ${msg.data.tempat}\n➸ Angin : ${msg.data.angin}\n➸ Cuaca : ${msg.data.cuaca}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("jsholat")){
  const teks = text.replace(/jsholat /, "") 
  axios.get(`https://alfians-api.herokuapp.com/api/jadwalshalat?daerah=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
  let hasil = `Jadwal sholat hari ini adalah\n\nImsyak : ${res.data.Imsak}\nSubuh : ${res.data.Fajr} \nDzuhur : ${res.data.Dhuhr}\nAshar : ${res.data.Asr} \nMaghrib : ${res.data.Maghrib}\nIsya : ${res.data.Isha} \nTengah malam : ${res.Midnight} `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("resep")){
const teks = text.replace(/resep /, "")
axios.get(`https://masak-apa.tomorisakura.vercel.app/api/search/?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
    let hasil = ` *Judul:* ${results.title}\n*Penulis:* ${results.author.user}\n*Rilis:* ${results.author.datePublished}\n*Level:* ${results.dificulty}\n*Waktu:* ${results.times}\n*Porsi:* ${results.servings}\n\n*Bahan-bahan:*\n${bahan}\n\n*Step-by-step:*\n${tutor}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

   if (text == 'quran'){
axios.get(`https://api.banghasan.com/quran/format/json/acak`).then((res) => {
    conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text == 'quran2'){
 const teks = text.replace(/quran2 /, "")
axios.get(`https://api.banghasan.com/quran/format/json/surat/{teks}/ayat/{teks}`).then((res) => {
    conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
    let hasil = `Nama surat *${teks}* \n\Arti : ${res.data.keterangan}\nAyat : ${res.data.ayat} \nIsi : ${res.data.ar.teks} `;
  conn.sendMessage(id, hasil, MessageType.text);
})
}

if (text.includes("quotes"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
      conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
            let $ = cheerio.load(result.data);
            var author = $('a[class="auteurfbnaam"]').contents().first().text();
            var kata = $('q[class="fbquote"]').contents().first().text();

            conn.sendMessage(
               id,
               `
     _${kata}_
        
    
	*~${author}*
         `, MessageType.text
            );

         });
  }

if (text.includes("nama")) 
  {
    const cheerio = require('cheerio');
    const request = require('request');
    var nama = text.split("nama ")[1];
    var req = nama.replace(/ /g,"+");
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',
      },function(error, response, body){
          let $ = cheerio.load(body);
          var y = $.html().split('arti:')[1];
          var t = y.split('method="get">')[1];
          var f = y.replace(t ," ");
          var x = f.replace(/<br\s*[\/]?>/gi, "\n");
          var h  = x.replace(/<[^>]*>?/gm, '');
      console.log(""+ h);
      conn.sendMessage(id,
            `
      ❣Arti dari namamu adalah❣️


         Nama _*${nama}*_ ${h}


`,
 MessageType.text);
  });
  }
  else if (text.includes("pasangan ")) {
    const request = require('request');
    var gh = text.split("pasangan ")[1];
    var namamu = gh.split("&")[0];
    var pasangan = gh.split("&")[1];
    request.get({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+',

    },function(error, response, body){
        let $ = cheerio.load(body);
      var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
        var t = y.split('.<br><br>')[1];
        var f = y.replace(t ," ");
        var x = f.replace(/<br\s*[\/]?>/gi, "\n");
        var h  = x.replace(/<[^>]*>?/gm, '');
        var d = h.replace("&amp;", '&')
      console.log(""+ d);
      conn.sendMessage(id, `



 *❣Kecocokan berdasarkan nama❣*


 ${d}



    `, MessageType.text);
  });
  }

if (text.includes("zodiak")){
const teks = text.split("zodiak")[1]
axios.get(`https://arugaz.herokuapp.com/api/getzodiak?nama=${teks}&tgl-bln-thn=${teks}`).then((res) => {
    conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
    let hasil = `➸ Lahir : ${res.data.lahir}\n➸ Ultah : ${res.data.ultah}\n➸  ️Usia : ${res.data.usia}\n➸ Zodiak : ${res.data.zodiak} ️`;
    conn.sendMessage(id, hasil ,MessageType.text);
  })
 }

if (text.includes("gay lo")){
const gay = text.replace(/gay lo /, "")
axios.get(`https://arugaz.herokuapp.com/api/howgay`).then((res) => {
    conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
    let hasil = ` ${res.data.desc} \n\n *Tingkat Gay* : _${res.data.persen}_%`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("bucin lo")){
const gay = text.replace(/bucin lo /, "")
axios.get(`https://arugaz.herokuapp.com/api/howbucins`).then((res) => {
    conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
    let hasil = ` ${res.data.desc} \n\n *Tingkat Bucin* : _${res.data.persen}_%`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("alay")){
	const alay = text.split("alay")[1]
	axios.get(`https://api.terhambar.com/bpk?kata=${alay}`).then ((res) => {
    conn.sendMessage(id, '[WAIT] Sedang diproses⏳ silahkan tunggu sebentar...', MessageType.text)
		let hasil = `${res.data.text}`
		conn.sendMessage(id, hasil, MessageType.text)
	})
}

   if (text.includes("ptlcowo"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl", "remaja cantik", "cewek korea", "cewek jepang"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
	var buf = Buffer.from(response, 'base64'); // Ta-da	
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }

   if (text.includes("ptlcewe"))
   {
    var items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy", "cowok indo ganteng", "cowok korea"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;
    
    axios.get(url)
      .then((result) => {
        var z = JSON.parse(JSON.stringify(result.data));
        var cowok =  z[Math.floor(Math.random() * z.length)];
        imageToBase64(cowok) 
        .then(
            (response) => {
  conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
  var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

if (text.includes("chord")){
const teks = text.replace(/chord /, "")
axios.get(`https://alfians-api.herokuapp.com/api/chord?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
    let hasil = `*Nih Chord Lagu ${teks}* \n\nChord: _${res.data.result}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("lirik")){
	const teks = text.split("lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	     conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
	 	let hasil = `🎶Nih Lirik🎶 Lagu ${teks} \n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text)
	})
}

if (text.includes("film")){
const teks = text.replace(/film /, "")
axios.get(`https://arugaz.herokuapp.com/api/sdmovie?film=${teks}`).then((res) => {
conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = ` *Film Anime ${teks} :* \n\n *Judul:* _${res.data.result.title}_ \n\n *Rating:* _${res.data.result.rating}_ \n\n *Info:* _${res.data.result.sinopsis}_ \n\n *Link Video:* _${res.data.result.video}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("tiktok")) {
const tictoc = text.replace(/tiktok /, "")
axios.get(`http://scrap.terhambar.com/tiktokfull?link=${tictoc}`).then((res) => {
	 conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
     let titoe = `âœ…Berhasil$$$ Silahkan klik link dibawah ini untuk mendownload hasilnya$ \nKlik link dibawahðŸ—¡ï¸\n\nJudul: ${res.data.deskripsi} \n\nDurasi: ${res.data.durasi}\n\nNama: ${res.data.nama}\n\nUrl: ${res.data.urlvideo}`;
conn.sendMessage(id, titoe, MessageType.text);
})
}

if (text.includes("yta")){
const teks = text.replace(/yta /, "")
axios.get(`https://arugaz.herokuapp.com/api/yta?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `Lagu Berhasil Di Download, silahkan klik link dan download hasilnya\nKlik link dibawah\n\nJudul: ${res.data.title}\n\nUkuran audio: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("ytv")){
const teks = text.replace(/ytv /, "")
axios.get(`https://arugaz.herokuapp.com/api/ytv?url=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `Video Berhasil Di Download, silahkan klik link dan download hasilnya\nKlik link dibawah\n\nJudul: ${res.data.title}\n\nUkuran video: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("fb")){
const teks = text.replace(/fb /, "")
axios.get(`https://arugaz.herokuapp.com/api/fb?url=${teks}`).then((res) => {
    conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `Nih BosQ Pilih...\n\n *Revolusi SD*: ${res.data.result.sd}\n\n *Rovolusi HD:* ${res.data.result.hd}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes('igstalk')){
  var teks = text.replace(/igstalk /, '')
    axios.get('https://arugaz.herokuapp.com/api/stalk?username='+teks)
    .then((res) => {
     conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
      imageToBase64(res.data.Profile_pic)
        .then(
          (ress) => {                                                                                                                                    var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes("infoanime")){
const teks = text.replace(/infoanime /, "")
axios.get(`https://arugaz.herokuapp.com/api/dewabatch?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = ` *INFO ANIME ${teks} :* \n\n ${res.data.result}_`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("loli"))
   {
    var items = ["anime loli","anime loli sange","anime loli fackgirll","anime loli i love you"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
       conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    
    });
    }

if (text.includes("animehd"))
   {
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic", "anime hd", "gambar anime hd"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
        conn.sendMessage(id, '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
	var buf = Buffer.from(response, 'base64'); 
              conn.sendMessage(
            id,
              buf,MessageType.image)
       
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
      });
    }

if (text.includes('tts')){
  var teks = text.replace(/tts /, '')
    axios.get('http://scrap.terhambar.com/tts?kata=${teks}')
    .then((res) => {
      audioToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[WAIT] Sedang proses...❗', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.audio)
        })
    })
}

 if (text.includes('simi')){
  var teks = text.replace(/simi /, '')
    axios.get('https://arugaz.herokuapp.com/api/simisimi?kata=${teks}+simi&apikey=nEYdtRufbqjadoZIRWwooiMmpwI8VoC0CzDdiYHB').then((res) => {
    let hasil = ` *SimSimi* : _${res.data.result}_ `;
conn.sendMessage(id, hasil ,MessageType.text);
})
}
})
