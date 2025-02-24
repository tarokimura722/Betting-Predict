// 페이지 로드 시 드롭다운 메뉴 초기화
window.onload = function() {
    // 데이터 로드 확인
    if (typeof bettingData === 'undefined' || !bettingData) {
        console.error('betting_data.js가 로드되지 않았습니다.');
        return;
    }

    // 종목 옵션 설정
    const sportSelect = document.getElementById('sport');
    const sports = [...new Set(bettingData.map(item => item.종목))].filter(Boolean).sort();
    
    // 기존 옵션 제거 (전체 옵션 제외)
    while (sportSelect.options.length > 1) {
        sportSelect.remove(1);
    }
    
    // 새 옵션 추가
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport;
        option.textContent = sport;
        sportSelect.appendChild(option);
    });

    // 베팅유형 옵션 설정
    const betTypeSelect = document.getElementById('betType');
    const betTypes = [...new Set(bettingData.map(item => item.베팅유형))].filter(Boolean).sort();
    
    // 기존 옵션 제거 (전체 옵션 제외)
    while (betTypeSelect.options.length > 1) {
        betTypeSelect.remove(1);
    }
    
    // 새 옵션 추가
    betTypes.forEach(betType => {
        const option = document.createElement('option');
        option.value = betType;
        option.textContent = betType;
        betTypeSelect.appendChild(option);
    });

    // 디버깅용 로그
    console.log('로드된 종목:', sports);
    console.log('로드된 베팅유형:', betTypes);
};

// ... calculateProbabilities 함수는 이전과 동일 ...
