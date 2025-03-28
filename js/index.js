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

    let slideIntervalId; // setInterval을 저장할 변수

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
        portfolioDescBox.style.transition = 'transform 0.5s ease';  // 부드러운 애니메이션
        portfolioDescBox.style.transform = `translateX(${offset}px)`;
    }

    // 좌측 화살표 클릭 이벤트
    leftArrow.addEventListener('click', () => {
        stopAutoSlide(); // 자동 슬라이드 멈춤
        moveSlide(currentIndex - 1); // 왼쪽으로 슬라이드 이동
    });
    leftArrow.addEventListener('mouseover', () => {
        stopAutoSlide(); // 자동 슬라이드 멈춤
    });

    // 우측 화살표 클릭 이벤트
    rightArrow.addEventListener('click', () => {
        stopAutoSlide(); // 자동 슬라이드 멈춤
        moveSlide(currentIndex + 1); // 오른쪽으로 슬라이드 이동
    });
    rightArrow.addEventListener('mouseover', () => {
        stopAutoSlide(); // 자동 슬라이드 멈춤
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
    function startAutoSlide() {
        slideIntervalId = setInterval(autoSlide, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(slideIntervalId); // 자동 슬라이드 멈춤
    }

    // setInterval로 일정 간격마다 자동 슬라이드 실행
    startAutoSlide();

    // 슬라이드에 마우스 오버시 멈추기
    portfolioDescBox.addEventListener('mouseover', stopAutoSlide);

    // 슬라이드에서 마우스 아웃시 다시 시작
    portfolioDescBox.addEventListener('mouseout', startAutoSlide);

    // 마지막 슬라이드에서 첫 번째 슬라이드로 부드럽게 넘어가도록 하기 위한 순환 처리
    portfolioDescBox.addEventListener('transitionend', () => {
        if (currentIndex === totalSlides) {
            // 마지막 슬라이드일 때, 슬라이드 위치를 0으로 리셋하고, transition을 없앰
            portfolioDescBox.style.transition = 'none';

            // 마지막 슬라이드를 맨 뒤로 이동시킴 (appendChild 사용)
            const firstSlide = portfolioDescBox.querySelector('.portfolio-box');
            portfolioDescBox.appendChild(firstSlide);  // 첫 번째 슬라이드를 맨 뒤로 이동

            // 슬라이드를 첫 번째로 리셋
            currentIndex = 0;

            // 첫 번째 슬라이드로 위치 이동
            const offset = -currentIndex * (document.querySelector('.portfolio-box').offsetWidth + 20);
            portfolioDescBox.style.transform = `translateX(${offset}px)`; // 첫 번째 슬라이드로 위치 이동

            // 이후 다시 애니메이션을 위해 transition을 활성화
            setTimeout(() => {
                portfolioDescBox.style.transition = 'transform 0.5s ease';
            }, 20); // 약간의 딜레이 후에 transition을 다시 활성화
        }
    });

    //모달창 이벤트

    // 모달 버튼과 모달 컨테이너를 선택합니다.
// 모달 버튼과 모달 컨테이너를 선택합니다.
const modalButtons = document.querySelectorAll('.modal-btn');
const modalContainers = document.querySelectorAll('.modal-container');

modalButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 링크 동작 방지

        // 클릭한 버튼의 부모 요소에서 모달 컨테이너를 찾습니다.
        const modalContainer = this.closest('.desc-btn-box').querySelector('.modal-container');

        // 1. this를 확인합니다.
        console.log('Clicked button:', this+'디스 확인');

        // 2. modalContainer가 존재하는지 확인합니다.
        // console.log('Modal container:', modalContainer+'모달컨테이너확인');

        // 해당 모달을 보이게 합니다.
        if (modalContainer) {
            modalContainer.style.display = 'block'; // 모달을 보이게 설정
            setTimeout(() => {
                modalContainer.classList.add('show'); // 모달에 show 클래스를 추가하여 애니메이션 효과를 줄 수 있습니다.
                 // 3. show 클래스가 정상적으로 부여되는지 확인합니다.
                //  console.log('Show class added:', modalContainer.classList.contains('show')+'쇼 클랙스 부여확인');
            }, 10); // 약간의 지연을 주어 애니메이션 효과를 부여
        }
    });
});

// 모달 외부를 클릭하면 모달을 닫는 기능
modalContainers.forEach(container => {
    container.addEventListener('click', function(event) {
        if (event.target === this) { // 모달 외부 클릭 확인
            this.classList.remove('show'); // show 클래스를 제거하여 애니메이션 효과를 제거
            setTimeout(() => {
                this.style.display = 'none'; // 모달을 숨깁니다.
            }, 300); // 애니메이션 시간과 일치하도록 설정
        }
    });
});



    // document.addEventListener('DOMContentLoaded', function() {
    //     const btns = document.querySelectorAll('.open-modal-btn'); // 모든 버튼
    //     const modals = document.querySelectorAll('.modal-container'); // 모든 모달 컨테이너
    
    //     // 모달 보이기 함수
    //     function showModal(modal) {
    //         modal.classList.add('show'); // 모달 보이기
    //     }
    
    //     // 모달 숨기기 함수
    //     function closeModal(modal) {
    //         modal.classList.remove('show'); // 모달 숨기기
    //     }
    
    //     // 버튼 클릭 시 모달 보이기
    //     btns.forEach(function(btn) {
    //         btn.addEventListener('click', function(e) {
    //             e.preventDefault();
    //             const modalId = `modal-${btn.id.split('-')[2]}`; // 'btn-modal-1' -> 'modal-1'
    //             const targetModal = document.getElementById(modalId);
    //             if (targetModal) {
    //                 showModal(targetModal); // 해당 모달 보이기
    //             }
    //         });
    //     });
    
    //     // 모달 외부나 모달 자체 클릭 시 모달 닫기
    //     modals.forEach(function(modal) {
    //         modal.addEventListener('click', function(e) {
    //             if (e.target === modal) {
    //                 closeModal(modal); // 모달 외부 클릭 시 모달 숨기기
    //             }
    //         });
    //     });
    // });
    
    
    document.addEventListener('DOMContentLoaded', function() {
        // GNB 메뉴 항목을 모두 선택합니다
        const gnbLinks = document.querySelectorAll('.gnb a');
        
        gnbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();  // 기본 클릭 동작을 막습니다
        
                // 클릭된 링크의 href 속성 값으로 이동할 대상 섹션을 가져옵니다
                const targetId = this.getAttribute('href').substring(1);  // #을 제거한 ID 값
        
                // 해당 ID를 가진 섹션을 찾습니다
                const targetSection = document.getElementById(targetId);
                
                // 섹션으로 부드럽게 스크롤 이동
                targetSection.scrollIntoView({
                    behavior: 'smooth',  // 부드러운 스크롤
                    block: 'start'       // 스크롤 위치를 섹션의 시작 부분에 맞추기
                });
            });
        });
    });
    

    });
};
