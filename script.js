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
    
    // 기존 옵션 유지하면서 새로운 옵션 추가
    const existingSports = Array.from(sportSelect.options).map(option => option.value);
    sports.forEach(sport => {
        if (sport && !existingSports.includes(sport)) {
            const option = document.createElement('option');
            option.value = sport;
            option.textContent = sport;
            sportSelect.appendChild(option);
        }
    });

    // 베팅유형 옵션 설정
    const betTypeSelect = document.getElementById('betType');
    const betTypes = [...new Set(bettingData.map(item => item.베팅유형))].filter(Boolean).sort();
    
    // 기존 옵션 유지하면서 새로운 옵션 추가
    const existingBetTypes = Array.from(betTypeSelect.options).map(option => option.value);
    betTypes.forEach(betType => {
        if (betType && !existingBetTypes.includes(betType)) {
            const option = document.createElement('option');
            option.value = betType;
            option.textContent = betType;
            betTypeSelect.appendChild(option);
        }
    });
};

function calculateProbabilities() {
    // 입력값을 소수점 2자리로 변환하여 가져오기
    const sport = document.getElementById('sport').value;
    const betType = document.getElementById('betType').value;
    const win = Number(document.getElementById('win').value).toFixed(2);
    const draw = Number(document.getElementById('draw').value).toFixed(2);
    const lose = Number(document.getElementById('lose').value).toFixed(2);

    // 1. 종목과 베팅유형으로 1차 필터링
    let filteredData = bettingData;
    
    if (sport) {
        filteredData = filteredData.filter(item => item.종목 === sport);
    }
    if (betType) {
        filteredData = filteredData.filter(item => item.베팅유형 === betType);
    }

    // 2. 입력된 배당률과 정확히 일치하는 데이터 필터링
    if (!isNaN(win) || !isNaN(draw) || !isNaN(lose)) {
        filteredData = filteredData.filter(item => {
            let matchCount = 0;
            let requiredMatches = 0;

            if (!isNaN(win)) {
                requiredMatches++;
                if (Number(item.승).toFixed(2) === win) matchCount++;
            }
            if (!isNaN(draw)) {
                requiredMatches++;
                if (Number(item.무).toFixed(2) === draw) matchCount++;
            }
            if (!isNaN(lose)) {
                requiredMatches++;
                if (Number(item.패).toFixed(2) === lose) matchCount++;
            }

            return matchCount === requiredMatches;
        });
    }

    // 3. 결과 계산
    const total = filteredData.length;
    const results = {
        '승': 0,
        '무': 0,
        '패': 0
    };
    
    // 4. 필터링된 데이터의 결과 집계
    filteredData.forEach(item => {
        results[item.결과]++;
    });

    // 5. 결과 표시
    const resultDiv = document.getElementById('result');
    if (total === 0) {
        resultDiv.innerHTML = "<p style='color: red;'>일치하는 데이터가 없습니다.</p>";
        return;
    }

    let resultHTML = "<h3>예측 결과:</h3>";
    
    // 각 결과의 비율 계산 및 표시
    Object.entries(results).forEach(([key, value]) => {
        const ratio = (value / total * 100).toFixed(1);
        if (value > 0) {
            resultHTML += `<p><strong>${key}</strong>: ${ratio}% (${value}건/${total}건 중)</p>`;
        }
    });

    // 입력값 정보 표시
    resultHTML += "<h4>입력한 조건:</h4>";
    resultHTML += "<div style='margin-left: 20px;'>";
    resultHTML += `<p>종목: ${sport || '전체'}</p>`;
    resultHTML += `<p>베팅유형: ${betType || '전체'}</p>`;
    resultHTML += "<p>배당률:</p>";
    if (!isNaN(win)) resultHTML += `<p>- 승: ${win}</p>`;
    if (!isNaN(draw)) resultHTML += `<p>- 무: ${draw}</p>`;
    if (!isNaN(lose)) resultHTML += `<p>- 패: ${lose}</p>`;
    resultHTML += "</div>";

    resultDiv.innerHTML = resultHTML;
}
