window.onload = function() {

    // 헤더 이벤트 

    function mobileMenuToggle() {
        document.getElementsByClassName('mobile-btn')[0].addEventListener('click', function() {
            this.classList.toggle('close');
            const menuBox = document.getElementsByClassName('mainmenu')[0];
            const body = document.body; // body 요소 선택
            if(menuBox.classList.contains('active')) {
                menuBox.classList.remove('active');
                setTimeout(() => {
                    menuBox.style.display = 'none'; // 애니메이션 후에 숨기기
                    body.classList.remove('no-scroll'); // 스크롤 허용
                }, 300); // 애니메이션 시간과 동일하게 설정
            } else {
                menuBox.style.display = 'block';
                body.classList.add('no-scroll'); // 스크롤 막기
                setTimeout(() => {
                    menuBox.classList.add('active'); // 애니메이션 시작
                }, 10); // 약간의 지연 후에 active 클래스 추가
            }
        });
    }
    mobileMenuToggle();

    window.addEventListener('resize', function() {
        const menuBox = document.getElementsByClassName('mainmenu')[0];
        if (window.innerWidth >= 1440) { // PC 버전 해상도 기준
            menuBox.style.display = 'block'; // 메뉴 박스를 보이게 설정
            } else {
            // 모바일 버전에서는 기존 로직 유지
            if (!menuBox.classList.contains('active')) {
            menuBox.style.display = 'none'; // 메뉴 박스를 숨김
            }
        }
    });

    // 인트로 이벤트 

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
    const strBox = document.querySelector(".str-box");
    const endeavorBox = document.querySelector(".endeavor-box");
    const visionBox = document.querySelector(".vision-box");
    const folderBox = document.querySelectorAll(".box");
    console.log(strBox.classList.contains("box-slide-ani"));

    window.addEventListener('scroll', () => {
        console.log(window.scrollY);
        // console.log(folderBox.scrollY);
        // console.log(aboutMe.offsetTop);
        if (window.scrollY >= aboutMe.offsetTop && !fileMe.classList.contains("file-me-box-ani")) {
            fileMe.classList.add("file-me-box-ani");
        };
        
        if (window.scrollY >= aboutMe.offsetTop + 250) {

            folderBox.forEach(box => {
                box.querySelector("div").style.opacity = 1;
                box.querySelector("img").style.opacity = 1;
            });

            if (!strBox.classList.contains("lf-slide")) {
                strBox.classList.add("lf-slide");
            }
            if (!endeavorBox.classList.contains("rt-slide")) {
                endeavorBox.classList.add("rt-slide");
                endeavorBox.getElementsByClassName("folder-second")[0].style.opacity = 1;
            }
            if (!visionBox.classList.contains("lf-slide")) {
                visionBox.classList.add("lf-slide");
            }
        }
    });

    // skill부분 이벤트
    const items = document.querySelectorAll('.item');

    items.forEach((item) => {
        const spans = item.querySelectorAll('.gauge > span');
        const percentage = parseInt(spans[0].dataset.width, 10); // 데이터에서 퍼센트 가져오기
        const progressCircle = item.querySelector('.progress-circle .progress'); // 각 아이템의 프로그레스 바 선택
        const radius = progressCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100 * circumference);
        const pElement = item.querySelector('p');
        const circleContainer = document.getElementsByClassName('circle')[0];


        let newSpanElement = document.createElement('span'); // 스팬을 전역 변수로 선언 

        item.addEventListener('mouseover', () => {
            spans.forEach((span) => {
                span.style.width = '0%'; // 초기값을 0%로 설정
                setTimeout(() => {
                    span.style.opacity = 1;
                    span.style.width = span.dataset.width; // data-width 값으로 변경
                    span.innerHTML = span.dataset.width; // 텍스트도 업데이트
                    item.style.backgroundColor = 'rgba(220, 232, 239, 0.1)'; // 배경색 변경
                }, 100); // 약간의 지연 후에 변경
            });

            // 프로그레스 바 애니메이션 시작
            progressCircle.style.strokeDashoffset = circumference; // 초기화
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = offset; // 애니메이션 시작
            }, 0);

            // PC 버전에서만 p 요소 추가
            if (window.matchMedia("(min-width: 1440px)").matches) {
                newSpanElement = document.createElement('span');
                item.appendChild(newSpanElement);
                item.classList.add("item-style");
                newSpanElement.classList.add("item-data");
                item.querySelector('img').style.opacity = '0.2';

                spans.forEach((span)=> {
                    const newPElement = document.createElement('p');
                    newPElement.innerText = pElement.innerText; // 기존 p의 텍스트를 넣음
                    circleContainer.appendChild(newPElement);
                    circleContainer.classList.add("circle-style");
                    newSpanElement.innerHTML = span.dataset.width;
                });
            }
        });

        item.addEventListener('mouseout', () => {
            spans.forEach((span) => {
                span.style.opacity = 0;
                span.style.width = '0%'; // 마우스 아웃 시 초기값으로 되돌리기
                span.innerHTML = ''; // 텍스트도 초기화
                item.style.backgroundColor = ''; // 배경색 초기화
            });

            // 서클 안에 있는 p 텍스트 제거 (PC 버전에서만)
            if (window.matchMedia("(min-width: 1440px)").matches) {
                circleContainer.innerHTML = ''; // 서클 안에 있는 p텍스트 제거
            }
            newSpanElement.innerHTML = ''; // 스팬 안에 있는 텍스트 제거
            item.classList.remove("item-style"); // 클래스 제거


            // 프로그레스 바 초기화
            progressCircle.style.strokeDashoffset = circumference; // 초기화
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = circumference; // 다시 초기화하여 보이지 않도록
            }, 0);

            // 이미지 오파시티 초기화
            item.querySelector('img').style.opacity = '1'; // 이미지 오파시티를 1로 설정하여 원래 상태로 복원
            // 클래스 제거
            // item.classList.remove("item-style"); // 클래스 제거
        });
    });


};
