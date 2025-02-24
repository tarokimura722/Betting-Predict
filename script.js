// ... 이전 코드는 동일 ...

function filterData(sport, betType, win, draw, lose) {
    let filteredData = bettingData;
    
    // 종목과 베팅유형으로 필터링
    if (sport) {
        filteredData = filteredData.filter(item => item.종목 === sport);
    }
    if (betType) {
        filteredData = filteredData.filter(item => item.베팅유형 === betType);
    }

    // 배당률로 필터링
    if (!isNaN(win) || !isNaN(draw) || !isNaN(lose)) {
        filteredData = filteredData.filter(item => {
            let matchCount = 0;
            let requiredMatches = 0;

            if (!isNaN(win)) {
                requiredMatches++;
                if (parseFloat(item.승.toFixed(2)) === parseFloat(win.toFixed(2))) matchCount++;
            }
            if (!isNaN(draw)) {
                requiredMatches++;
                if (parseFloat(item.무.toFixed(2)) === parseFloat(draw.toFixed(2))) matchCount++;
            }
            if (!isNaN(lose)) {
                requiredMatches++;
                if (parseFloat(item.패.toFixed(2)) === parseFloat(lose.toFixed(2))) matchCount++;
            }

            return matchCount === requiredMatches;
        });
    }

    return filteredData;
}

function calculateResults(filteredData) {
    const total = filteredData.length;
    const results = {
        '승': 0,
        '무': 0,
        '패': 0
    };
    
    // 결과별 카운트
    filteredData.forEach(item => {
        results[item.결과]++;
    });

    return {
        results: results,
        total: total
    };
}

function displayResults(results, sport, betType, win, draw, lose) {
    const resultDiv = document.getElementById('result');
    
    if (results.total === 0) {
        showError('일치하는 데이터가 없습니다.');
        return;
    }

    let resultHTML = "<h3>예측 결과:</h3>";
    
    // 결과별 확률 계산 및 표시 (내림차순 정렬)
    const sortedResults = Object.entries(results.results)
        .sort(([, a], [, b]) => b - a)
        .filter(([, count]) => count > 0);

    sortedResults.forEach(([key, value]) => {
        const ratio = (value / results.total * 100).toFixed(1);
        resultHTML += `
            <div class="result-item">
                <strong>${key}</strong>: ${ratio}% 
                <span class="result-detail">(${value}건/${results.total}건)</span>
            </div>
        `;
    });

    // 입력 조건 표시
    resultHTML += `
        <h4>입력한 조건:</h4>
        <div class="input-conditions">
            <p>종목: ${sport || '전체'}</p>
            <p>베팅유형: ${betType || '전체'}</p>
            <p>배당률:</p>
            ${!isNaN(win) ? `<p>- 승: ${win.toFixed(2)}</p>` : ''}
            ${!isNaN(draw) ? `<p>- 무: ${draw.toFixed(2)}</p>` : ''}
            ${!isNaN(lose) ? `<p>- 패: ${lose.toFixed(2)}</p>` : ''}
        </div>
    `;

    // 결과 스타일 적용을 위한 CSS 추가
    resultHTML += `
        <style>
            .result-item {
                padding: 10px;
                margin: 8px 0;
                background-color: white;
                border-radius: 6px;
                border: 1px solid #e9ecef;
            }
            .result-item strong {
                color: #007bff;
            }
            .result-detail {
                color: #6c757d;
                font-size: 0.9em;
            }
            .input-conditions {
                margin-left: 20px;
                padding: 10px;
                background-color: #f8f9fa;
                border-radius: 6px;
            }
            .input-conditions p {
                margin: 5px 0;
                color: #495057;
            }
        </style>
    `;

    resultDiv.innerHTML = resultHTML;
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div style="
            color: #dc3545;
            padding: 15px;
            border: 1px solid #f5c6cb;
            border-radius: 6px;
            background-color: #f8d7da;
            margin-top: 20px;
        ">
            ${message}
        </div>
    `;
}
