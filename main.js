document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.atlas-button');
    let posX = 0;
    let posY = 0;
    let speedX = 1.;
    let speedY = 1.0;
    let directionX = 1;
    let directionY = 1;
    const margin = 0;

    // 팝업창 요소들
    const popup = document.getElementById('about-popup');
    const closeBtn = document.querySelector('.close');
    
    // about-text 내의 모든 strong 태그 선택
    const strongElements = document.querySelectorAll('.about-text strong');
    
    // 각 strong 태그에 클릭 이벤트 추가
    strongElements.forEach(strong => {
        strong.style.cursor = 'pointer'; // 커서 스타일 변경
        
        strong.addEventListener('click', function() {
            // 팝업창 내용 업데이트
            const popupContent = document.querySelector('.about-popup-content p');
            if (popupContent) {
                popupContent.textContent = `${this.textContent}에 대한 상세 설명이 여기에 들어갑니다.`;
            }
            
            // 팝업창 표시
            if (popup) {
                popup.style.display = 'block';
            }
        });
    });
    
    // 닫기 버튼 클릭 이벤트
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (popup) {
                popup.style.display = 'none';
            }
        });
    }
    
    // 팝업창 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
    // ESC 키 누르면 팝업창 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popup && popup.style.display === 'block') {
            popup.style.display = 'none';
        }
    });

    function getRandomDirection() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    function moveButton() {
        const buttonRect = button.getBoundingClientRect();
        const maxX = window.innerWidth - buttonRect.width - margin;
        const maxY = window.innerHeight - buttonRect.height - margin;

        // 랜덤하게 방향 변경 (5% 확률)
        if (Math.random() < 0.00001) {
            directionX = getRandomDirection();
            directionY = getRandomDirection();
        }

        // 새로운 위치 계산
        let newX = posX + speedX * directionX;
        let newY = posY + speedY * directionY;

        // 화면 경계 체크
        if (newX < margin) {
            newX = margin;
            directionX = 1;
        } else if (newX > maxX) {
            newX = maxX;
            directionX = -1;
        }

        if (newY < margin) {
            newY = margin;
            directionY = 1;
        } else if (newY > maxY) {
            newY = maxY;
            directionY = -1;
        }

        // 위치 업데이트
        posX = newX;
        posY = newY;

        // transform 대신 left/top 사용
        button.style.left = `${posX}px`;
        button.style.top = `${posY}px`;
        requestAnimationFrame(moveButton);
    }

    // 초기 위치 설정 (화면 중앙)
    posX = (window.innerWidth - button.offsetWidth) / 2;
    posY = (window.innerHeight - button.offsetHeight) / 2;
    button.style.left = `${posX}px`;
    button.style.top = `${posY}px`;

    moveButton();
});