
const renkler = ["#0ABAB5","#725CAD","#00809D","#A7C1A8","#FF9898","#819A91","#DA6C6C","#735557","#533B4D","#FFC107","#FFAAAA"];// renk dizsi oluşturdum.


function renkSec() { // random renk seçme fonksiyonu
  const renk = Math.floor(Math.random() * renkler.length);// random rengi floor ile  tam sayıya çevirip rengi aldık.
  return renkler[renk];// return ile fonksiyounu istediğimiz yerde çağırıp çalıştırıcaz.Aşağıda kutuları oluşturup renkleri çağırıcaz.Return etmezsek fonksiyonu çağırmayız ve değeri dışarıya çağıramayız.
}
const kutuOlusturma = document.getElementById("boxs");
const sutunSayisi = 10;// her sütunda 10 kutumuz olsun istiyoruz.
const kutuYukseklikYuzde = 5; 
const aralik = 0.5; // sağdan ve solda verilecek boşluklar.
const kutuGenislikYuzde = (100 / sutunSayisi) - (aralik * 2); // (100 / 10) - (0.5 * 2) = 8% her kutunun kapladığı alan.

for (let i = 0; i < 40; i++) {
  const yeniDiv = document.createElement("div");// createElement yeni eleman oluşturma.
  yeniDiv.className = "box";
  yeniDiv.id = "box" + (i+1);
  yeniDiv.textContent = Math.floor(Math.random() * 100) + 1;// oluşturduğumuz kutunun içine TextCOntent ile random sayı atıyoruz.
  yeniDiv.style.backgroundColor = renkSec();

  yeniDiv.style.width = kutuGenislikYuzde + "%";// oluşturduğumuz kutulara genişliğimizi ve yüksekliğimizi yüzde olarak atadık.
  yeniDiv.style.height = kutuYukseklikYuzde + "%";

  const sutun = i % sutunSayisi;// mod işlemi ile kutuların hangi satırda olduğu bulunuyor. i = 0 0 % 10 = 0.sütun.
  const satir = Math.floor(i / sutunSayisi);// 0 / 10 = 0.satır

  const x = sutun * (100 / sutunSayisi);// kutularımızın yatay ve dikey yönde konumları. sutun = 9 * (100/10) =  soldan 90% uzaklık
  const y = satir * (kutuYukseklikYuzde + 1); 

  yeniDiv.style.left = x + "%";// yüzdelik olarak yaz.Çünkü number cinsinden alıyoruz.
  yeniDiv.style.top = y + "%";

  kutuOlusturma.appendChild(yeniDiv);
}


let pozisyon = ($(window).width() - $(".tabla").outerWidth()) / 2;
$(".tabla").css("left", pozisyon + "px");// tablamızın pozisyonunu verdim.


window.addEventListener("keydown", function(a) {
  let pozChange = $(window).width() * 0.02;

  if (a.keyCode === 37) { // sol
    if (pozisyon > 0) {
      pozisyon -= pozChange;
      if (pozisyon < 0) pozisyon = 0;
      $(".tabla").css("left", pozisyon + "px");
    }
  } else if (a.keyCode === 39) { 
    if (pozisyon + $(".tabla").outerWidth() < $(window).width()) {
      pozisyon += pozChange;
      if (pozisyon + $(".tabla").outerWidth() > $(window).width()) {
        pozisyon = $(window).width() - $(".tabla").outerWidth();
      }
      $(".tabla").css("left", pozisyon + "px");
    }
  }
});
let topX = $(window).width() / 2;// topun konumu
let topY = $(window).height() / 2;
let dx = $(window).width() * 0.002;
let dy = $(window).height() * 0.002;

function topuHareketEttir() {
  topX += dx;// topu hareket ettirme
  topY += dy;
    $(".top").css({
    left: topX + "px",
    top: topY + "px"
  });



  if (topX <= 0 || topX + $(".top").outerWidth() >= $(window).width()) {// ekranın sol ve sağ köşesine çarpma kontrolü
    dx = -dx;// çarptıysa geri sekme
  }
  if (topY <= 0) {// üst kenara çarpma kontrolü
    dy = -dy;
  }
  if (topY > $(window).height()) {
  clearInterval(topInterval); // hareketi durdur
  alert("Oyun Bitti!");
}


  let tabla = $("#tabla");// tablamızın sol kenar üst kenar genişlik ve yükseklik bilgilerini değişkenlere atıyoruz.
  let tablaLeft = tabla.position().left;
  let tablaTop = tabla.position().top;
  let tablaWidth = tabla.outerWidth();
  let tablaHeight = tabla.outerHeight();

  let topLeft = topX; //aynı şekilde topa yapıyoruz.
  let topTop = topY;
  let topWidth = $(".top").outerWidth();
  let topHeight = $(".top").outerHeight();

  
  if (//tabla çarpma kontolü
    topLeft <= tablaLeft + tablaWidth && // topun sol kenarı tablanın sağ kenarını geçti mi
    topLeft + topWidth >= tablaLeft && // topun sağ kenarı tablanın sol kenarını geçti mi yatay çarpışma ihtimali kontrolü
    topTop + topHeight >= tablaTop &&// topun alt kenarı tablanın üstüne çarptı mı
    topTop <= tablaTop // topun üst kenarı ile tablanın üst kenarı değdi mi
  ) {
    dy = -dy; // konrol tamamsa y ekseninde seksin
    
  }
  
  
let kutular = $(".box"); // box sınıfını kutular değişkenine atadık.
for (let i = 0; i < kutular.length; i++) {// for döngüsü ile kutuları alıyoruz
  let box = $(kutular[i]);// her kutuyu tek tek almak
  let boxLeft = box.position().left; // kutunun sol kenarı
  let boxTop = box.position().top;//kutunun üst kenarı
  let boxWidth = box.outerWidth();// genişliği
  let boxHeight = box.outerHeight();// yüksekliği

  if (
    topLeft < boxLeft + boxWidth &&// topun sol kenarı kutunun sağ kenarına çarpmış mı
    topLeft + topWidth > boxLeft &&// topun sağ kenarı kutunun soluna çarpmış mı
    topTop < boxTop + boxHeight &&// topun üst kenarı kutunun altına çarpmış mı
    topTop + topHeight > boxTop// topun alt kenarı kutunun üstüne çarpmı mı
  ) {
    dy = -dy; // çarptıysa geri seksin
    let kutuPuani = parseInt(box.text());
    let skor = parseInt($("#skor").text());
    $("#skor").text(skor + kutuPuani);
    box.remove();
  }
}

}

let topInterval = setInterval(topuHareketEttir, 10);