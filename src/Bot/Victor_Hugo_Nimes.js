window.get_pageinfo = function() {
     var type = "";
     var titre = "";
     var date = "";
     var desc = "";
     var price = "";
     var img = "";

     type = "Bar";

     titre = document.querySelector('.animate.fadeIn > h4');
     titre = titre && titre.innerText ? titre.innerText : "Notitle";

     date = document.querySelector('.desc > b');
     date = date && date.innerText ? date.innerText : "**/**";

     desc = document.querySelector('.animate.fadeIn .desc');
     desc = desc && desc.innerText ? desc.innerText : "Desc";
     desc = desc.replace(date, '');

     price = "gratuit";

     img = document.querySelector('.scale-with-grid');
     img = img && img.src ? img.src : "";

     return {
         return_type: type,
         return_titre: titre,
         return_date: date,
         return_desc: desc,
         return_price: price,
         return_img: img,

     };
 };