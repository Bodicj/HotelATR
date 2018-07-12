"use strict";function handleChecked(e){e.preventDefault(),document.querySelector(".active_img")&&document.querySelector(".active_img").classList.toggle("active_img"),document.querySelector("#"+e.target.value).classList.toggle("active_img")}function stickyNavbar(){window.matchMedia("(max-width: 700px)").matches||(window.pageYOffset>=sticky?navbar.classList.add("sticky"):navbar.classList.remove("sticky"))}function createBookQuery(e,t,s,a){var l={};return l.bookedFrom=e,l.bookedTo=t,s<1?(console.error("Adults is required field"),null):s>0&&s+a<=2?(l.type="Single",l):s>0&&s+a>2&&s+a<4?(l.type="Double",l):s>0&&s+a>=4?(l.type="Royal",l):s>=4&&0===a?(l.type="President",l):l}function validateDate(e,t){return!(e>t)||(callMessageBox("Please change youre departurer date it cannot be lower than arrive date"),!1)}function canBook(e){if(null==e)return null;var t=new Date(e.bookedFrom).getTime(),s=new Date(e.bookedTo).getTime();if(!validateDate(t,s))return!1;var a=booking.filter(function(s){var a=new Date(s.bookedTo).getTime(),l=new Date(s.bookedFrom).getTime();return s.type===e.type&&l<=t&&a>=t});if(a.length>0&&a.length>roomsCount.filter(function(e){return e.type===a[0].type})[0].count){var l="We're so sorry, but this number was booked from: "+a[0].bookedFrom+" to: "+a[0].bookedTo+" by another customer.";return document.getElementById("main_booking_form").style.maxWidth=0,document.getElementById("main_booking_form").style.maxHeight=0,document.getElementById("main_booking_form").style.opacity=0,document.getElementById("main_booking_form").style.visibility="hidden",callMessageBox(l),!1}return!0}function hideOverlay(){document.querySelector(".overlay").style.display="none"}function callMessageBox(e){document.querySelector(".overlay").style.display="block",document.getElementById("message-box_message").innerText=e,document.getElementById("message-box").style.visibility="visible",document.getElementById("message-box").style.maxWidth="100vw",document.getElementById("message-box").style.maxHeight="100vh",document.getElementById("message-box").style.opacity=1}var booking=[{type:"Single",bookedFrom:"07/12/2018",bookedTo:"07/16/2018"},{type:"Double",bookedFrom:"07/17/2018",bookedTo:"07/19/2018"}],roomsCount=[{type:"Single",count:15},{type:"Double",count:10},{type:"Royal",count:5},{type:"President",count:2}];window.onscroll=function(){stickyNavbar()};var navbar=document.querySelector("header"),sticky=navbar.offsetTop+150;window.matchMedia("(max-width: 700px)").matches&&navbar.classList.add("sticky"),$(function(){$(".form_select__date").each(function(){$(this).datepicker({altField:"#alternate",altFormat:" MM DD, yy",minDate:new Date})})});try{var arr=[].slice.call(document.getElementsByClassName("services"));arr.forEach(function(e){e.addEventListener("change",handleChecked)})}catch(e){console.log(e)}try{var currentSlide=0,slides=[].slice.call(document.getElementsByClassName("slide"));document.querySelector(".slider .prev").addEventListener("click",function(){slides[currentSlide].className="slide slide__disabled",currentSlide=0==currentSlide?slides.length-1:(currentSlide-1)%slides.length,slides[currentSlide].className="slide slide__enabled"}),document.querySelector(".slider .next").addEventListener("click",function(){slides[currentSlide].className="slide slide__disabled",currentSlide=(currentSlide+1)%slides.length,slides[currentSlide].className="slide slide__enabled"})}catch(e){var smImages=document.querySelectorAll(".sm-images_img"),bigImages=document.querySelectorAll(".big-images_img"),slideIndex=1;try{document.getElementsByClassName("sm-image__next")[0].addEventListener("click",function(e){if(e.target.classList.contains("sm-images__disabled"))return null;var t=[].slice.call(document.getElementsByClassName("sm-images_img"));t=t.filter(function(e){return e.classList.contains("active")}),"SPAN"!==t[t.length-1].nextElementSibling.tagName?(t[0].className="sm-images_img",t[t.length-1].nextElementSibling.className="sm-images_img active",document.getElementsByClassName("sm-images__disabled").length>0&&(console.log(document.getElementsByClassName("sm-images__disabled").length),document.getElementsByClassName("sm-images__disabled")[0].classList.remove("sm-images__disabled")),"SPAN"===t[t.length-1].nextElementSibling.nextElementSibling.tagName&&t[t.length-1].nextElementSibling.nextElementSibling.classList.add("sm-images__disabled")):e.target.classList.add("sm-images__disabled")});var images=[].slice.call(document.getElementsByClassName("sm-images_img"));images.forEach(function(e){e.addEventListener("click",function(e){[].slice.call(document.getElementsByClassName("big-images_img")).forEach(function(t){t.classList.contains("active")&&t.classList.remove("active"),console.log(t.name),console.log(e.target.name),t.name===e.target.name&&t.classList.add("active")})})}),document.getElementsByClassName("sm-images__prev")[0].addEventListener("click",function(e){if(e.target.classList.contains("sm-images__disabled"))return null;var t=[].slice.call(document.getElementsByClassName("sm-images_img"));t=t.filter(function(e){return e.classList.contains("active")}),"SPAN"!==t[0].previousElementSibling.tagName?(t[0].previousElementSibling.className="sm-images_img active",t[2].className="sm-images_img",document.getElementsByClassName("sm-images__disabled").length>0&&document.getElementsByClassName("sm-images__disabled")[0].classList.remove("sm-images__disabled"),"SPAN"===t[0].previousElementSibling.previousElementSibling.tagName&&document.getElementsByClassName("sm-images__prev")[0].classList.add("sm-images__disabled")):(document.getElementsByClassName("sm-images__prev")[0].classList.add("sm-images__disabled"),console.log(e.target.classList))})}catch(e){}}try{document.querySelector(".overlay").addEventListener("click",function(e){e.preventDefault(),[].slice.call(document.querySelectorAll(".popup")).forEach(function(e){e.style.visibility="hidden",e.style.maxWidth=0,e.style.maxHeight=0,e.style.opacity=0}),document.querySelector("#main_booking_form").style.visibility="hidden",document.querySelector("#main_booking_form").style.maxHeight=0,e.target.style.display="none"});var forms=[].slice.call(document.getElementsByClassName("form"));forms.forEach(function(e){e.classList.contains("final-booking")?e.addEventListener("submit",function(e){e.preventDefault(),console.log("Booked"),e.target.style.maxWidth=0,e.target.style.maxHeight=0,e.target.style.opacity=0,e.target.style.visibility="hidden";var t=document.querySelector("#main_booking_form");callMessageBox("Dear "+t.querySelector("#first_name").value+" "+t.querySelector("#last_name").value+". Youre number '"+t.querySelector("#room_type").value+"' has been reserved for "+t.querySelector("#arrive_data").value+" - "+t.querySelector("#departurer_data").value)}):e.addEventListener("submit",function(e){e.preventDefault();var t=new FormData(e.srcElement),s=t.get("arrive_data"),a=t.get("departurer_data"),l=parseInt("adults"===t.get("adults").toLowerCase()?"0":t.get("adults")),i=parseInt("childrens"===t.get("children").toLowerCase()?"0":t.get("children")),n=createBookQuery(s,a,l,i);if(!canBook(n))return null;document.querySelector(".overlay").style.display="block";var o=document.querySelector("#main_booking_form");o.style.visibility="visible",o.style.maxHeight="100vh",o.style.maxWidth="100vh",o.style.opacity=1,o.querySelector("#arrive_data").value=n.bookedFrom,o.querySelector("#departurer_data").value=n.bookedTo,o.querySelector("#adults").value=l,o.querySelector("#children").value=i,o.querySelector("#room_type").value=n.type,booking.push(n),e.srcElement.reset()})})}catch(e){console.log(e)}document.getElementById("message-box_button").addEventListener("click",function(e){e.preventDefault(),setTimeout(hideOverlay(),1e3),document.getElementById("message-box").style.visibility="hidden",document.getElementById("message-box").style.maxWidth=0,document.getElementById("message-box").style.maxHeight=0,document.getElementById("message-box").style.opacity=0}),document.querySelector(".nav-icon3").addEventListener("click",function(){document.querySelector(".nav-icon3").classList.toggle("open")});
//# sourceMappingURL=../maps/main.js.map