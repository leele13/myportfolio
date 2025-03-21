// $(window).on('load', function() {
//     const leftBirds = $('.intro-img > .lf-bird1, .lf-bird2');
//     const rightBirds = $('.intro-img > .rt-bird1, .rt-bird2');
//     const leftClouds = $('.intro-img > .lf-cloud1, .lf-cloud2');
//     const rightClouds = $('.intro-img > .rt-cloud1, .rt-cloud2');
//     const floorClouds = $('.intro-img > .f-lf-cloud1, .f-lf-cloud2, .f-rt-cloud1, .f-rt-cloud2');

//     function checkPosition() {
//         rightBirds.each(function() {
//             const bird = $(this);
//             console.log(bird.attr('class'));
//             if (bird[0].getBoundingClientRect().left > window.innerWidth) {
//                 bird.css({
//                     'opacity': '0',
//                     'transform': 'translateX(-100vw)'
//                 });
//                 setTimeout(function() {
//                     bird.css({
//                         'transform': 'translateX(0)',
//                         'opacity': '0'
//                     });
//                 }, 1000);
//             }
//         });

//         rightClouds.each(function() {
//             const cloud = $(this);
//             if (cloud[0].getBoundingClientRect().left > window.innerWidth) {
//                 cloud.css({
//                     'opacity': '0',
//                     'transform': 'translateX(-100vw)'
//                 });
//                 setTimeout(function() {
//                     cloud.css({
//                         'transform': 'translateX(0)',
//                         'opacity': '1'
//                     });
//                 }, 1000);
//             }
//         });
//     }

//     floorClouds.each(function() {
//         const floorCloud = $(this);
//         floorCloud.on('animationend', function() {
//             floorCloud.css('opacity', '0');
//         });
//     });

//     setInterval(checkPosition, 1000); // 1초마다 위치 확인
// });



window.onload = function() {

    // const birds = document.querySelectorAll('.lf-bird1, .lf-bird2, .rt-bird1, .rt-bird2');
    // const clouds = document.querySelectorAll('.lf-cloud1, .lf-cloud2, .rt-cloud1, .rt-cloud2');

    const leftBirds = document.querySelectorAll('.intro-img > .lf-bird1, .lf-bird2');
    const rightBirds = document.querySelectorAll('.intro-img > .rt-bird1, .rt-bird2');
    const leftClouds = document.querySelectorAll('.intro-img > .lf-cloud1, .lf-cloud2');
    const rightClouds = document.querySelectorAll('.intro-img > .rt-cloud1, .rt-cloud2');
    const floorClouds = document.querySelectorAll('.intro-img > .f-lf-cloud1, .f-lf-cloud2, .f-rt-cloud1, .f-rt-cloud1');



    function checkPosition() {
        rightBirds.forEach(bird => {
            // console.log(bird.className);
            if (bird.getBoundingClientRect().left > window.innerWidth) {
                bird.style.opacity = '0'; // 사라지기
                bird.style.transform = 'translateX(-100vw)'; // 반대쪽에서 나타나기
                setTimeout(() => {
                    bird.style.transform = 'translateX(0)'; // 원래 자리로 돌아가기
                    bird.style.opacity = '0'; // 다시 나타나기
                }, 1000); // 1초 후에 다시 나타나게 설정
            }
        });
    
        rightClouds.forEach(cloud => {
            if (cloud.getBoundingClientRect().left > window.innerWidth) {
                cloud.style.opacity = '0'; // 사라지기
                cloud.style.transform = 'translateX(-100vw)'; // 반대쪽에서 나타나기
                setTimeout(() => {
                    cloud.style.transform = 'translateX(0)'; // 원래 자리로 돌아가기
                    cloud.style.opacity = '1'; // 다시 나타나기
                }, 1000); // 1초 후에 다시 나타나게 설정
            }
        });
    }

    floorClouds.forEach(floorCloud => {
        floorCloud.addEventListener('animationend', () => {
            floorCloud.style.opacity = '0'; 
        })
    });
    
    setInterval(checkPosition, 1000); // 0.1초마다 위치 확인


    const aboutMe = document.getElementsByClassName("about-me-title")[0];
    const fileMe = document.getElementsByClassName("file-me-box")[0];

    window.addEventListener('scroll', function() {
        console.log(window.scrollY);
        // console.log(aboutMe.offsetTop);
        if (window.scrollY >= aboutMe.offsetTop && !fileMe.classList.contains("file-me-box-ani")) {
            fileMe.style.display = "block";
            fileMe.classList.add("file-me-box-ani");
        }
    });
};
