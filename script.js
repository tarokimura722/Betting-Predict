// 페이지 로드 시 드롭다운 메뉴 초기화
window.onload = function() {
    console.log('페이지 로드됨');  // 디버깅용

    // 데이터 로드 확인
    if (typeof bettingData === 'undefined') {
        console.error('betting_data.js가 로드되지 않았습니다.');
        return;
    }
    console.log('데이터 개수:', bettingData.length);  // 디버깅용

    // 종목 옵션 설정
    try {
        const sports = [...new Set(bettingData.map(item => item['종목']))].filter(Boolean).sort();
        console.log('추출된 종목:', sports);  // 디버깅용
        
        const sportSelect = document.getElementById('sport');
        sports.forEach(sport => {
            const option = document.createElement('option');
            option.value = sport;
            option.textContent = sport;
            sportSelect.appendChild(option);
        });
    } catch (error) {
        console.error('종목 옵션 설정 중 오류:', error);
    }

    // 베팅유형 옵션 설정
    try {
        const betTypes = [...new Set(bettingData.map(item => item['베팅유형']))].filter(Boolean).sort();
        console.log('추출된 베팅유형:', betTypes);  // 디버깅용
        
        const betTypeSelect = document.getElementById('betType');
        betTypes.forEach(betType => {
            const option = document.createElement('option');
            option.value = betType;
            option.textContent = betType;
            betTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('베팅유형 옵션 설정 중 오류:', error);
    }
};

function calculateProbabilities() {
    const sport = document.getElementById('sport').value;
    const betType = document.getElementById('betType').value;
    const win = parseFloat(document.getElementById('win').value);
    const draw = parseFloat(document.getElementById('draw').value);
    const lose = parseFloat(document.getElementById('lose').value);

    console.log('선택된 값:', { sport, betType, win, draw, lose });  // 디버깅용

    // 종목과 베팅유형으로만 필터링
    let filteredData = bettingData;
    
    if (sport) {
        filteredData = filteredData.filter(item => item['종목'] === sport);
    }
    if (betType) {
        filteredData = filteredData.filter(item => item['베팅유형'] === betType);
    }

    console.log('필터링된 데이터 개수:', filteredData.length);  // 디버깅용

    // 결과 계산
    const total = filteredData.length;
    const results = {};
    
    filteredData.forEach(item => {
        results[item['결과']] = (results[item['결과']] || 0) + 1;
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
