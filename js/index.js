window.onload = function() {

    // 헤더 이벤트 
    function mobileMenuToggle() {
        document.getElementsByClassName('mobile-btn')[0].addEventListener('click', function() {
            this.classList.toggle('close');
            const menuBox = document.getElementsByClassName('mainmenu')[0];
            const body = document.body; 
            if(menuBox.classList.contains('active')) {
                menuBox.classList.remove('active');
                setTimeout(() => {
                    menuBox.style.display = 'none'; 
                    body.classList.remove('no-scroll');  
                }, 300); 
            } else {
                menuBox.style.display = 'block';
                body.classList.add('no-scroll');  
                setTimeout(() => {
                    menuBox.classList.add('active'); 
                }, 10); 
            }
        });
    
        const links = document.querySelectorAll('.mainmenu .gnb a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                const menuBox = document.getElementsByClassName('mainmenu')[0];
                if (window.innerWidth < 1440) {  
                    menuBox.classList.remove('active');
                    menuBox.style.display = 'none'; 
                    document.body.classList.remove('no-scroll'); 
                }
    
                const closeSpan = document.querySelector('.close');
                if (closeSpan) {
                    closeSpan.classList.remove('close');
                }
            });
        });
    }
    mobileMenuToggle();

    window.addEventListener('resize', function() {
        const mobileBtn = document.getElementsByClassName('mobile-btn')[0];
        const menuBox = document.getElementsByClassName('mainmenu')[0];
        // PC 화면 크기일 경우 메뉴가 항상 보이도록 설정
        if (window.innerWidth >= 1440) { 
            menuBox.style.display = 'block'; 
            menuBox.classList.remove('active');
            mobileBtn.classList.remove('close');
        } else {
            menuBox.style.display = 'none';
        }
    });

    // 인트로 이벤트
    const leftBirds = document.querySelectorAll('.intro-img > .lf-bird1, .lf-bird2');
    const rightBirds = document.querySelectorAll('.intro-img > .rt-bird1, .rt-bird2');
    const leftClouds = document.querySelectorAll('.intro-img > .lf-cloud1, .lf-cloud2');
    const rightClouds = document.querySelectorAll('.intro-img > .rt-cloud1, .rt-cloud2');
    const floorClouds = document.querySelectorAll('.intro-img > .f-lf-cloud1, .f-lf-cloud2, .f-rt-cloud1, .f-rt-cloud1');

    function checkPosition() {
        rightBirds.forEach(bird => {
            if (bird.getBoundingClientRect().left > window.innerWidth) {
                bird.style.opacity = '0'; 
                bird.style.transform = 'translateX(-100vw)'; 
                setTimeout(() => {
                    bird.style.transform = 'translateX(0)'; 
                    bird.style.opacity = '0'; 
                }, 1000); 
            }
        });
    
        rightClouds.forEach(cloud => {
            if (cloud.getBoundingClientRect().left > window.innerWidth) {
                cloud.style.opacity = '0'; 
                cloud.style.transform = 'translateX(-100vw)';
                setTimeout(() => {
                    cloud.style.transform = 'translateX(0)'; 
                    cloud.style.opacity = '1'; 
                }, 1000); 
            }
        });
    };

    floorClouds.forEach(floorCloud => {
        floorCloud.addEventListener('animationend', () => {
            floorCloud.style.opacity = '0'; 
        })
    });
    
    setInterval(checkPosition, 1000); 

    // 어바웃미 이벤트
    const aboutMe = document.getElementsByClassName("about-me-title")[0];
    const fileMe = document.getElementsByClassName("file-me-box")[0];
    const strBox = document.querySelector(".str-box");
    const endeavorBox = document.querySelector(".endeavor-box");
    const visionBox = document.querySelector(".vision-box");
    const folderBox = document.querySelectorAll(".box");
    const objBox = document.querySelectorAll(".desk-obj");

    // 탑버튼 이벤트
    const topButton = document.getElementById('top-btn');
    const topImage = document.getElementById('top-img');
    const topText = document.getElementById('top-txt');

    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        // console.log(window.scrollY);
        
        // 어바웃미 관련 애니메이션 처리
        if (window.scrollY >= aboutMe.offsetTop && !fileMe.classList.contains("file-me-box-ani")) {
            fileMe.classList.add("file-me-box-ani");
        }
        
        if (window.scrollY >= aboutMe.offsetTop + 250) {
            folderBox.forEach(box => {
                box.querySelector("div").style.opacity = 1;
                box.querySelector("img").style.opacity = 1;
            });

            objBox.forEach(obj => {
                obj.style.opacity = 1;
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

        // 탑버튼 이미지와 텍스트 색상 변경
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;  
        
        // 문서 높이의 절반을 초과하면 두 번째 이미지로 변경
        if (scrollPosition > documentHeight / 2) {
            topImage.src = '../images/Mooon.png'; 
            topImage.classList.add('moon-style');
            topText.style.color = '#262626'; 
        } else {
            topImage.src = '../images/top_btn_sun.png'; 
            topImage.classList.remove('moon-style');
            topText.style.color = '#FFFFFF'; 
        }
    });

    // 탑버튼 클릭 시 상단으로 스크롤 이동
    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // skill부분 이벤트
    const rotateWrapper = document.querySelector('.rotate-wrapper');
    const items = document.querySelectorAll('.item');

    const setAnimationPlayState = (state) => { // 호버시 애니메이션 퍼즈/러닝 이벤트 
        const itemBoxes = rotateWrapper.querySelectorAll('.item-box');
        const circles = rotateWrapper.querySelectorAll('.circle');  
        const rotateElements = [rotateWrapper, ...itemBoxes, ...circles];
    
        rotateElements.forEach(element => {
            element.style.animationPlayState = state; 
        });
    };

    items.forEach((item) => {
        const spans = item.querySelectorAll('.gauge > span');
        const percentage = parseInt(spans[0].dataset.width, 10); 
        const progressCircle = item.querySelector('.progress-circle .progress'); 
        const radius = progressCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100 * circumference);
        const pElement = item.querySelector('p');
        const circleContainer = document.getElementsByClassName('circle')[0];

        item.addEventListener('mouseover', () => {
            setAnimationPlayState('paused');

            spans.forEach((span) => {
                span.style.width = '0%';
                setTimeout(() => {
                    span.style.opacity = 1;
                    span.style.width = span.dataset.width;
                    span.innerHTML = span.dataset.width;
                    item.classList.add('item-hover'); 
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
            setAnimationPlayState('running');

            spans.forEach((span) => {
                span.style.opacity = 0;
                span.style.width = '0%';
                span.innerHTML = '';
            });
        
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
    });

        
    // 포트폴리오 슬라이드 이벤트
    // 웹페이지 슬라이드 이벤트
    const slider1 = document.querySelector(".portfolio-web-pages");
    const dots = document.querySelectorAll(".dot");
    const slides = slider1.querySelectorAll(".port1");

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
        const slideIndex = parseInt(dot.dataset.slide);
        const slideWidth = slides[0].offsetWidth;
        slider1.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

        dots.forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
        });
    });


    // 자바스크립트, 디자인 슬라이드 이벤트 
    const portfolioDescBox = document.querySelector('.slider2 .desc-box');
    const leftArrow = document.querySelector('.lf-arrow');
    const rightArrow = document.querySelector('.rt-arrow');

    let currentIndex = 0; 
    const totalSlides = document.querySelectorAll('.port2').length; 

    let slideIntervalId; 

    //슬라이드 이동 함수
    function moveSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1; 
        } else if (index >= totalSlides) {
            currentIndex = 0; 
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * (document.querySelector('.port2').offsetWidth + 20); 
        portfolioDescBox.style.transition = 'transform 0.5s ease';  
        portfolioDescBox.style.transform = `translateX(${offset}px)`;
    }
    

    //화살표 클릭 이벤트
    leftArrow.addEventListener('click', () => {
        stopAutoSlide(); 
        moveSlide(currentIndex - 1); 
    });
    leftArrow.addEventListener('mouseover', () => {
        stopAutoSlide(); 
    });

    rightArrow.addEventListener('click', () => {
        stopAutoSlide();
        moveSlide(currentIndex + 1); 
    });
    rightArrow.addEventListener('mouseover', () => {
        stopAutoSlide(); 
    });

    // 페이지 로드 시 초기 상태로 첫 번째 슬라이드 보이기
    moveSlide(currentIndex);

    // 자동 슬라이드 기능 
    const slideInterval = 3000; 

    // 자동으로 슬라이드 이동하는 함수
    function autoSlide() {
        moveSlide(currentIndex + 1);
    }

    function startAutoSlide() {
        slideIntervalId = setInterval(autoSlide, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(slideIntervalId); 
    }

    startAutoSlide();

    // 슬라이드에 마우스 오버/아웃 이벤트 
    portfolioDescBox.addEventListener('mouseover', stopAutoSlide);

    portfolioDescBox.addEventListener('mouseout', startAutoSlide);

    // 모달 이벤트 
    const modalButtons = document.querySelectorAll('.modal-btn');

    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // 클릭한 버튼이 속한 portfolio-box에서 모달을 찾기
            const portfolioBox = this.closest('.portfolio-box');
            const modalContainer = portfolioBox.querySelector('.modal-container');

            if (modalContainer) {
                // 현재 슬라이드의 X 위치를 계산 (슬라이드가 이동한 거리)
                const portfolioDescBox = document.querySelector('.portfolio-desc-box');
                const slideOffset = portfolioDescBox.getBoundingClientRect().left;
                const modalPosition = portfolioBox.getBoundingClientRect().left - slideOffset;

                // 모달을 슬라이드에 맞게 위치하도록 수정
                modalContainer.style.left = `${modalPosition}px`; 

                // 모달을 보이게 하기 위해 'modal-container-show' 클래스 추가
                modalContainer.classList.add('modal-container-show');

                stopAutoSlide();

                // 모달 닫기 기능 (모달 외부 클릭 시 닫기)
                modalContainer.addEventListener('click', (e) => {
                    if (e.target === modalContainer) {
                        modalContainer.classList.remove('modal-container-show');
                        
                        const onTransitionEnd = () => {
                            startAutoSlide();
                            modalContainer.removeEventListener('transitionend', onTransitionEnd);
                        };
                
                        modalContainer.addEventListener('transitionend', onTransitionEnd);
                    }
                });
                
                modalContainer.style.cursor = 'pointer';
            }
        });
    });

    
    // 앵커이벤트 
    document.querySelectorAll('.gnb a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();  
            
            const targetId = this.getAttribute('href').substring(1); 
            const targetElement = document.getElementById(targetId); 
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',  
                    block: 'start'     
                });
            }
        });
    });

    
};

