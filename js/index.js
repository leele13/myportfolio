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
            menuBox.classList.remove('active');
            menuBox.style.display = 'none'; 
            document.body.classList.remove('no-scroll');

            const closeSpan = document.querySelector('.close');
                if (closeSpan) {
                    closeSpan.classList.remove('close');
                }
            });
        });
    }
    mobileMenuToggle();

    window.addEventListener('resize', function() {
        const menuBox = document.getElementsByClassName('mainmenu')[0];
        if (window.innerWidth >= 1440) { 
            menuBox.style.display = 'block'; 
        } else {
            if (!menuBox.classList.contains('active')) {
            menuBox.style.display = 'none'; 
            }
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
    console.log(strBox.classList.contains("box-slide-ani"));

    window.addEventListener('scroll', () => {
        console.log(window.scrollY);
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
        const percentage = parseInt(spans[0].dataset.width, 10); 
        const progressCircle = item.querySelector('.progress-circle .progress'); 
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
    const portfolioDescBox = document.querySelector('.portfolio-desc-box');
    const leftArrow = document.querySelector('.lf-arrow');
    const rightArrow = document.querySelector('.rt-arrow');

    let currentIndex = 0; 
    const totalSlides = document.querySelectorAll('.portfolio-box').length; 

    let slideIntervalId; 

    // 슬라이드 이동 함수
    function moveSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1; 
        } else if (index >= totalSlides) {
            currentIndex = 0; 
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * (document.querySelector('.portfolio-box').offsetWidth + 20); 
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

    portfolioDescBox.addEventListener('transitionend', () => {
        if (currentIndex === totalSlides) {
            portfolioDescBox.style.transition = 'none';

            const firstSlide = portfolioDescBox.querySelector('.portfolio-box');
            portfolioDescBox.appendChild(firstSlide); 

            currentIndex = 0;

            const offset = -currentIndex * (document.querySelector('.portfolio-box').offsetWidth + 20);
            portfolioDescBox.style.transform = `translateX(${offset}px)`; 

            setTimeout(() => {
                portfolioDescBox.style.transition = 'transform 0.5s ease';
            }, 20); 
        }
    });

    //모달창 이벤트
    const modalButtons = document.querySelectorAll('.modal-btn');
    const modalContainers = document.querySelectorAll('.modal-container');

    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 

            const modalContainer = this.closest('.desc-btn-box').querySelector('.modal-container');

            if (modalContainer) {
                modalContainer.style.display = 'block'; 
                setTimeout(() => {
                    modalContainer.classList.add('show'); 
                }, 10); 
            }
        });
    });

    // 모달 외부를 클릭하면 모달을 닫는 기능
    modalContainers.forEach(container => {
        container.addEventListener('click', function(event) {
            if (event.target === this) { 
                this.classList.remove('show'); 
                setTimeout(() => {
                    this.style.display = 'none'; 
                }, 300); 
            }
        });
    });
    
    // 앵커이벤트 
    document.addEventListener('DOMContentLoaded', function() {
        const gnbLinks = document.querySelectorAll('.gnb a');
        const menuBox = document.getElementsByClassName('mainmenu')[0]; 
        const body = document.body; 
    
        gnbLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();  
    
                const targetId = this.getAttribute('href').substring(1); 
                const targetSection = document.getElementById(targetId);
    
                targetSection.scrollIntoView({
                    behavior: 'smooth',  
                    block: 'start'      
                });

                if (menuBox.classList.contains('active')) {
                    menuBox.classList.remove('active');
                    menuBox.style.display = 'none';
                    body.classList.remove('no-scroll');
                }
            });
        });
    });
};

