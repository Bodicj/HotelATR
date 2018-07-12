var booking = [
    {
        type: 'Single',
        bookedFrom: '07/12/2018',
        bookedTo: '07/16/2018'
    },
    {
        type: 'Double',
        bookedFrom: '07/17/2018',
        bookedTo: '07/19/2018'
    },
];
var roomsCount = [
    {
        type: 'Single',
        count: 15
    },
    {
        type: 'Double',
        count: 10
    },
    {
        type: 'Royal',
        count: 5
    },
    {
        type: 'President',
        count: 2
    },
];


function handleChecked(e) {
    e.preventDefault();
    if (document.querySelector('.active_img')) document.querySelector('.active_img').classList.toggle('active_img');
    document.querySelector('#' + e.target.value).classList.toggle('active_img');
}

//Sticky navbar
window.onscroll = function () {
    stickyNavbar()
};
var navbar = document.querySelector("header");
var sticky = navbar.offsetTop + 150;
//Header for mobile layout
if (window.matchMedia("(max-width: 700px)").matches) {
    navbar.classList.add("sticky")
}

function stickyNavbar() {
    if (!window.matchMedia("(max-width: 700px)").matches) {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }
}

//Datepicker
$(function () {
    $('.form_select__date').each(function () {
        $(this).datepicker({
            altField: "#alternate",
            altFormat: " MM DD, yy",
            minDate: new Date()
        });
    });
});

//Hotel services filter
try {
    var arr = [].slice.call(document.getElementsByClassName('services'));
    arr.forEach(function (item) {
        item.addEventListener('change', handleChecked);
    });
} catch (e) {
    console.log(e);
}

//Sliders
try {
    var currentSlide = 0;
    var slides = [].slice.call(document.getElementsByClassName('slide'));
    document.querySelector('.slider .prev').addEventListener('click', function () {
        slides[currentSlide].className = 'slide slide__disabled';
        currentSlide == 0 ? currentSlide = slides.length - 1 : currentSlide = (currentSlide - 1) % slides.length;
        slides[currentSlide].className = 'slide slide__enabled';
    });
    document.querySelector('.slider .next').addEventListener('click', function () {
        slides[currentSlide].className = 'slide slide__disabled';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].className = 'slide slide__enabled';
    });

} catch (e) {
    var smImages = document.querySelectorAll('.sm-images_img');
    var bigImages = document.querySelectorAll('.big-images_img');
    var slideIndex = 1;
    try {
        document.getElementsByClassName('sm-image__next')[0].addEventListener('click', function (event) {
            if (event.target.classList.contains('sm-images__disabled')) return null;
            var actives = [].slice.call(document.getElementsByClassName('sm-images_img'));
            actives = actives.filter(function (node) {
                return node.classList.contains('active');
            });
            if (actives[actives.length - 1].nextElementSibling.tagName !== 'SPAN') {
                actives[0].className = 'sm-images_img';
                actives[actives.length - 1].nextElementSibling.className = 'sm-images_img active';
                if (document.getElementsByClassName('sm-images__disabled').length > 0) {
                    console.log(document.getElementsByClassName('sm-images__disabled').length);
                    document.getElementsByClassName('sm-images__disabled')[0].classList.remove('sm-images__disabled');
                }
                if (actives[actives.length - 1].nextElementSibling.nextElementSibling.tagName === 'SPAN') actives[actives.length - 1].nextElementSibling.nextElementSibling.classList.add('sm-images__disabled');
            }
            else {
                event.target.classList.add('sm-images__disabled');
            }
        });
        var images = [].slice.call(document.getElementsByClassName('sm-images_img'));
        images.forEach(function (img) {
            img.addEventListener('click', function (event) {
                var bigPhotos = [].slice.call(document.getElementsByClassName('big-images_img'));
                bigPhotos.forEach(function (node) {
                    if (node.classList.contains('active')) node.classList.remove('active');
                    console.log(node.name);
                    console.log(event.target.name);
                    if (node.name === event.target.name) node.classList.add('active');
                })
            })
        });
        document.getElementsByClassName('sm-images__prev')[0].addEventListener('click', function (event) {
            if (event.target.classList.contains('sm-images__disabled')) return null;
            var actives = [].slice.call(document.getElementsByClassName('sm-images_img'));
            actives = actives.filter(function (node) {
                return node.classList.contains('active');
            });
            if (actives[0].previousElementSibling.tagName !== 'SPAN') {
                actives[0].previousElementSibling.className = 'sm-images_img active';
                actives[2].className = 'sm-images_img';
                if (document.getElementsByClassName('sm-images__disabled').length > 0) {
                    document.getElementsByClassName('sm-images__disabled')[0].classList.remove('sm-images__disabled');
                }
                if (actives[0].previousElementSibling.previousElementSibling.tagName === 'SPAN') document.getElementsByClassName('sm-images__prev')[0].classList.add('sm-images__disabled');
            }
            else {
                document.getElementsByClassName('sm-images__prev')[0].classList.add('sm-images__disabled');
                console.log(event.target.classList);
            }
        });
    } catch (e) {

    }
}


/*
    type: 'Double',
    bookedFrom: '07/17/2018',
    bookedTo: '07/19/2018'
*/


