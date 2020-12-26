const XBOT = 'ROHIDXBOT'; 
const instagram = 'https://bit.ly/2KYlka9'; 
const nomer = 'Wa.me/+6282124946711'; 
const aktif = 'Tergantung internet';

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
   console.log(`[ ${moment().format("HH:mm:ss")} ] Please Scan QR with app!`);
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


// Groups

if (text.includes("!buatgrup"))
   {
var nama = text.split("!buatgrup")[1].split("-nomor")[0];
var nom = text.split("-nomor")[1];
var numArray = nom.split(",");
for ( var i = 0; i < numArray.length; i++ ) {
    numArray[i] = numArray[i] +"@s.whatsapp.net";
}
var str = numArray.join("");
console.log(str)
const group = await conn.groupCreate (nama, str)
console.log ("created group with id: " + group.gid)
conn.sendMessage(group.gid, "hello everyone", MessageType.extendedText) // say hello to everyone on the group

}

// FF
if(text.includes("!cek")){
var num = text.replace(/!cek/ , "")
var idn = num.replace("0","+62");

console.log(id);
const gg = idn+'@s.whatsapp.net'

const exists = await conn.isOnWhatsApp (gg)
console.log(exists);
conn.sendMessage(id ,`${gg} ${exists ? " exists " : " does not exist"} on WhatsApp`, MessageType.text)
}
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
   if (text.includes("yt"))
   {
      const url = text.replace(/!yt/, "");
      const exec = require('child_process').exec;

      var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

      const ytdl = require("ytdl-core")
      if (videoid != null)
      {
         console.log("video id = ", videoid[1]);
      }
      else
      {
         conn.sendMessage(id, "gavalid", MessageType.text)
      }
      ytdl.getInfo(videoid[1]).then(info =>
      {
         if (info.length_seconds > 1000)
         {
            conn.sendMessage(id, " videonya kepanjangan", MessageType.text)
         }
         else
         {

            console.log(info.length_seconds)

            function os_func()
            {
               this.execCommand = function (cmd)
               {
                  return new Promise((resolve, reject) =>
                  {
                     exec(cmd, (error, stdout, stderr) =>
                     {
                        if (error)
                        {
                           reject(error);
                           return;
                        }
                        resolve(stdout)
                     });
                  })
               }
            }
            var os = new os_func();

            os.execCommand('ytdl ' + url + ' -q highest -o mp4/' + videoid[1] + '.mp4').then(res =>
            {
		const buffer = fs.readFileSync("mp4/"+ videoid[1] +".mp4")
               conn.sendMessage(id, buffer, MessageType.video)
            }).catch(err =>
            {
               console.log("os >>>", err);
            })

         }
      });

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
conn.sendMessage(id, 'Pengin ngentod? babi looo' ,MessageType.text);
}
else if (text == 'Anjing'){
conn.sendMessage(id, 'Jangan toxic anjing,kntl,babi,monyet' ,MessageType.text);
}
else if (text == 'Bacot'){
conn.sendMessage(id, ' *lu bacot_-* ' ,MessageType.text);
}
else if (text == 'Tes'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Test'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Hai'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Woi'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Eoy'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *#menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Hi'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Gan'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Sis'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Bro'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Min'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Sayang'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
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
conn.sendMessage(id, ' _love you too😻_ ' ,MessageType.text);
}
else if (text == 'Mba'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Bre'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Cuy'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
}
else if (text == 'Euy'){
conn.sendMessage(id, ' _Iyah aku disini kak...ada yang bisa kami bantu? Ketik *menu* untuk melihat fitur bot kami🙏_ ' ,MessageType.text);
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

   if (text.includes('nulis')){
  var teks = text.replace(/nulis /, '')
    axios.get('https://bangandre.herokuapp.com/nulis?teks='+teks)
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

if (text.includes("covid"))
   {
const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {

    }).json();
    var positif = (body[0]['positif']);
    var sembuh  = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id,` *🔎DATA WABAH COVID-19 TERBARU DI INDONESIA🔍* \n\n *📈Positif ==>* _${positif}_ \n📉 *Sembuh ==>* _${sembuh}_ \n *📋Meninggal ==>* _${meninggal}_ \n *🗒️Dirawat ==>* _${dirawat}_ `, MessageType.text);
}

   if (text == 'quran'){
axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
    const sr = /{(.*?)}/gi;
    const hs = res.data.acak.id.ayat;
    const ket = `${hs}`.replace(sr, '');
    let hasil = `[${ket}]   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

   if (text.includes("quotes"))
   {
      var url = 'https://jagokata.com/kata-bijak/acak.html'
      axios.get(url)
         .then((result) =>
         {
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

   if (text.includes("bijak")){
const teks = text.replace(/#katabijak /, "")
axios.get(`https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt${teks}`).then((res) => {
    let hasil = `katabijak tersedia\n👇👇👇👇👇👇👇👇👇\n\nJudul: ${res.data.title}\n\katabijak Tersedia: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("fakta")){
const teks = text.replace(/fakta /, "")
axios.get(`https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt${teks}`).then((res) => {
    let hasil = `fakta tersedia\n👇👇👇👇👇👇👇👇👇\n\nJudul: ${res.data.title}\n\fakta Tersedia: ${res.data.filesize}\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

   if (text.includes("ptl1"))
   {
    var items = ["ullzang girl", "cewe cantik", "hijab cantik", "korean girl"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
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

if (text.includes("ptl2"))
   {
    var items = ["cowo tampan", "cowo ganteng", "cowo cakep", "korean boy"];
    var cowo = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cowo;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cowok) // Path to the image
        .then(
            (response) => {
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

if (text.includes("randomanime"))
   {
    var items = ["anime girl", "anime cantik", "anime", "anime aesthetic"];
    var cewe = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
    
    axios.get(url)
      .then((result) => {
        var b = JSON.parse(JSON.stringify(result.data));
        var cewek =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(cewek) // Path to the image
        .then(
            (response) => {
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

if (text.includes("chord")){
const teks = text.replace(/chord /, "")
axios.get(`https://alfians-api.herokuapp.com/api/chord?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Searching...⏳', MessageType.text)
    let hasil = `*Nih Chord Gitar ${teks} kak* \n\nCord: _${res.data.result}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("twt")){
const teks = text.replace(/twt /, "")
axios.get(`https://mhankbarbar.herokuapp.com/api/twit?url=${teks}&apiKey=zFuV88pxcIiCWuYlwg57`).then((res) => {
	conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
    let hasil = `âœ…Berhasil$ silahkan klik link di bawah untuk mendownload hasilnya$\nKlik link dibawahðŸ—¡ï¸\n\nSize: ${res.data.filesize}\n\nLink: ${res.data.result}`;
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

if (text.includes("fb")){
const teks = text.replace(/fb /, "")
axios.get(`https://arugaz.herokuapp.com/api/fb?url=${teks}`).then((res) => {
    let hasil = `Nih BosQ Pilih...\n\n *Revolusi SD*: ${res.data.result.sd}\n\n *Rovolusi HD:* ${res.data.result.hd}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("ig")){
const teks = text.replace(/ig /, "")
axios.get(`https://alfians-api.herokuapp.com/api/ig?url=${teks}`).then((res) => {
    let hasil = `✅Dwonload sendiri link error maaf\n\nLink: ${res.data.result}`;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("infoanime")){
const teks = text.replace(/infoanime /, "")
axios.get(`https://arugaz.herokuapp.com/api/dewabatch?q=${teks}`).then((res) => {
	conn.sendMessage(id, '[WAIT] Proses...❗', MessageType.text)
    let hasil = ` *INFO ANIME ${teks} :* \n\n _${res.data.result}_ `;
    conn.sendMessage(id, hasil ,MessageType.text);
})
}

if (text.includes("scdl")){
const fs = require("fs");
const scdl = require("./lib/scdl");

scdl.setClientID("iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX");

scdl("https://m.soundcloud.com/abdul-muttaqin-701361735/lucid-dreams-gustixa-ft-vict-molina")
    .pipe(fs.createWriteStream("mp3/song.mp3"));
}



 else if (text.includes("tts")) {
  var teks = text.split("ttsid ")[1];
  var path = require('path');
  var text1 = teks.slice(6);
  text1 = suara;
  var suara = text.replace(/!ttsid/g, text1);
  var filepath = 'mp3/bacot.wav';
  
  
/*
 * save audio file
 */

gtts.save(filepath, suara, function() {
  console.log(`${filepath} MP3 SAVED!`)
});
await new Promise(resolve => setTimeout(resolve, 500));

	if(suara.length > 200){ // check longness of text, because otherways google translate will give me a empty file
  msg.reply("Text to long, split in text of 200 characters")
}else{

const buffer = fs.readFileSync(filepath)
	conn.sendMessage(id , buffer , MessageType.audio);

};


}






   // end of file


})
