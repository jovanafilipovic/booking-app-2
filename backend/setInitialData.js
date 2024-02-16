const db = require('./db');
//const Item = require('./models/item');
const Sport = require('./models/sport');
const Location = require('./models/location');
const Court = require('./models/court');

const courts = [
  { id: 1, itemType: 'court', name: 'Košarkaški tereni Partizan', address: 'Kalemegdan gornji grad bb, 11158 Beograd', municipality: 'Stari grad', sports: ['Košarka'], images: ['https://kkpartizan.rs/uploads/cover/1498072473594ac599122e5.jpg', 'https://www.011info.com/uploads/Magazin/2021/09/02/1387/Teren%20KK%20Partizan%20-%20Milena%20Arseni%C4%87.jpg'] },
  { id: 2, itemType: 'court', name: 'Tenis klub Monolith', address: 'Južni bulevar 69, 11118 Beograd', municipality: 'Vračar', sports: ['Tenis'], images: ['https://fastly.4sqi.net/img/general/600x600/43099226_Dvago9raaQpxkZzoD3s-t89k6S4HHjxDYDJNP0aG4oo.jpg'] },
  { id: 3, itemType: 'court', name: 'Teniski klub Gemax', address: 'Rajka Mitića 28B, 11040 Beograd', municipality: 'Savski Venac', sports: ['Tenis'], images: ['https://www.nadjidom.com/images/photos/large/2015/esdj4fzeqz-4.png'] },
  { id: 4, itemType: 'court', name: 'Teniski klub SA&NI', address: 'Čarlija Čaplina 39, 11108 Beograd', municipality: 'Palilula', sports: ['Tenis'], images: ['https://www.sanitennis.com/upload/Gallery/Galleries/2015-06/Sani_Tennis_27.jpg'] },
  { id: 5, itemType: 'court', name: 'Teniski klub Aradinović', address: 'Pante Srećkovića bb, 11060 Beograd', municipality: 'Zvezdara', sports: ['Tenis'], images: ['https://www.kolubarske.rs/images/cms-image-000001332.jpg'] },
  { id: 6, itemType: 'court', name: 'Omladinski teniski klub Beograd', address: 'Dragoslava Srejovića 1B, 11060 Beograd', municipality: 'Palilula', sports: ['Tenis'], images: ['https://www.mojaekipa.com/wp-content/uploads/2017/04/sm1-768x499.gif'] },
  { id: 7, itemType: 'court', name: 'Teniski centar Akademija Tipsarević - Olimp', address: 'Vjekoslava Kovača 11, 11000 Beograd', municipality: 'Zvezdara', sports: ['Tenis'], images: ['https://cdn.navidiku.rs/firme/galerija1/s48562/velike/teniska-akademija-tipsarevic126673.jpg'] },
  { id: 8, itemType: 'court', name: 'Sportski centar Agrimes', address: 'Marka Čelebonovića 2, 11077 Beograd', municipality: 'Novi Beograd', sports: ['Tenis'], images: ['https://www.tenisklubagrimes.rs/uploaded/prva-strana/046.jpg', 'https://www.tenisklubagrimes.rs/uploaded/prva-strana/029.jpg', 'https://www.tenisklubagrimes.rs/uploaded/prva-strana/004.jpg'] },
  { id: 9, itemType: 'court', name: 'Teniski centar Novak', address: 'Tadeuša Košćuška 63A, 11158 Beograd', municipality: 'Stari grad', sports: ['Tenis'], images: ['https://www.simsic.rs/uploaded_pictures/content/articles/600x450/tenis-centar-novak-89.jpg', 'https://i0.wp.com/belgradespots.com/wp-content/uploads/job-manager-uploads/main_image/2018/03/novak-djokovic-tennis-center-belgrade-spots-4.jpg?fit=960%2C635&ssl=1'] },
  { id: 10, itemType: 'court', name: 'Teniski klub Balans', address: 'Naselje Zemun Polje Mala pruga 39A, 11283 Beograd', municipality: 'Zemun', sports: ['Tenis'], images: ['https://balans.rs/images/balans04.png', 'https://balans.rs/images/balans07.png']},
  { id: 11, itemType: 'court', name: 'Teniski klub Banja', address: 'Višnjička 113A, 11060 Beograd', municipality: 'Palilula', sports: ['Tenis'], images: ['https://www.tkelite.com/assets/images/8/Elite-tereni-1-70a4d954.png'] },
  { id: 12, itemType: 'court', name: 'Teniski klub Classics', address: 'Gramšijeva 11, 11070 Beograd', municipality: 'Novi Beograd', sports: ['Tenis'], images: ['https://www.mojaekipa.com/wp-content/uploads/2017/04/Classic-768x499.gif', 'https://www.mojaekipa.com/wp-content/uploads/2017/04/Classic-4-768x499.gif', 'https://www.mojaekipa.com/wp-content/uploads/2017/04/Classic-2-768x499.gif'] },
  { id: 13, itemType: 'court', name: 'Teniski klub Colonial Sun', address: 'Bulevar vojvode Putnika 32-34, 11000 Beograd', municipality: 'Savski Venac', sports: ['Tenis'], images: ['https://www.mojaekipa.com/wp-content/uploads/2017/04/Colonial-10-768x499.gif', 'https://www.mojaekipa.com/wp-content/uploads/2017/04/Colonial-3-768x499.gif'] },
  { id: 14, itemType: 'court', name: 'Teniski klub Gazela', address: 'Bulevar Arsenija Čarnojevića 59A, 11073 Beograd', municipality: 'Novi Beograd', sports: ['Tenis'], images: ['https://www.weisslight.eu/wp-content/uploads/2020/09/IGO_2001b.jpg'] },
  { id: 15, itemType: 'court', name: 'Teniski klub Green Set', address: 'Jakova Galusa 20, 11222 Beograd', municipality: 'Rakovica', sports: ['Tenis'], images: [''] },
  { id: 16, itemType: 'court', name: 'Teniski klub Lokomotiva', address: 'Lole Ribara bb, 11000 Beograd', municipality: 'Čukarica', sports: ['Tenis'] },
  { id: 17, itemType: 'court', name: 'Teniski klub Partizan', address: 'Humska 1, 11040 Beograd', municipality: 'Savski Venac', sports: ['Tenis'] },
  { id: 18, itemType: 'court', name: 'Teniski klub San Marco', address: 'Sjenička 1, 11050 Beograd', municipality: 'Vračar', sports: ['Tenis'] },
  { id: 19, itemType: 'court', name: 'Teniski klub Senjak', address: 'Simićeva 5A, 11040 Beograd', municipality: 'Savski Venac', sports: ['Tenis'] },
  { id: 20, itemType: 'court', name: 'Teniski klub Ušće', address: 'Milentija Popovića 16A, 11070 Beograd', municipality: 'Novi Beograd', sports: ['Tenis'] },
  { id: 21, itemType: 'court', name: 'Teniski tereni Ada ciganlija', address: 'Ada ciganlija bb, 11000 Beograd', municipality: 'Čukarica', sports: ['Tenis'], images: ['https://ocdn.eu/pulscms-transforms/1/xmfk9kpTURBXy8zZWQ1Y2E4MWRkYTcxZWJhYTMzMDJkNzIyY2I2NTE1NS5qcGeRkwLNBLAA3gABoTAB', 'https://fastly.4sqi.net/img/general/600x600/46556780_fXILQMGuwm-YlysIgGD6KBIgZTusUiYrEvCGJM34d-s.jpg'] },
  { id: 22, itemType: 'court', name: 'Teniski tereni Kališ', address: 'Kalemegdan gornji grad bb, 11158 Beograd', municipality: 'Stari grad', sports: ['Tenis'] },
  { id: 23, itemType: 'court', name: 'Teniski tereni Pleasure', address: 'Kneza Višeslava bb, 11000 Beograd', municipality: 'Čukarica', sports: ['Tenis'] },
  { id: 24, itemType: 'court', name: 'Teniski tereni Sportsko selo', address: 'Deligradska bb, 11000 Beograd', municipality: 'Savski Venac', sports: ['Tenis'] },
  { id: 25, itemType: 'court', name: 'Teniski tereni TK Olimp', address: 'Vjekoslava Kovača 7, 11160 Beograd', municipality: 'Zvezdara', sports: ['Tenis'] },
  { id: 26, itemType: 'court', name: 'Teniski tereni Žarkovo', address: 'Prote Milorada Pavlovića 54, 11147 Beograd', municipality: 'Čukarica', sports: ['Tenis'] },
  { id: 27, itemType: 'court', name: 'Balon sala za mali fudbal Colosseum', address: 'Vodovodska 166A, 11147 Beograd', municipality: 'Čukarica', sports: ['Mali fudbal'] },
  { id: 28, itemType: 'court', name: 'Balon za fudbal Kej', address: 'Kej oslobođenja 11, 11080 Beograd', municipality: 'Zemun', sports: ['Fudbal'] },
  { id: 29, itemType: 'court', name: 'Balon za fudbal Matiss 011', address: 'Pavla Vuisića 69, 11283 Beograd', municipality: 'Zemun', sports: ['Fudbal'] },
  { id: 30, itemType: 'court', name: 'Balon za fudbal Woodball house', address: 'Kneza Višeslava 72, 11030 Beograd', municipality: 'Čukarica', sports: ['Fudbal'] },
  { id: 31, itemType: 'court', name: 'Balon za mali fudbal Brazil 1', address: 'Zdravka Čelara 16, 11108 Beograd', municipality: 'Palilula', sports: ['Mali fudbal'] },
  { id: 32, itemType: 'court', name: 'Balon za mali fudbal Bubamara', address: 'Hajduk Stankova 2, 11050 Beograd', municipality: 'Zvezdara', sports: ['Mali fudbal'] },
  { id: 33, itemType: 'court', name: 'Balon za mali fudbal Coin', address: 'Milentija Popovića 72, 11073 Beograd', municipality: 'Novi Beograd', sports: ['Mali fudbal'] },
  { id: 34, itemType: 'court', name: 'Balon za mali fudbal Crveno Crno', address: 'Omladinskih brigada 138, 11197 Beograd', municipality: 'Novi Beograd', sports: ['Mali fudbal'] },
  { id: 35, itemType: 'court', name: 'Balon za mali fudbal Sava Bien', address: 'Jocina ada bb, 11073 Beograd', municipality: 'Novi Beograd', sports: ['Mali fudbal'] },
  { id: 36, itemType: 'court', name: 'Balon za mali fudbal Sinđelić', address: 'Vojislava Ilića 86, 11050 Beograd', municipality: 'Voždovac', sports: ['Mali fudbal'] },
  { id: 37, itemType: 'court', name: 'Fudbalski centar FS Beograda', address: 'Ada ciganlija bb, 11030 Beograd', municipality: 'Čukarica', sports: ['Fudbal'] },
  { id: 38, itemType: 'court', name: 'KL Centar - sala za mali fudbal i košarku', address: 'Ilindenska 17A, 11160 Beograd', municipality: 'Zvezdara', sports: ['Mali fudbal'] },
];