//Forms
try {
    document.querySelector('.overlay').addEventListener('click', function (event) {
        event.preventDefault();
        var arrayOfPopups = [].slice.call(document.querySelectorAll('.popup'));
        arrayOfPopups.forEach(element => {
            element.style.visibility = 'hidden';
            element.style.maxWidth = 0;
            element.style.maxHeight = 0;
            element.style.opacity = 0
        });
        document.querySelector('#main_booking_form').style.visibility = 'hidden';
        document.querySelector('#main_booking_form').style.maxHeight = 0;
        event.target.style.display = 'none';
    });
    var forms = [].slice.call(document.getElementsByClassName('form'));
    forms.forEach(function (form) {
        if (!form.classList.contains('final-booking')) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                var formData = new FormData(event.srcElement);
                var arrive = formData.get('arrive_data');
                var depart = formData.get('departurer_data');
                var adults = parseInt(formData.get('adults').toLowerCase() === 'adults' ? '0' : formData.get('adults'));
                var children = parseInt(formData.get('children').toLowerCase() === 'childrens' ? '0' : formData.get('children'));
                var roomInfo = createBookQuery(arrive, depart, adults, children);
                if (canBook(roomInfo)) {
                    document.querySelector('.overlay').style.display = 'block';
                    var bookingForm = document.querySelector('#main_booking_form');
                    bookingForm.style.visibility = 'visible';
                    bookingForm.style.maxHeight = '100vh';
                    bookingForm.style.maxWidth = '100vh';
                    bookingForm.style.opacity = 1;
                    bookingForm.querySelector('#arrive_data').value = roomInfo.bookedFrom;
                    bookingForm.querySelector('#departurer_data').value = roomInfo.bookedTo;
                    bookingForm.querySelector('#adults').value = adults;
                    bookingForm.querySelector('#children').value = children;
                    bookingForm.querySelector('#room_type').value = roomInfo.type;
                    booking.push(roomInfo);
                    event.srcElement.reset();
                } else {
                    return null
                }
            })
        } else {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                console.log('Booked');
                event.target.style.maxWidth = 0;
                event.target.style.maxHeight = 0;
                event.target.style.opacity = 0;
                event.target.style.visibility = 'hidden';
                var bookingForm = document.querySelector('#main_booking_form');
                var message = 'Dear ' + bookingForm.querySelector('#first_name').value + ' ' + bookingForm.querySelector('#last_name').value + '. Youre number ' + '\'' + bookingForm.querySelector('#room_type').value +
                    '\'' + ' has been reserved for ' + bookingForm.querySelector('#arrive_data').value + ' - ' + bookingForm.querySelector('#departurer_data').value;
                callMessageBox(message);
            });
        }
    });
} catch (e) {
    console.log(e)
}

function createBookQuery(arrive, depart, adults, children) {
    var bookQuery = {};
    bookQuery.bookedFrom = arrive;
    bookQuery.bookedTo = depart;
    if (adults < 1) {
        console.error('Adults is required field');
        return null
    }
    if (adults > 0 && (adults + children) <= 2) {
        bookQuery.type = 'Single';
        return bookQuery
    } else {
        if ((adults > 0 && (adults + children) > 2 && (adults + children) < 4)) {
            bookQuery.type = 'Double';
            return bookQuery
        }
        if ((adults > 0 && (adults + children) >= 4)) {
            bookQuery.type = "Royal";
            return bookQuery
        }
        if ((adults >= 4 && children === 0)) {
            bookQuery.type = "President";
            return bookQuery
        }
    }
    return bookQuery
}

function validateDate(from, to) {
    if (from > to) {
        callMessageBox('Please change youre departurer date it cannot be lower than arrive date')
        return false
    }
    return true
}

function canBook(roomInfo) {
    if (roomInfo == null) return null;
    var bookedFrom = new Date(roomInfo.bookedFrom).getTime();
    var bookedTo = new Date(roomInfo.bookedTo).getTime();
    if (!validateDate(bookedFrom, bookedTo)) return false;
    var filteredBooking = booking.filter(function (el) {
        var elBookedTo = new Date(el.bookedTo).getTime();
        var elBookedFrom = new Date(el.bookedFrom).getTime();
        return el.type === roomInfo.type && (elBookedFrom <= bookedFrom && elBookedTo >= bookedFrom)
    });
    if (filteredBooking.length > 0 && filteredBooking.length > roomsCount.filter(function (el) {
        return el.type === filteredBooking[0].type
    })[0].count) {
        let message = 'We\'re so sorry, but this number was booked from: ' + filteredBooking[0].bookedFrom + ' to: ' + filteredBooking[0].bookedTo + ' by another customer.';
        document.getElementById('main_booking_form').style.maxWidth = 0;
        document.getElementById('main_booking_form').style.maxHeight = 0;
        document.getElementById('main_booking_form').style.opacity = 0;
        document.getElementById('main_booking_form').style.visibility = 'hidden';
        callMessageBox(message);
        return false;
    }
    return true
};
document.getElementById('message-box_button').addEventListener('click', function (event) {
    event.preventDefault();
    setTimeout(hideOverlay(), 1000);
    document.getElementById('message-box').style.visibility = 'hidden';
    document.getElementById('message-box').style.maxWidth = 0;
    document.getElementById('message-box').style.maxHeight = 0;
    document.getElementById('message-box').style.opacity = 0;
});
function hideOverlay() {
    document.querySelector('.overlay').style.display = 'none';
}
function callMessageBox(message) {
    document.querySelector('.overlay').style.display = 'block';
    document.getElementById('message-box_message').innerText = message;
    document.getElementById('message-box').style.visibility = 'visible';
    document.getElementById('message-box').style.maxWidth = '100vw';
    document.getElementById('message-box').style.maxHeight = '100vh';
    document.getElementById('message-box').style.opacity = 1;
}

document.querySelector('.nav-icon3').addEventListener('click', () => {
    document.querySelector('.nav-icon3').classList.toggle('open')
});