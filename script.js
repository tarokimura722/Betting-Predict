// 페이지 로드 시 드롭다운 메뉴 초기화
window.onload = function() {
    // 종목 옵션 설정
    const sports = [...new Set(bettingData.map(item => item.종목))].sort();
    const sportSelect = document.getElementById('sport');
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport;
        option.textContent = sport;
        sportSelect.appendChild(option);
    });

    // 베팅유형 옵션 설정
    const betTypes = [...new Set(bettingData.map(item => item.베팅유형))].sort();
    const betTypeSelect = document.getElementById('betType');
    betTypes.forEach(betType => {
        const option = document.createElement('option');
        option.value = betType;
        option.textContent = betType;
        betTypeSelect.appendChild(option);
    });
};

function calculateProbabilities() {
    const sport = document.getElementById('sport').value;
    const betType = document.getElementById('betType').value;
    const win = document.getElementById('win').value;
    const draw = document.getElementById('draw').value;
    const lose = document.getElementById('lose').value;

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
    for (const [key, value] of Object.entries(results)) {
        const probability = (value / total * 100).toFixed(1);
        resultHTML += `<p><strong>${key}</strong>: ${probability}%</p>`;
    }
    resultHTML += `<p>총 ${total}개의 매칭 데이터</p>`;
    
    // 입력한 배당률 정보도 표시
    if (win || draw || lose) {
        resultHTML += `<p>입력한 배당률 - 승: ${win}, 무: ${draw}, 패: ${lose}</p>`;
    }

    resultDiv.innerHTML = resultHTML;
}