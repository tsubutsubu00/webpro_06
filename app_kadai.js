const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let hama_menu = [
    {id:1, url: "limited_menu", tag:"期間限定"},
    {id:2, url: "nigiri", tag:"にぎり"},
    {id:3, url: "niku_nigiri", tag:"肉握り"},
    {id:4, url: "gunkan_hosomaki_sonota", tag:"軍艦・細巻き・その他"},
    {id:5, url: "zeitaku_sanshu", tag:"贅沢握り・三種盛り"},
    {id:6, url: "shifuku_no_ikkan", tag:"至福の一貫"},
    {id:7, url: "side_menu", tag:"サイドメニュー"},
    {id:8, url: "dessert_drink", tag:"デザート・ドリンク"},
    {id:9, url: "alcohol", tag:"アルコール"},
    {id:10, url: "kids_menu", tag:"はまっこセット"},
];

let hama_limited = [
  {id:1, name:"厳選まぐろ中とろ", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可" },
  {id:2, name:"炙り厳選まぐろ中とろゆず塩", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可" },
  {id:3, name:"大葉真いか握り", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可" },
  {id:4, name:"炙り豚たん", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可" },
  {id:5, name:"広島県産牡蠣のカキフライつつみ", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可" },
  {id:6, name:"広島県産牡蠣のカキフライつつみ（タルタルソース）", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可" },
  {id:7, name:"広島県産牡蠣のカキフライつつみ（お好みソース）", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可" },
  {id:8, name:"国産真ふぐ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:9, name:"国産真ふぐの天ぷら握り", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:10, name:"白とり貝", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:11, name:"サーモンネギ味噌焼き", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:12, name:"旨だしたまごネギ味噌焼き", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:13, name:"しめさばネギ味噌焼き", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:14, name:"宮城県産とろいわしネギ味噌焼き", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:15, name:"真鱈白子軍艦", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:16, name:"あんきも軍艦", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可（ただしネギはつかない）", },
  {id:17, name:"あんきもかにみそ軍艦", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可（ただしネギはつかない）", },
  {id:18, name:"うに軍艦", price:"319円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:19, name:"うにいくら軍艦", price:"319円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:20, name:"中とろ三種盛り", price:"319円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:21, name:"車えび", price:"319円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:22, name:"地中海産本鮪大とろ", price:"319円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:23, name:"炙り地中海産本鮪大とろゆず塩", price:"319円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:24, name:"一本穴子", price:"528円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可（甘だれは別提供）", },
  {id:25, name:"濃厚北海道味噌ラーメン", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:26, name:"焼豚増量濃厚北海道味噌ラーメン", price:"506円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:27, name:"北海道味噌バターコーンラーメン", price:"506円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:28, name:"特性辛味噌担々麺", price:"506円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:29, name:"２種のずわいがにの贅沢茶碗蒸し", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:30, name:"カリカリポテト（濃厚コンソメ味）", price:"297円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:31, name:"MEGAカリカリポテト", price:"429円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:32, name:"MEGAカリカリポテト（バター醤油味）", price:"473円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:33, name:"MEGAカリカリポテト（濃厚コンソメ味）", price:"473円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:34, name:"オーマル海老のクリームコロッケ", price:"242円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:35, name:"広島県産牡蠣のカキフライ3個（タルタルソース）", price:"429円（税込）", suuryou:"3個", omochikaeri:"お持ち帰り可", },
  {id:36, name:"広島県産牡蠣のカキフライ3個（お好みソース）", price:"429円（税込）", suuryou:"3個", omochikaeri:"お持ち帰り可", },
  {id:37, name:"あんバターフレンチトースト（バニラアイス添え）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:38, name:"安納芋のおいもんぶらん", price:"297円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り可", },
  {id:39, name:"ペプシコーラ（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:40, name:"ホワイトウォーター（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:41, name:"ホワイトソーダ（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:42, name:"メロンソーダ（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:43, name:"ホワイトメロンソーダ（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:44, name:"ゆずレモン（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:45, name:"ゆずレモンスパークリング（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:46, name:"なっちゃんオレンジ（メガサイズ）", price:"363円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:47, name:"高清水 大吟醸", price:"968円（税込）", suuryou:"1瓶", omochikaeri:"お持ち帰り不可", },
];

let hama_nigiri = [
  {id:1, name:"まぐろ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:2, name:"特製漬けまぐろ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:3, name:"まぐろレアステーキつつみ", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:4, name:"とろびんちょう", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:5, name:"とろびんちょう山わさび", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:6, name:"特製漬けとろびんちょう", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:7, name:"とろたくつつみ", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:8, name:"とろたくユッケつつみ", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:9, name:"まぐろ二種盛り（まぐろ・とろびんちょう）", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:10, name:"まぐろ二種盛り（とろびんちょう・とろたく）", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:11, name:"まぐろ二種盛り（まぐろ・とろたく）", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:12, name:"サーモン", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:13, name:"サーモンゆず塩", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:14, name:"サーモン山わさび", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:15, name:"サーモンつつみ", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:16, name:"しめさば", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:17, name:"炙りしめさば", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:18, name:"生えび", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:19, name:"甘えび", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:20, name:"えび", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:21, name:"炙りえびマヨ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:22, name:"えび天握り", price:"132円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:23, name:"えび天", price:"132円（税込）", suuryou:"2尾", omochikaeri:"お持ち帰り可", },
  {id:24, name:"アカイカ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:25, name:"アカイカゆず塩", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:26, name:"大葉漬けアカイカ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:27, name:"旨だしたまご", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:28, name:"旨だしたまごマヨ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:29, name:"わさびなす", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:30, name:"煮あなご", price:"132円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:31, name:"煮あなごゆず塩", price:"132円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:32, name:"れんこん天握り", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:33, name:"れんこん天", price:"110円（税込）", suuryou:"2枚", omochikaeri:"お持ち帰り可", },
  {id:34, name:"オクラ天握り", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:35, name:"オクラ天", price:"110円（税込）", suuryou:"2本", omochikaeri:"お持ち帰り可", },
  {id:36, name:"国産まいたけの天ぷら握り", price:"110円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:37, name:"いか天握り", price:"132円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:38, name:"いか天握りガーリックマヨ", price:"132円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:39, name:"いか天", price:"132円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
];

let hama_niku_nigiri = [
  {id:1, name:"生ハム", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:2, name:"生ハムマヨオニオン", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:3, name:"合鴨", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:4, name:"合鴨マヨオニオン", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:5, name:"合鴨ガーリックソース", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:6, name:"合鴨山わさび", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:7, name:"炙り合鴨", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:8, name:"豚塩カルビ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:9, name:"豚塩カルビマヨ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:10, name:"直火焼き牛カルビ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:11, name:"直火焼き牛カルビマヨ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:12, name:"ハンバーグ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:13, name:"ハンバーグマヨ", price:"110円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:14, name:"炙りハンバーグチーズマヨ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
];

let hama_gunkan = [
  {id:1, name:"まぐろたたき軍艦", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:2, name:"ピリ辛まぐろたたきユッケ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:3, name:"まぐろたたき納豆", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:4, name:"たっぷりかにみそ（紅ずわい使用）", price:"110円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り可", },
  {id:5, name:"大葉かにみそ（紅ずわい使用）", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:6, name:"かにマヨ軍艦", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:7, name:"たらマヨ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:8, name:"大葉たらこ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:9, name:"コーン", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:10, name:"ツナ＆コーン", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:11, name:"ツナサラダ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:12, name:"ツナキムチ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:13, name:"シーフードサラダ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:14, name:"いかオクラ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:15, name:"いかオクラ納豆", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:16, name:"納豆", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:17, name:"納豆キムチ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:18, name:"山かけいかオクラ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:19, name:"山かけたらこ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:20, name:"山かけ納豆", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:21, name:"山かけまぐろ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:22, name:"わさびえんがわ", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:23, name:"かっぱ巻", price:"110円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り", },
  {id:24, name:"たくあん巻（ごま入り）", price:"110円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り可", },
  {id:25, name:"納豆巻", price:"110円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り可", },
  {id:26, name:"鉄火巻", price:"176円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り可", },
  {id:27, name:"まぐろたたき巻", price:"176円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り可", },
  {id:28, name:"生ハムロール", price:"176円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:29, name:"カリフォルニアロール", price:"176円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:30, name:"さばの押し寿司", price:"132円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:31, name:"いなり（ごま入り）", price:"110円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:32, name:"特製キンパ風ツナキムチ太巻", price:"110円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
];

let hama_zeitaku = [
  {id:1, name:"まぐろレアステーキ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:2, name:"とろびんちょうレアステーキ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:3, name:"サーモンレアステーキ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:4, name:"えびレアステーキ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:5, name:"アカイカレアステーキ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:6, name:"天然赤えび", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:7, name:"天然赤えび 塩レモン", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:8, name:"炙り天然赤えび 塩レモン", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:9, name:"天然赤えびレアステーキ", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:10, name:"活〆はまち", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:11, name:"炙りはまちゆず塩", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:12, name:"活〆まだい（四国・九州産）", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:13, name:"炙りまだいゆず塩（四国・九州産）", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:14, name:"大とろサーモン", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:15, name:"大とろサーモン山わさび", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:16, name:"炙りうなぎ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:17, name:"ほたて（北海道・青森県産）", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:18, name:"炙りほたて（北海道・青森県産）", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:19, name:"ほたてレアステーキ（北海道・青森県産）", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り可", },
  {id:20, name:"つぶ貝", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:21, name:"赤貝", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:22, name:"真だこ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:23, name:"えんがわ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:24, name:"炙りえんがわ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:25, name:"炙りチーズマヨ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:26, name:"炙りサーモンチーズマヨ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:27, name:"炙りたまごチーズマヨ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:28, name:"真あじ", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:29, name:"真あじ漁師漬け", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:30, name:"宮城県産とろいわし", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:31, name:"炙り宮城県産とろいわし", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:32, name:"宮城県産とろいわし漁師漬け", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:33, name:"サーモンマヨオニオン", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:34, name:"サーモンマヨアボカド", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:35, name:"とろびんちょうマヨアボカド", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:36, name:"えびマヨアボカド", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:37, name:"生ハムマヨアボカド", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:38, name:"サーモン おろし盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:39, name:"しめさば おろし盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:40, name:"炙りしめさば おろし盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:41, name:"豚塩カルビ おろし盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:42, name:"えび天握り おろし盛り", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:43, name:"いか天握り おろし盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:44, name:"サーモン 旨辛ネギ盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:45, name:"生ハム 旨辛ネギ盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:46, name:"えび 旨辛ネギ盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:47, name:"アカイカ 旨辛ネギ盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:48, name:"とろびんちょう 旨辛ネギ盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:49, name:"豚塩カルビ 旨辛ネギ盛り", price:"176円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り不可", },
  {id:50, name:"サーモンつつみ（いくらのせ）", price:"176円（税込）", suuryou:"1貫", omochikaeri:"お持ち帰り不可", },
  {id:51, name:"いくら", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り可", },
  {id:52, name:"とろいくら", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り可", },
  {id:53, name:"生しらす（日本近海産）", price:"176円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:54, name:"つぶっこ（樺太ししゃも卵）", price:"176円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り不可", },
  {id:55, name:"かに軍艦", price:"176円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:56, name:"かにみそ軍艦", price:"176円（税込）", suuryou:"2個", omochikaeri:"お持ち帰り可", },
  {id:57, name:"まぐろ三種盛り（まぐろ・とろびんちょう．とろたく）", price:"176円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:58, name:"いか三種盛り（真いか・アカイカ・大葉漬けアカイカ）", price:"176円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:59, name:"いか三種盛り（いか・アカイカ・大葉漬けアカイカ）", price:"176円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:60, name:"サーモン三種盛り（サーモンレアステーキ・大とろサーモン・サーモン）", price:"231円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:61, name:"えび三種盛り（えび・甘えび・生えび）", price:"176円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:62, name:"光り物三種盛り（あじ・とろいわし・しめさば）", price:"231円（税込）", suuryou:"3貫", omochikaeri:"お持ち帰り可", },
  {id:63, name:"とろネバ三種盛り（まぐろたたき軍艦・納豆・いかオクラ）", price:"176円（税込）", suuryou:"3個", omochikaeri:"お持ち帰り可", },
  {id:64, name:"サラダ軍艦三種盛り（シーフード・コーン・ツナ）", price:"176円（税込）", suuryou:"3個", omochikaeri:"お持ち帰り可", },
];

let hama_shifuku = [
  {id:1, name:"天然赤えび食べ比べ（赤あび・炙り塩レモン）", price:"319円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
  {id:2, name:"赤えび食べ比べ（赤えび・レアステーキ）", price:"319円（税込）", suuryou:"2貫", omochikaeri:"お持ち帰り可", },
];

let hama_side = [
  {id:1, name:"焼津産かつおだしの特製茶碗蒸し", price:"209円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:2, name:"あおさみそ汁", price:"132円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:3, name:"あさりみそ汁", price:"242円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:4, name:"特製とん汁", price:"242円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:5, name:"かけうどん", price:"242円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:6, name:"きつねうどん", price:"319円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:7, name:"えびの天ぷらそば", price:"363円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:8, name:"えびの天ぷらうどん", price:"363円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:9, name:"あさりとあおさのうどん", price:"396円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:10, name:"鴨そば", price:"396円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:11, name:"鴨うどん", price:"396円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:12, name:"えび天きつねうどん", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:13, name:"えび天鴨そば", price:"473円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:14, name:"えび天鴨うどん", price:"473円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:15, name:"特製しょう油ラーメン", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:16, name:"焼豚増量特製しょう油ラーメン", price:"506円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:17, name:"厳選素材の貝節塩ラーメン", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:18, name:"焼豚増量厳然素材の貝節塩ラーメン", price:"506円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:19, name:"鶏のから揚げ（4個）", price:"363円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り可（マヨなしも可）", },
  {id:20, name:"鶏のから揚げ（2個）", price:"198円（税込）", suuryou:"4個", omochikaeri:"お持ち帰り可（マヨなしも可）", },
  {id:21, name:"カリカリポテト", price:"242円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:22, name:"カリカリポテト（バター醤油味）", price:"297円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:23, name:"旨だしたこ焼き（3個）", price:"198円（税込）", suuryou:"3個", omochikaeri:"お持ち帰り可（マヨなしも可）", },
  {id:24, name:"旨だしたこ焼き（6個）", price:"363円（税込）", suuryou:"6個", omochikaeri:"お持ち帰り可（マヨなしも可）", },
  {id:25, name:"あさりの酒蒸し", price:"297円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:26, name:"ツナとブロッコリーのタルタルサラダ", price:"176円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:27, name:"旨だし厚焼きたまご", price:"132円（税込）", suuryou:"3切れ", omochikaeri:"お持ち帰り可", },
  {id:28, name:"旨だし厚焼きたまごおろし添え", price:"176円（税込）", suuryou:"3切れ", omochikaeri:"お持ち帰り不可", },
  {id:29, name:"枝豆", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:30, name:"キムチ", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:31, name:"〆シャリ", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:32, name:"追加トッピング 旨辛ネギ", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:33, name:"追加トッピング 大根おろし", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:34, name:"追加トッピング ディップチーズ", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
];

let hama_dessert = [
  {id:1, name:"ミルクレープ", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り可", },
  {id:2, name:"フランス直輸入濃厚ガトーショコラ", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り可（ホイップつかない）", },
  {id:3, name:"たまごプリン", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:4, name:"黒蜜きなこ豆乳プリン", price:"198円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:5, name:"大学いも", price:"176円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:6, name:"大学いもバニラアイス添え", price:"242円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:7, name:"コーヒーゼリー（バニラアイスのせ）", price:"198円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:8, name:"コーヒーゼリー", price:"132円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:9, name:"三色だんご（こしあん入り）", price:"132円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:10, name:"フレッシュパイン", price:"132円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:11, name:"波照間黒糖のわらびもち", price:"110円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り可", },
  {id:12, name:"波照間黒糖のわらびもちバニラアイス添え", price:"176円（税込）", suuryou:"1皿", omochikaeri:"お持ち帰り不可", },
  {id:13, name:"はまアイス（バニラ）", price:"132円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:14, name:"はまアイス（チョコレート）", price:"132円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:15, name:"豆乳いちごアイス", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:16, name:"追加トッピング ホイップ", price:"110円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:17, name:"コーラフロート", price:"297円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:18, name:"メロンソーダフロート", price:"297円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:19, name:"コーヒーフロート", price:"297円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:20, name:"ペプシコーラ（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:21, name:"ペプシコーラ（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:22, name:"ホワイトウォーター（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:23, name:"ホワイトウォーター（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:24, name:"ホワイトソーダ（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:25, name:"ホワイトソーダ（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:26, name:"メロンソーダ（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:27, name:"メロンソーダ（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:28, name:"ホワイトメロンソーダ（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:29, name:"ホワイトメロンソーダ（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:30, name:"ゆずレモン（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:31, name:"ゆずレモン（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:32, name:"ゆずレモンスパークリング（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:33, name:"ゆずレモンスパークリング（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:34, name:"なっちゃんオレンジ（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:35, name:"なっちゃんオレンジ（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:36, name:"アップル100%ジュース", price:"132円（税込）", suuryou:"1パック", omochikaeri:"お持ち帰り可", },
  {id:37, name:"ぶどう100%ジュース", price:"132円（税込）", suuryou:"1パック", omochikaeri:"お持ち帰り可", },
  {id:38, name:"コーヒー（HOT/ICE）（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:39, name:"コーヒー（HOT/ICE）（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:40, name:"カフェラテ（HOT/ICE）（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:41, name:"カフェラテ（HOT/ICE）（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:42, name:"抹茶ラテ（HOT/ICE）（Sサイズ）", price:"176円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
  {id:43, name:"抹茶ラテ（HOT/ICE）（Mサイズ）", price:"242円（税込）", suuryou:"1個", omochikaeri:"お持ち帰り不可", },
];

let hama_alcohol = [
  {id:1, name:"生ビール中ジョッキ", price:"572円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:2, name:"生ビール小ジョッキ", price:"319円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:3, name:"ブラックニッカハイボール", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:4, name:"日本酒 金勝山", price:"572円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:5, name:"麦焼酎 白水", price:"396円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:6, name:"芋焼酎 薩摩宝山", price:"396円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:7, name:"レモンサワー", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:8, name:"グレープフルーツサワー", price:"429円（税込）", suuryou:"1杯", omochikaeri:"お持ち帰り不可", },
  {id:9, name:"サントリーオールフリー（ノンアルコールビール）", price:"396円（税込）", suuryou:"1本", omochikaeri:"お持ち帰り不可", },
];

let hama_kids = [
  {id:1, name:"はまっこポテトセット", price:"319円（税込）", suuryou:"カリカリポテト：1個（通常の半分の量），ドリンク：1個，ガチャコイン：1枚", omochikaeri:"お持ち帰り不可", },
  {id:2, name:"はまっこうどんセット", price:"396円（税込）", suuryou:"うどん：1杯，ドリンク：1個，ガチャコイン：1枚", omochikaeri:"お持ち帰り不可", },
  {id:3, name:"はまっこ3点セット", price:"506円（税込）", suuryou:"カリカリポテト：1個（通常の半分の量），うどん：1杯，ドリンク：1個，ガチャドリンク：1枚", omochikaeri:"お持ち帰り不可", },
  {id:4, name:"はまっこしょう油ラーメンセット", price:"440円（税込）", suuryou:"しょう油ラーメン：1杯，ドリンク：1個，ガチャコイン：1枚", omochikaeri:"お持ち帰り不可", },
];

const hama_all_menu = {
  "limited_menu": hama_limited,
  "nigiri": hama_nigiri,
  "niku_nigiri": hama_niku_nigiri,
  "gunkan_hosomaki_sonota": hama_gunkan,
  "zeitaku_sanshu": hama_zeitaku,
  "shifuku_no_ikkan": hama_shifuku,
  "side_menu": hama_side,
  "dessert_drink": hama_dessert,
  "alcohol": hama_alcohol,
  "kids_menu": hama_kids,
}
let sumabura_data = [
    {id:1, name:"マリオ", series:"スーパーマリオ", nannido:"★★★★☆"},
    {id:2, name:"ドンキーコング", series:"ドンキーコング", nannido:"★☆☆☆☆"},
    {id:3, name:"リンク", series:"ゼルダの伝説", nannido:"★★☆☆☆"},
    {id:4, name:"サムス", series:"メトロイド",nannido:"★☆☆☆☆"},
    {id:5, name:"ダークサムス", series:"メトロイド",nannido:"★☆☆☆☆"},
    {id:6, name:"ヨッシー", series:"ヨッシー",nannido:"★★★☆☆"},
    {id:7, name:"カービィ", series:"星のカービィ",nannido:"★★★★☆"},
    {id:8, name:"フォックス", series:"スターフォックス",nannido:"★★★☆☆"},
    {id:9, name:"ピカチュウ", series:"ポケモン",nannido:"★★★☆☆"},
    {id:10, name:"ルイージ", series:"スーパーマリオ",nannido:"★★★☆☆"},
    {id:11, name:"ネス", series:"MOTHER",nannido:"★☆☆☆☆"},
    {id:12, name:"キャプテン・ファルコン", series:"F-ZERO",nannido:"★★☆☆☆"},
    {id:13, name:"プリン", series:"ポケモン",nannido:"★★★★★"},
    {id:14, name:"ピーチ", series:"スーパーマリオ",nannido:"★★★★☆"},
    {id:15, name:"デイジー", series:"スーパーマリオ",nannido:"★★★★☆"},
    {id:16, name:"クッパ", series:"スーパーマリオ",nannido:"★☆☆☆☆"},
    {id:17, name:"アイスクライマー", series:"ICE CLIMBER",nannido:"★★★★☆"},
    {id:18, name:"シーク", series:"ゼルダの伝説",nannido:"★★★★☆"},
    {id:19, name:"ゼルダ", series:"ゼルダの伝説",nannido:"★★☆☆☆"},
    {id:20, name:"ドクターマリオ", series:"スーパーマリオ",nannido:"★★☆☆☆"},
    {id:21, name:"ピチュー", series:"ポケモン",nannido:"★★★★☆"},
    {id:22, name:"ファルコ", series:"スターフォックス",nannido:"★★★★☆"},
    {id:23, name:"マルス", series:"ファイアーエンブレム",nannido:"★★★☆☆"},
    {id:24, name:"ルキナ", series:"ファイアーエンブレム",nannido:"★★★☆☆"},
    {id:25, name:"こどもリンク", series:"ゼルダの伝説",nannido:"★★★☆☆"},
    {id:26, name:"ガノンドロフ", series:"ゼルダの伝説",nannido:"★☆☆☆☆"},
    {id:27, name:"ミュウツー", series:"ポケモン",nannido:"★★★☆☆"},
    {id:28, name:"ロイ", series:"ファイアーエンブレム",nannido:"★★☆☆☆"},
    {id:29, name:"クロム", series:"ファイアーエンブレム",nannido:"★★☆☆☆"},
    {id:30, name:"Mr.ゲーム&ウォッチ", series:"GAME & WATCH",nannido:"★★★☆☆"},
    {id:31, name:"メタナイト", series:"星のカービィ",nannido:"★★★☆☆"},
    {id:32, name:"ピット", series:"光神話パルテナの鏡",nannido:"★★★☆☆"},
    {id:33, name:"ブラックピット", series:"光神話パルテナの鏡",nannido:"★★★☆☆"},
    {id:34, name:"ゼロスーツサムス", series:"メトロイド",nannido:"★★★★☆"},
    {id:35, name:"ワリオ", series:"メイド イン ワリオ",nannido:"★★★★☆"},
    {id:36, name:"スネーク", series:"METAL GEAR SOLID",nannido:"★★☆☆☆"},
    {id:37, name:"アイク", series:"ファイアーエンブレム",nannido:"★★★☆☆"},
    {id:38, name:"ポケモントレーナー/ゼニガメ", series:"ポケモン",nannido:"★★☆☆☆"},
    {id:39, name:"ポケモントレーナー/フシギソウ", series:"ポケモン",nannido:"★★☆☆☆"},
    {id:40, name:"ポケモントレーナー/リザードン", series:"ポケモン",nannido:"★★☆☆☆"},
    {id:41, name:"ディディーコング", series:"ドンキーコング",nannido:"★★★☆☆"},
    {id:42, name:"リュカ", series:"MOTHER",nannido:"★☆☆☆☆"},
    {id:43, name:"ソニック", series:"SONIC THE HEDGEHOG",nannido:"★★★☆☆"},
    {id:44, name:"デデデ", series:"星のカービィ",nannido:"★☆☆☆☆"},
    {id:45, name:"ピクミン&オリマー", series:"ピクミン",nannido:"★★★☆☆"},
    {id:46, name:"ルカリオ", series:"ポケモン",nannido:"★★★★☆"},
    {id:47, name:"ロボット", series:"FAMILY COMPUTER ROBOT",nannido:"★★☆☆☆"},
    {id:48, name:"トゥーンリンク", series:"ゼルダの伝説",nannido:"★★★☆☆"},
    {id:49, name:"ウルフ", series:"スターフォックス",nannido:"★★★☆☆"},
    {id:50, name:"むらびと", series:"どうぶつの森",nannido:"★★★☆☆"},
    {id:51, name:"ロックマン", series:"ROCKMAN",nannido:"★★★★☆"},
    {id:52, name:"Wii Fit トレーナー", series:"Wii Fit",nannido:"★★☆☆☆"},
    {id:53, name:"ロゼッタ&チコ", series:"スーパーマリオ",nannido:"★★★☆☆"},
    {id:54, name:"リトル・マック", series:"Punch-Out!!",nannido:"★★★★★"},
    {id:55, name:"ゲッコウガ", series:"ポケモン",nannido:"★★★☆☆"},
    {id:56, name:"Miiファイター/格闘", series:"Mii",nannido:"★★★☆☆"},
    {id:57, name:"Miiファイター/剣術", series:"Mii",nannido:"★★☆☆☆"},
    {id:58, name:"Miiファイター/射撃", series:"Mii",nannido:"★☆☆☆☆"},
    {id:59, name:"パルテナ", series:"光神話パルテナの鏡",nannido:"★★★☆☆"},
    {id:60, name:"パックマン", series:"PAC-MAN",nannido:"★★☆☆☆"},
    {id:61, name:"ルフレ", series:"ファイアーエンブレム",nannido:"★★☆☆☆"},
    {id:62, name:"シュルク", series:"Xenoblade",nannido:"★★★☆☆"},
    {id:63, name:"クッパJr.", series:"スーパーマリオ",nannido:"★★★☆☆"},
    {id:64, name:"ダックハント", series:"DUCK HUNT",nannido:"★★★★☆"},
    {id:65, name:"リュウ", series:"STREET FIGHTER",nannido:"★★★☆☆"},
    {id:66, name:"ケン", series:"STREET FIGHTER",nannido:"★★★★★"},
    {id:67, name:"クラウド", series:"FINAL FNTASY Ⅶ",nannido:"★★★★☆"},
    {id:68, name:"カムイ", series:"ファイアーエンブレム",nannido:"★★★☆☆"},
    {id:69, name:"ベヨネッタ", series:"BAYONETTA2",nannido:"★★★★★"},
    {id:70, name:"インクリング", series:"Splatoon",nannido:"★★★☆☆"},
    {id:71, name:"リドリー", series:"メトロイド",nannido:"★★☆☆☆"},
    {id:72, name:"シモン", series:"悪魔城ドラキュラ",nannido:"★★★☆☆"},
    {id:73, name:"リヒター", series:"悪魔城ドラキュラ",nannido:"★★★☆☆"},
    {id:74, name:"キングクルール", series:"ドンキーコング",nannido:"★☆☆☆☆"},
    {id:75, name:"しずえ", series:"どうぶつの森",nannido:"★★★☆☆"},
    {id:76, name:"ガオガエン", series:"ポケモン",nannido:"★★★☆☆"},
    {id:77, name:"パックンフラワー", series:"スーパーマリオ",nannido:"★★★★☆"},
    {id:78, name:"ジョーカー", series:"PERSONA5",nannido:"★★☆☆☆"},
    {id:79, name:"勇者", series:"DRAGON QUEST Ⅺ",nannido:"★★☆☆☆"},
    {id:80, name:"バンジョー&カズーイ", series:"バンジョーとカズーイの大冒険",nannido:"★★☆☆☆"},
    {id:81, name:"テリー", series:"餓狼伝説",nannido:"★★★☆☆"},
    {id:82, name:"ベレト/ベレス", series:"ファイアーエンブレム",nannido:"★★★★☆"},
    {id:83, name:"ミェンミェン", series:"ARMS",nannido:"★★☆☆☆"},
    {id:84, name:"スティーブ/アレックス", series:"MINECRAFT",nannido:"★★★☆☆"},
    {id:85, name:"セフィロス", series:"FINAL FANTASY Ⅶ",nannido:"★★★☆☆"},
    {id:86, name:"ホムラ", series:"Xenoblade",nannido:"★★☆☆☆"},
    {id:87, name:"ヒカリ", series:"Xenoblade",nannido:"★★☆☆☆"},
    {id:88, name:"カズヤ", series:"TEKKEN",nannido:"★★☆☆☆"},
    {id:89, name:"ソラ", series:"KINGDOM HEARTS",nannido:"★★★☆☆"},
];
let sumabura_next_id = sumabura_data.length + 1;

//1つ目：todoリスト
app.get("/todo", (req, res) => {
  res.render("todo", {data: todo});
});


//2つ目：はま寿司メニュー一覧
app.get("/menu", (req, res) => {
  res.render("hama", {data: hama_menu});
});

app.get("/menu/:url", (req, res) => {
  const url = req.params.url;
  const menu_list = hama_all_menu[ url ];
  res.render("hama_menu", { url: url, data: menu_list});
});

app.get("/menu/:url/:number", (req, res) => {
  const url = req.params.url;
  const number = req.params.number;
  const list = hama_all_menu[url];

  let detail = null;
  for(let i=0; i<list.length; i++) {
    if(list[i].id == number) {
      detail = list[i];
      break;
    }
  }
  res.render("hama_menu_detail", {url: url, number: number, data: detail});
});

app.post("/menu/:url", (req, res) => {
  const id = hama_menu.length + 1;
  const url = req.body.url;
  const tag = req.body.tag;
  hama_menu.push({id: id, url: url, tag: tag});
  console.log(hama_menu);
  res.render("hama", {data: hama_menu});
});

app.get("/hama/:url/create", (req, res) => {
  const url = req.params.url;
  res.redirect('/public/hama_new.html');
});

app.get("/menu/:url/delete/:number", (req, res) => {
  const url = req.params.url;
  const number = req.params.number;
  const list = hama_all_menu[url];

  let sakujo = null;
  for(let i=0; i<list.length; i++) {
    if(list[i].id == number) {
      sakujo = i;
      break;
    }
  }

  list.splice(sakujo, 1);
  res.redirect(`/menu/${url}`);
});

app.get("/menu/:url/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = hama_all_menu[req.params.url][number];
  res.render('hama_menu_edit', {id: number, data: detail} );
});

app.post("/menu/:url/update/:number", (req, res) => {
  const url = req.params.url;
  hama_all_menu[req.params.url][req.params.number].id = req.body.id;
  hama_all_menu[req.params.url][req.params.number].name = req.body.name;
  hama_all_menu[req.params.url][req.params.number].price = req.body.price;
  hama_all_menu[req.params.url][req.params.number].suuryou = req.body.suuryou;
  hama_all_menu[req.params.url][req.params.number].omochikaeri = req.body.omochikaeri;
  console.log( hama_all_menu );
  res.redirect(`/menu/${url}`);
});


//3つ目：スマブラ
app.get("/sumabura", (req, res) => {
    res.render("sumabura", {data: sumabura_data});
});

app.get("/sumabura/create", (req, res) => {
  res.redirect('/public/sumabura_new.html');
});

app.get("/sumabura/:number", (req, res) => {
  const number = req.params.number;
  const detail = sumabura_data[ number ];
  res.render('sumabura_detail', {id: number, data: detail} );
});

app.get("/sumabura/delete/:number", (req, res) => {
  sumabura_data.splice( req.params.number, 1 );
  res.redirect('/sumabura' );
});

app.post("/sumabura", (req, res) => {
  const id = sumabura_next_id;
  const name = req.body.name;
  const series = req.body.series;
  const nannido = req.body.nannido;
  sumabura_data.push( { id: id, name: name, series: series, nannido: nannido } );
  sumabura_next_id += 1;
  console.log( sumabura_data );
  res.render('sumabura', {data: sumabura_data} );
});

app.get("/sumabura/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = sumabura_data[ number ];
  res.render('sumabura_edit', {id: number, data: detail} );
});

app.post("/sumabura/update/:number", (req, res) => {
  sumabura_data[req.params.number].id = req.body.id;
  sumabura_data[req.params.number].name = req.body.name;
  sumabura_data[req.params.number].series = req.body.series;
  sumabura_data[req.params.number].nannido = req.body.nannido;
  console.log( sumabura_data );
  res.redirect('/sumabura' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));