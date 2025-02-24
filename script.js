document.addEventListener('DOMContentLoaded', function() {
    // 초기화 함수 호출
    initializeApp();
});

function initializeApp() {
    // 데이터 로드 확인
    if (typeof bettingData === 'undefined' || !bettingData) {
        console.error('betting_data.js가 로드되지 않았습니다.');
        return;
    }

    // 드롭다운 메뉴 초기화
    initializeDropdowns();

    // 이벤트 리스너 설정
    setupEventListeners();
}

function initializeDropdowns() {
    // 종목 옵션 설정
    const sportSelect = document.getElementById('sport');
    const sports = [...new Set(bettingData.map(item => item.종목))].filter(Boolean).sort();
    
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
    
    const existingBetTypes = Array.from(betTypeSelect.options).map(option => option.value);
    betTypes.forEach(betType => {
        if (betType && !existingBetTypes.includes(betType)) {
            const option = document.createElement('option');
            option.value = betType;
            option.textContent = betType;
            betTypeSelect.appendChild(option);
        }
    });
}

function setupEventListeners() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    // 클릭 이벤트
    calculateBtn.addEventListener('click', handleCalculation);
    
    // 터치 이벤트
    calculateBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleCalculation();
    });

    // 입력 필드 이벤트
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    });
}

function handleCalculation() {
    try {
        const sport = document.getElementById('sport').value;
        const betType = document.getElementById('betType').value;
        
        // 입력값을 숫자로 변환
        const win = document.getElementById('win').value ? parseFloat(document.getElementById('win').value) : NaN;
        const draw = document.getElementById('draw').value ? parseFloat(document.getElementById('draw').value) : NaN;
        const lose = document.getElementById('lose').value ? parseFloat(document.getElementById('lose').value) : NaN;

        // 데이터 필터링 및 결과 계산
        let filteredData = filterData(sport, betType, win, draw, lose);
        const results = calculateResults(filteredData);

        // 결과 표시
        displayResults(results, sport, betType, win, draw, lose);

    } catch (error) {
        console.error('계산 중 오류 발생:', error);
        showError('계산 중 오류가 발생했습니다. 입력값을 확인해주세요.');
    }
}

function filterData(sport, betType, win, draw, lose) {
    let filteredData = bettingData;
    
    if (sport) {
        filteredData = filteredData.filter(item => item.종목 === sport);
    }
    if (betType) {
        filteredData = filteredData.filter(item => item.베팅유형 === betType);
    }

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
    const results = {
        '승': 0,
        '무': 0,
        '패': 0
    };
    
    filteredData.forEach(item => {
        results[item.결과]++;
    });

    return {
        results: results,
        total: filteredData.length
    };
}

function displayResults(results, sport, betType, win, draw, lose) {
    const resultDiv = document.getElementById('result');
    
    if (results.total === 0) {
        showError('일치하는 데이터가 없습니다.');
        return;
    }

    let resultHTML = "<h3>예측 결과:</h3>";
    
    Object.entries(results.results).forEach(([key, value]) => {
        const ratio = (value / results.total * 100).toFixed(1);
        if (value > 0) {
            resultHTML += `<p><strong>${key}</strong>: ${ratio}% (${value}건/${results.total}건 중)</p>`;
        }
    });

    resultHTML += "<h4>입력한 조건:</h4>";
    resultHTML += "<div style='margin-left: 20px;'>";
    resultHTML += `<p>종목: ${sport || '전체'}</p>`;
    resultHTML += `<p>베팅유형: ${betType || '전체'}</p>`;
    resultHTML += "<p>배당률:</p>";
    if (!isNaN(win)) resultHTML += `<p>- 승: ${win.toFixed(2)}</p>`;
    if (!isNaN(draw)) resultHTML += `<p>- 무: ${draw.toFixed(2)}</p>`;
    if (!isNaN(lose)) resultHTML += `<p>- 패: ${lose.toFixed(2)}</p>`;
    resultHTML += "</div>";

    resultDiv.innerHTML = resultHTML;
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style='color: red;'>${message}</p>`;
}

    resultDiv.innerHTML = resultHTML;
}
