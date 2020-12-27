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
else if (text == 'Bro'){
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
else if (text == '!menu'){
conn.sendMessage(id, '*SALAH!!* Masukan perintah *menu* ' ,MessageType.text)
}                                    
else if (text == 'nama'){
conn.sendMessage(id, '*SALAH!!* contoh: nama Rendy' ,MessageType.text)
}
else if (text == 'pasangan'){
conn.sendMessage(id, '*SALAH!!* contoh: !lpasangan Rendy & Reina' ,MessageType.text)
}

else if (text == '!listzodiak'){
conn.sendMessage(id, '*SALAH!!* Masukan perintah listzodiak' ,MessageType.text)
}
else if (text == '!zodiak'){
conn.sendMessage(id, '*SALAH!!* Masukan perintah zodiak contoh : zodiak Scorpio' ,MessageType.text)
}
else if (text == '!stiker'){
conn.sendMessage(id, '*SALAH!!* masukan gambar dengan caption stiker' ,MessageType.text)

if (text == 'zodiak Aries'){
conn.sendMessage(id, '*zodiak Aries* Aries: 21 Maret - 20 April Pemilik zodiak Aries merupakan sosok yang pemberani dan memiliki jiwa petualang yang besar. Mereka adalah orang yang kreatif, agresif, dan berani berinisiatif untuk melakukan perubahan. Selain itu, sifat dan karakter zodiak Aries juga pantang menyerah, enerjik, pandai beradaptasi, serta cepat belajar. Namun, zodiak berlambang domba jantan ini memiliki sifat keras kepala, ambisius, dan kerap mengambil risiko tanpa berpikir panjang. ' ,MessageType.text)
}
else if (text == 'zodiak Taurus'){
conn.sendMessage(id, '*zodiak Taurus* Taurus: 21 April - 20 Mei Nalurimu sedang bekerja keras hari ini dan kamu harus mempercayai mereka dan melakukan apa yang mereka katakan. Meskipun semua orang di sekitarmu tidak setuju dan mengikuti jalan yang berbeda, kamu harus tetap berpegang pada jalanmu sendiri. Ini mungkin akan menjadi keputusan yang sulit untuk dibuat, tetapi kamu akan segera menuai hasilnya.' ,MessageType.text)
}
else if (text == 'zodiak Gemini'){
conn.sendMessage(id, '*zodiak Gemini* Gemini: 21 Mei - 20 Juni Kamu tidak meluangkan waktu untuk menyelesaikan masalah sepele. Hari ini mereka telah menumpuk untuk tampil besar. Hari ini kamu merasa dirimu terjerat. Masalahnya menjadi rumit dan kamu tidak tahu harus mulai dari mana. Dianjurkan untuk berbicara tatap muka. Di penghujung hari, mungkin kamu akan merasa nyaman berada di dekat pasangan.' ,MessageType.text)
}
else if (text == 'zodiak Cancer'){
conn.sendMessage(id, '*zodiak Cancer* Cancer: 21 Juni - 20 Juli Perdebatan kecil cenderung muncul sepanjang hari. Penting bagi Anda untuk mengabaikan masalah kecil hari ini. Jika tidak, Anda hanya akan menghancurkan kedamaian pikiran Anda sendiri. Cobalah untuk berbagi masalah Anda dengan seseorang karena ini bisa sangat membantu dalam meningkatkan mood Anda. Merencanakan aktivitas sendiri bisa menjanjikan hari ini.' ,MessageType.text)
}
else if (text == 'zodiak Leo'){
conn.sendMessage(id, '*zodiak Leo* Leo: 21 Juli - 21 Agustus sangat pendendam, mereka tidak akan pernah melupakan kejadian bersejarah yang paling pahit yang telah mereka terima, mereka tidak bisa berbasa-basi kepada orang-orang yang telah menyakiti mereka, jika mereka sudah tidak suka dengan seseorang, mereka akan menunjukannya, tetapi berbanding terbalik kepada pasangannya mereka sangat pemaaf tetapi untuk orang lain dia sangat pendendam.' ,MessageType.text)
}
else if (text == 'zodiak Virgo'){
conn.sendMessage(id, '*zodiak Virgo* Virgo: 22 Agustus - 22 Pada dasarnya orang dengan karakter zodiak Virgo adalah orang yang cenderung pendiam. Meski demikian sikap dewasa dan diplomatis yang tinggi membuat mereka mudah dalam menyesuaikan lingkungan pertemanan. Tidak sulit bagi mereka untuk mencari teman baru di lingkungannya.' ,MessageType.text)
}
else if (text == 'zodiak Libra'){
conn.sendMessage(id, '*zodiak libra* Libra: 23 September - 22 Oktober dikenal sebagai sosok yang dapat bekerja sama, diplomatis, ramah, berpikiran adil, dan memiliki jiwa sosial yang tinggi. Mereka juga menyukai kelembutan, berbagi dengan orang lain, dan berjalan-jalan ke luar rumah. Sosok yang lahir dengan zodiak ini sangat tidak menyukai kekerasan, ketidakadilan, dan suara yang bising.' ,MessageType.text)
}
else if (text == 'zodiak Scorpio'){
conn.sendMessage(id, '*zodiak Scorpio* Scorpio: 23 Oktober - 22 November sendiri juga dipengaruhi oleh elemen air yang membuat mereka tampak terlihat tenang namun juga elemen ini mempengaruhi tindakan dan dorongan emosi yang kuat dari pribadi pemilik zodiak scorpio sendiri. Terkadang mereka cenderung impulsif dan tidak mampu mengendalikan luapan perasaannya sendiri. Bagi scorpio, emosi harus diekspresikan untuk menikmati setiap moment yang terjadi saat itu juga. Namun uniknya mereka mewujudkan emosi tersebut dengan cara yang berbeda dari pemilik zodiak lainnya.' ,MessageType.text)
}
else if (text == 'zodiak Sagittarius'){
conn.sendMessage(id, '*zodiak Sagitarius* Sagitarius: 23 November - 20 Desember terkenal berjiwa petualang, cerdas, serta memiliki pengetahuan yang luas. Mereka merupakan sosok yang percaya diri, optimis, dan selalu berpikir positif. Pemilik zodiak Sagitarius pada umumnya selalu jujur, terus terang, pintar membawa diri, dan menjadi sosok inspirasi bagi orang lain. Namun, karakter dan sifat zodiak Sagitarius yang terlalu berterus terang dan percaya diri berlebihan kadang membuat mereka tersandung masalah.berjiwa Petualang, Begini Karakter dan Sifat Zodiak Sagitarius ' ,MessageType.text)
}
else if (text == 'zodiak Capricorn'){
conn.sendMessage(id, '*zodiak Capricon* Capricorn: 21 Desember - 19 Januari sosok yang ambisius. Namun, perlu diketahui bahwa ambisius dalam konteks ini tidak sepenuhnya bersifat negatif. Capricon sangat tahu apa yang mereka inginkan dan apa yang mereka tuju, sehingga ketika mereka memiliki suatu tujuan yang ingin dicapai, maka mereka tidak akan pernah berhenti untuk berusaha.Selain itu, sifat disiplin dan bertanggung jawab juga menjadi salah satu kelebihan dari Capricon.Mereka juga dikenal sebagai sosok yang dewasa, terutama dalam menyikapi permasalahan yang tengah dihadapi. Karena hal itulah, mereka sangat bijaksana dan setia kawan. Kedua karakter yang dimiliki tersebut menjadikan zodiak Capricon sangat cocok untuk dijadikan sebagai sahabat dan tempat untuk meminta saran.Orang yang lahir dalam naungan zodiak Capricon lebih pintar dalam mengatur keuangan dan berhati-hati dalam mengambil keputusan, dan karena hal itu pula mereka juga cenderung memiliki hidup yang lebih stabil. ' ,MessageType.text)
}
else if (text == 'zodiak Aquarius'){
conn.sendMessage(id, '*zodiak Aquarius* Aquarius: 20 Januari - 18 Februari Pemilik zodiak kesebelas ini kebanyakan memiliki sifat pemalu dan terkesan pendiam, tapi mereka juga bisa sangat energik dan agresif. Mereka juga termasuk orang pemikir serta mampu melihat jauh ke depan sekaligus dari kedua sisi permasalahan tanpa prasangka. Kemampuan itu cenderung membuat mereka mudah menyelesaikan masalah.Dengan sifat dan karakter zodiak Aquarius yang visioner tersebut, dia mampu memahami masa depan dan tahu persis apa yang ingin dilakukan lima atau sepuluh tahun ke depan.Sementara kelemahan mereka yakni sangat temperamental, emosional, sulit diprediksi, keras kepala, dan lebih suka menyendiri yang cenderung memisahkan diri dengan orang lain.Tak heran bila mereka sangat individualistis dan sulit berkelompok. Aquarius memiliki kebutuhan untuk menyendiri dan menjauh dari segalanya. Hal ini dianggap berguna untuk membantu memulihkan kekuatannya' ,MessageType.text)
}
else if (text == 'zodiak Pisces'){
conn.sendMessage(id, '*zodiak Pisces* Pisces: 19 Februari - 20 Maret rela berkorban untuk membantu orang lain semampu mereka. Pisces mau melakukan yang terbaik untuk membantu siapa pun dengan cara apa pun yang dia bisa. Biasanya, Pisces akan mendengarkan dulu yang dikatakan orang lain sebelum dia mengungkapkan pendapatnya. Hanya orang yang tulus hatinya yang mampu berempati. Pisces akan berdiri di samping teman-temannya yang membutuhkan bantuannya dan menyelami pikiran dan hati mereka. Pisces adalah pendengar dan pengamat yang sangat baik yang memiliki pikiran intuitif untuk meramalkan atau memprediksi apa yang akan terjadi dalam waktu dekat.Intuisi akan menjadi suara batin bagi Pisces yang membantunya mencari petunjuk di sekitar orang lain dan menggunakan informasi yang dikumpulkan untuk membuat perkiraan perkiraan.' ,MessageType.text)



   if (text.includes('nulis')){
  var teks = text.replace(/nulis /, '')
    axios.get('https://mhankbarbars.herokuapp.com/nulis?text='+teks)
    .then((res) => {
      imageToBase64(res.data.result)
        .then(
          (ress) => {
            conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
            var buf = Buffer.from(ress, 'base64')
            conn.sendMessage(id, buf, MessageType.image)
        })
    })
}

if (text.includes("covidindo"))
   {
const get = require('got')
    const body = await get.post('https://api.kawalcorona.com/indonesia', {

    }).json();
    var positif = (body[0]['positif']);
    var sembuh  = (body[0]['sembuh']);
    var meninggal = (body[0]['meninggal']);
    var dirawat = (body[0]['dirawat']);
    console.log(body[0]['name'])
    conn.sendMessage(id,`❣covid -indonesia❣\n\nPositif ==> ${positif} \nSembuh ==> ${sembuh} \nMeninggal ==> ${meninggal}\nDirawat ==> ${dirawat}`, MessageType.text);
}

if (text.includes("covidnegara")){
const aris = text.replace(/covidnegara /, "")
axios.get(`https://arugaz.herokuapp.com/api/corona?country=${aris}`).then((res) => {
conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    let hasil = `Negara : ${res.data.result.country}\n\nActive : ${res.data.result.active}\ncasesPerOneMillion :${res.data.result.casesPerOneMillion}\ncritical : ${res.data.result.critical}\ndeathsPerOneMillion : ${res.data.result.deathsPerOneMillion}\nrecovered : ${res.data.result.recovered}\ntestPerOneMillion : ${res.data.result.testPerOneMillion}\ntodayCases : ${res.data.result.todayCases}\ntodayDeath : ${res.data.result.todayDeath}\ntotalCases : ${res.data.result.totalCases}\ntotalTest : ${res.data.result.totalTest}`;
    conn.sendMessage(id, hasil ,MessageType.text);
  })
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

if (text.includes("sholat")){
  const teks = text.replace(/sholat /, "")
  axios.get(`https://mhankbarbar.herokuapp.com/api/jadwalshalat?daerah=${teks}`).then ((res) =>{
  conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
  let hasil = `Jadwal sholat di ${teks} hari ini adalah\n\nImsyak : ${res.data.Imsyak}\nSubuh : ${res.data.Subuh} \nDzuhur : ${res.data.Dzuhur}\nAshar : ${res.data.Ashar} \nMaghrib : ${res.data.Maghrib}\nIsya : ${res.data.Isya} \nTengah malam : ${res.data.Dhuha} `;
  conn.sendMessage(id, hasil, MessageType.text);
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
const teks = text.replace(/bijak /, "")
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

if (text.includes("nama")) 
  {
    const cheerio = require('cheerio');
    const request = require('request');
    var nama = text.split("!nama ")[1];
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
const teks = text.split("chord")[1]
    axios.get(`https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama=${teks}`).then ((res) => {
         conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.tex)
        let hasil = `❣ ️ *chord music* ❣ ️${teks} \n\n\n ${res.data.result.lirik}`
    conn.sendMessage(id, hasil, MessageType.text)

if (text.includes("lirik")){
	const teks = text.split("lirik")[1]
	axios.get(`http://scrap.terhambar.com/lirik?word=${teks}`).then ((res) => {
	     conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
	 	let hasil = `🎶lirik🎶 lagu ${teks} \n\n\n ${res.data.result.lirik}`
	conn.sendMessage(id, hasil, MessageType.text)
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

if (text.includes("loli"))
   {
    var items = ["anime loli","anime loli sange","anime loli fackgirll","anime loli i love you"];
    var nime = items[Math.floor(Math.random() * items.length)];
    var url = "https://api.fdci.se/rep.php?gambar=" + nime;
    
    axios.get(url)
      .then((result) => {
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
        var n = JSON.parse(JSON.stringify(result.data));
        var nimek =  n[Math.floor(Math.random() * n.length)];
        imageToBase64(nimek) 
        .then(
            (response) => {
    conn.sendMessage(id, '[WAIT] Searching...❗', MessageType.text)
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

if (text.includes("scdl")){
const fs = require("fs");
const scdl = require("./lib/scdl");

scdl.setClientID("iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX");

scdl("https://m.soundcloud.com/abdul-muttaqin-701361735/lucid-dreams-gustixa-ft-vict-molina")
    .pipe(fs.createWriteStream("mp3/song.mp3"));
}



 if (text.includes("tts")){
const teks = text.replace(/tts /, "")
const gtts = (`https://rest.farzain.com/api/tts.php?id=${teks}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
conn.sendMessage(id, '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar', MessageType.text)
    conn.sendMessage(id, gtts ,MessageType.text);
}

//End off file

})
