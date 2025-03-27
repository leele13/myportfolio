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

        item.addEventListener('mouseover', () => {
            spans.forEach((span) => {
                span.style.width = '0%';
                setTimeout(() => {
                    span.style.opacity = 1;
                    span.style.width = span.dataset.width;
                    span.innerHTML = span.dataset.width;
                    item.classList.add('item-hover');  // 배경색을 추가할 클래스
                }, 100);
            });
        
            progressCircle.style.strokeDashoffset = circumference;
            setTimeout(() => {
                progressCircle.style.strokeDashoffset = offset;
            }, 0);
        
            if (window.matchMedia("(min-width: 1440px)").matches) {
                if (!item.querySelector('.item-data')) {
                    const spanElement = document.createElement('span');
                    spanElement.classList.add("item-data");
                    spanElement.innerHTML = spans[0].dataset.width;
                    item.appendChild(spanElement);
                }
        
                item.classList.add("item-style");
                item.querySelector('img').style.opacity = '0.2';
        
                if (!circleContainer.querySelector('p')) {
                    const newPElement = document.createElement('p');
                    newPElement.innerText = pElement.innerText;
                    circleContainer.appendChild(newPElement);
                    circleContainer.classList.add("circle-style");
                }
            }
        });
        
        item.addEventListener('mouseout', () => {
            spans.forEach((span) => {
                span.style.opacity = 0;
                span.style.width = '0%';
                span.innerHTML = '';
            });
        
            // `transitionend` 이벤트를 사용하여 배경색 애니메이션이 끝난 후 클래스를 제거
            item.addEventListener('transitionend', () => {
                item.classList.remove('item-hover');
            });
        
            if (window.matchMedia("(min-width: 1440px)").matches) {
                const spanData = item.querySelector('.item-data');
                if (spanData) spanData.remove();
        
                const circleText = circleContainer.querySelector('p');
                if (circleText) circleText.remove();
        
                circleContainer.classList.remove('circle-style');
            }
        
            item.querySelector('img').style.opacity = '1';
            item.classList.remove("item-style");
        
            progressCircle.style.strokeDashoffset = circumference;
    });

        
    // 포트폴리오 슬라이드 이벤트
    const portfolioDescBox = document.querySelector('.portfolio-desc-box');
    const leftArrow = document.querySelector('.lf-arrow');
    const rightArrow = document.querySelector('.rt-arrow');

    let currentIndex = 0; // 현재 슬라이드 인덱스
    const totalSlides = document.querySelectorAll('.portfolio-box').length; // 총 포트폴리오 박스 개수

    // 슬라이드 이동 함수
    function moveSlide(index) {
        // 인덱스 범위 설정 (총 슬라이드 수를 넘지 않도록)
        if (index < 0) {
            currentIndex = totalSlides - 1; // 마지막 슬라이드로
        } else if (index >= totalSlides) {
            currentIndex = 0; // 첫 번째 슬라이드로
        } else {
            currentIndex = index;
        }

        // 슬라이드 이동 (좌측으로 이동)
        const offset = -currentIndex * (document.querySelector('.portfolio-box').offsetWidth + 20); // 20px은 항목 간의 간격
        portfolioDescBox.style.transform = `translateX(${offset}px)`;
    }

    // 좌측 화살표 클릭 이벤트
    leftArrow.addEventListener('click', () => {
        moveSlide(currentIndex - 1); // 왼쪽으로 슬라이드 이동
    });

    // 우측 화살표 클릭 이벤트
    rightArrow.addEventListener('click', () => {
        moveSlide(currentIndex + 1); // 오른쪽으로 슬라이드 이동
    });

    // 페이지 로드 시 초기 상태로 첫 번째 슬라이드 보이기
    moveSlide(currentIndex);

    // 자동 슬라이드 기능 (3초마다 슬라이드 이동)
    const slideInterval = 3000; // 자동 슬라이드 간격 (3초)

    // 자동으로 슬라이드 이동하는 함수
    function autoSlide() {
        moveSlide(currentIndex + 1); // 오른쪽으로 슬라이드 이동
    }

    // setInterval로 일정 간격마다 자동 슬라이드 실행
    setInterval(autoSlide, slideInterval);

        
    });
};