const sports = [
    {id: 1, itemType: 'sport', name: 'Fudbal'},
    {id: 2, itemType: 'sport', name: 'Mali fudbal'},
    {id: 3, itemType: 'sport', name: 'Košarka'},
    {id: 4, itemType: 'sport', name: 'Odbojka'},
    {id: 5, itemType: 'sport', name: 'Tenis'},
];

const locations = [
  {id: 1, itemType: 'location', name: 'Vračar'},
  {id: 2, itemType: 'location', name: 'Voždovac'},
  {id: 3, itemType: 'location', name: 'Zvezdara'},
  {id: 4, itemType: 'location', name: 'Stari grad'},
  {id: 5, itemType: 'location', name: 'Palilula'},
  {id: 6, itemType: 'location', name: 'Čukarica'},
  {id: 7, itemType: 'location', name: 'Savski venac'},
  {id: 8, itemType: 'location', name: 'Rakovica'},
  {id: 9, itemType: 'location', name: 'Zemun'},
];

async function setInitialData() {

  await Sport.deleteMany({});
  const sportData = [...sports];
  await Sport.insertMany(sportData);
  console.log('Sports inserted into the database');

  await Location.deleteMany({});
  const locationData = [...locations];
  await Location.insertMany(locationData);
  console.log('Locations inserted into the database');

  await Court.deleteMany({});
  const courtData = [...courts];
  await Court.insertMany(courtData);
  console.log('Courts inserted into the database');
}

setInitialData().then(() => {
  db.close();
});