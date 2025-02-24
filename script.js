// 페이지 로드 시 드롭다운 메뉴 초기화
window.onload = function() {
    // 데이터가 제대로 로드되었는지 확인
    if (typeof bettingData === 'undefined') {
        console.error('betting_data.js가 로드되지 않았습니다.');
        return;
    }

    // 종목 옵션 설정
    const sports = [...new Set(bettingData.map(item => item.종목))].sort();
    const sportSelect = document.getElementById('sport');
    sports.forEach(sport => {
        if (sport) {  // null이나 undefined가 아닌 경우만 추가
            const option = document.createElement('option');
            option.value = sport;
            option.textContent = sport;
            sportSelect.appendChild(option);
        }
    });

    // 베팅유형 옵션 설정
    const betTypes = [...new Set(bettingData.map(item => item.베팅유형))].sort();
    const betTypeSelect = document.getElementById('betType');
    betTypes.forEach(betType => {
        if (betType) {  // null이나 undefined가 아닌 경우만 추가
            const option = document.createElement('option');
            option.value = betType;
            option.textContent = betType;
            betTypeSelect.appendChild(option);
        }
    });
};

function calculateProbabilities() {
    const sport = document.getElementById('sport').value;
    const betType = document.getElementById('betType').value;
    const win = parseFloat(document.getElementById('win').value);
    const draw = parseFloat(document.getElementById('draw').value);
    const lose = parseFloat(document.getElementById('lose').value);

    // 종목과 베팅유형으로만 필터링
    let filteredData = bettingData;
    
    if (sport) {
        filteredData = filteredData.filter(item => item.종목 === sport);
    }
    if (betType) {
        filteredData = filteredData.filter(item => item.베팅유형 === betType);
    }

    // 결과 계산
    const total = filteredData.length;
    const results = {};
    
    filteredData.forEach(item => {
        results[item.결과] = (results[item.결과] || 0) + 1;
    });

    // 결과 표시
    const resultDiv = document.getElementById('result');
    if (total === 0) {
        resultDiv.innerHTML = "<p style='color: red;'>매칭되는 데이터가 없습니다.</p>";
        return;
    }

    let resultHTML = "<h3>예측 결과:</h3>";
    
    // 결과별 확률 계산 및 표시
    for (const [key, value] of Object.entries(results)) {
        const probability = (value / total * 100).toFixed(1);
        resultHTML += `<p><strong>${key}</strong>: ${probability}% (${value}/${total})</p>`;
    }

    // 입력한 배당률 정보 표시
    if (!isNaN(win) || !isNaN(draw) || !isNaN(lose)) {
        resultHTML += "<h4>입력한 배당률:</h4>";
        if (!isNaN(win)) resultHTML += `<p>승: ${win}</p>`;
        if (!isNaN(draw)) resultHTML += `<p>무: ${draw}</p>`;
        if (!isNaN(lose)) resultHTML += `<p>패: ${lose}</p>`;
    }

    resultDiv.innerHTML = resultHTML;
}
    }

    resultDiv.innerHTML = resultHTML;
}
