// main.js
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    if(mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // 모바일 메뉴 링크 클릭 시 메뉴 닫기
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 스크롤 시 네비게이션 바 스타일 변경
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if(nav) {
            if(window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // 현재 페이지 네비게이션 하이라이트
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
        } else {
            link.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500');
        }
    });

    // Contact Form Validation (contact.html에서만 작동)
    const contactForm = document.querySelector('#contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 기본적인 폼 유효성 검사
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if(!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if(isValid) {
                // 여기에 폼 제출 로직 추가
                alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
                contactForm.reset();
            } else {
                alert('모든 필수 항목을 입력해주세요.');
            }
        });

        // 입력 필드 포커스 효과
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.add('border-blue-500', 'ring-2', 'ring-blue-200');
            });
            
            input.addEventListener('blur', function() {
                this.classList.remove('border-blue-500', 'ring-2', 'ring-blue-200');
            });
        });
    }

    // 이미지 로드 에러 처리
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/assets/images/placeholder.jpg';
            this.alt = '이미지를 불러올 수 없습니다';
        });
    });

    // 외부 링크 새 탭에서 열기
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // 스크롤 위치 저장 및 복원
    if (sessionStorage.getItem('scrollPosition')) {
        window.scrollTo(0, sessionStorage.getItem('scrollPosition'));
        sessionStorage.removeItem('scrollPosition');
    }

    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });
});

// 페이지 로드 완료 시 로딩 인디케이터 제거
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if(loader) {
        loader.style.display = 'none';
    }
});
