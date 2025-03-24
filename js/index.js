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
    const folderBox = document.querySelector(".folder-box > .folders > li");
    console.log(folderBox.classList.contains("folder-ani"));

        console.log(folderBox.clientHeight);

    window.addEventListener('scroll', function() {
        // console.log(window.scrollY);
        // console.log(folderBox.scrollY);
        // console.log(aboutMe.offsetTop);
        if (window.scrollY >= aboutMe.offsetTop && !fileMe.classList.contains("file-me-box-ani")) {
            fileMe.classList.add("file-me-box-ani");
        } 

        
        if (window.scrollY >= aboutMe.offsetTop + 250 && !folderBox.classList.contains("folder-ani")) {
            folderBox.classList.add("folder-ani");
        }
    });






    // 스킬부분 이벤트

    // let item = document.getElementsByClassName("item")[0];
    let    itemValue = document.getElementsByClassName("gauge")[0];

    let progressStartValue = 0,    
        progressEndValue = 85,    
        speed = 100;

    let progress = setInterval(() => {
    if (progressStartValue < progressEndValue) {
        progressStartValue++;
        itemValue.textContent = `${progressStartValue}%`;
        let gradientWidth = (progressStartValue / progressEndValue) * 100; // 비율을 계산하여 100%로 설정
        itemValue.style.background = `linear-gradient(to right, yellow ${gradientWidth}%, orange ${gradientWidth}%)`;
    } else {
        clearInterval(progress);
    }
}, speed);


    // let progress = setInterval(() => {
    //     progressStartValue++;
    //     itemValue.textContent = `${progressStartValue}%`
    //     let gradientWidth = progressStartValue + progressEndValue ;
    //     itemValue.style.background = `linear-gradient(to right, yellow ${gradientWidth}%, orange ${gradientWidth}%)`;

    //     if(progressStartValue == progressEndValue){
    //         clearInterval(progress);
    //     } 
    // }, speed);
};
