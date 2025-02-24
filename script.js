// ... 기존의 window.onload 함수는 그대로 유지 ...

function calculateProbabilities() {
    const sport = document.getElementById('sport').value;
    const betType = document.getElementById('betType').value;
    const win = parseFloat(document.getElementById('win').value);
    const draw = parseFloat(document.getElementById('draw').value);
    const lose = parseFloat(document.getElementById('lose').value);

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
                if (item.승 === win) matchCount++;
            }
            if (!isNaN(draw)) {
                requiredMatches++;
                if (item.무 === draw) matchCount++;
            }
            if (!isNaN(lose)) {
                requiredMatches++;
                if (item.패 === lose) matchCount++;
            }

            // 입력된 모든 배당률이 정확히 일치해야 함
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
    
    // 각 결과(승/무/패)의 비율 계산 및 표시
    Object.entries(results).forEach(([key, value]) => {
        const ratio = (value / total * 100).toFixed(1);
        resultHTML += `<p><strong>${key}</strong>: ${ratio}% (${value}건/${total}건 중)</p>`;
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

    resultDiv.innerHTML = resultHTML;
}