// 카테고리 버튼 이벤트 
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.category-btn');
    const portfolioContainer = document.querySelector('.slider2 .desc-box');
    const portfolioBoxes = document.querySelectorAll('.port2');
    console.log(buttons);

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const categoryClass = event.target.classList[1];  
            let targetIndex = -1;
    
            portfolioBoxes.forEach((box, index) => {
                if (box.classList.contains(categoryClass)) {
                targetIndex = index;
                return;
                }
            });
    
            if (targetIndex >= 0) {
                portfolioContainer.style.transform = `translateX(-${targetIndex * 100}%)`;
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.shooting-star-container');
    
    if (!container) {
    console.error("shooting-star-container not found!");
    return;
    }

    // 별똥별을 만드는 함수
    function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    // 랜덤 시작 위치 
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.2; 

    // 랜덤 속도 
    const duration = (Math.random() * 0.5 + 2) + 's';

    // 랜덤 사선 각도 
    const angle = (Math.random() * 90 + 45); 

    // CSS 스타일로 위치와 애니메이션 설정
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.animation = `shootingStar ${duration} linear forwards`;

    // 별똥별 애니메이션 경로 설정
    star.style.transform = `rotate(${angle}deg)`; 

    // 별을 컨테이너에 추가
    container.appendChild(star);

    // 애니메이션 끝나면 별을 제거
    star.addEventListener('animationend', () => {
    star.remove();
    });
    }

    // 주기적으로 별똥별을 생성 (랜덤 간격)
    setInterval(() => {
    createShootingStar();
    }, 1000); 


    // 선을 만드는 함수
    function createShootingStarLine() {
        const line = document.createElement('div');
        line.classList.add('shooting-star-line');

        // 랜덤 시작 위치 
        const startX = Math.random() * window.innerWidth;  
        const startY = Math.random() * window.innerHeight * 0.2; 

        // 랜덤 속도 
        const duration = (Math.random() * 1 + 2.5) + 's';

        // CSS 스타일로 위치와 애니메이션 설정
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.animationDuration = duration; 

        // 선을 컨테이너에 추가
        container.appendChild(line);

        // 애니메이션 끝나면 선을 제거
        line.addEventListener('animationend', () => {
            line.remove();
        });
    }

    // 주기적으로 선을 생성 (랜덤 간격)
    setInterval(() => {
        createShootingStarLine();
    }, 1000);  
});
