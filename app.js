document.addEventListener('DOMContentLoaded', function() {
    // 데이터 로드 확인
    if (typeof bettingData === 'undefined' || !bettingData) {
        console.error('betting_data.js가 로드되지 않았습니다.');
        return;
    }

    // 종목과 베팅유형 옵션 초기화
    initializeOptions();
    
    // 모바일 입력 최적화
    setupMobileInputs();
    
    // 드롭다운 이벤트 리스너 추가
    setupDropdownListeners();
});

function setupMobileInputs() {
    // 숫자 입력 필드들에 대한 모바일 최적화
    const numberInputs = ['win', 'draw', 'lose'];
    numberInputs.forEach(id => {
        const input = document.getElementById(id);
        
        // 입력값 유효성 검사
        input.addEventListener('input', function() {
            let value = this.value;
            // 빈 값이면 처리하지 않음
            if (!value) return;
            
            // 숫자만 허용
            value = value.replace(/[^\d.]/g, '');
            
            // 소수점 두 자리까지만 허용
            if (value.includes('.')) {
                const parts = value.split('.');
                if (parts[1] && parts[1].length > 2) {
                    value = parseFloat(value).toFixed(2);
                }
            }
            
            // 최소값 1.0 보장
            if (parseFloat(value) < 1) {
                value = '1.00';
            }
            
            this.value = value;
        });
    });

    // 폼 제출 시 키보드 닫기
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        document.activeElement.blur();
        calculateProbabilities();
    });
}

function initializeOptions() {
    // 종목 옵션 설정
    const sportSelect = document.getElementById('sport');
    const sports = [...new Set(bettingData.map(item => item.종목))].filter(Boolean).sort();
    
    sports.forEach(sport => {
        const option = document.createElement('option');
        option.value = sport;
        option.textContent = sport;
        sportSelect.appendChild(option);
    });

    // 베팅유형 옵션 설정
    const betTypeSelect = document.getElementById('betType');
    const betTypes = [...new Set(bettingData.map(item => item.베팅유형))].filter(Boolean).sort();
    
    betTypes.forEach(betType => {
        const option = document.createElement('option');
        option.value = betType;
        option.textContent = betType;
        betTypeSelect.appendChild(option);
    });
}

function setupDropdownListeners() {
    const sportSelect = document.getElementById('sport');
    const betTypeSelect = document.getElementById('betType');

    // 종목 선택 시 베팅유형 필터링
    sportSelect.addEventListener('change', function() {
        const selectedSport = this.value;
        updateBetTypes(selectedSport);
    });

    // 베팅유형 선택 시 자동 계산
    betTypeSelect.addEventListener('change', function() {
        if (document.getElementById('win').value || 
            document.getElementById('draw').value || 
            document.getElementById('lose').value) {
            calculateProbabilities();
        }
    });
}

function updateBetTypes(selectedSport) {
    const betTypeSelect = document.getElementById('betType');
    
    // 기존 옵션 제거 (첫 번째 '전체' 옵션 제외)
    while (betTypeSelect.options.length > 1) {
        betTypeSelect.remove(1);
    }

    // 선택된 종목에 해당하는 베팅유형만 필터링
    let filteredBetTypes = bettingData
        .filter(item => !selectedSport || item.종목 === selectedSport)
        .map(item => item.베팅유형);
    
    // 중복 제거 및 정렬
    filteredBetTypes = [...new Set(filteredBetTypes)].sort();

    // 새로운 옵션 추가
    filteredBetTypes.forEach(betType => {
        const option = document.createElement('option');
        option.value = betType;
        option.textContent = betType;
        betTypeSelect.appendChild(option);
    });
}

function calculateProbabilities() {
    const sport = document.getElementById('sport').value;
    const betType = document.getElementById('betType').value;
    
    // 입력값을 숫자로 변환
    const win = parseFloat(document.getElementById('win').value);
    const draw = parseFloat(document.getElementById('draw').value);
    const lose = parseFloat(document.getElementById('lose').value);

    // 필터링
    let filteredData = bettingData;
    
    if (sport) {
        filteredData = filteredData.filter(item => item.종목 === sport);
    }
    if (betType) {
        filteredData = filteredData.filter(item => item.베팅유형 === betType);
    }

    // 배당률 필터링 (허용 오차 범위 적용)
    const tolerance = 0.01;
    if (!isNaN(win) || !isNaN(draw) || !isNaN(lose)) {
        filteredData = filteredData.filter(item => {
            let matchCount = 0;
            let requiredMatches = 0;

            if (!isNaN(win)) {
                requiredMatches++;
                if (Math.abs(item.승 - win) <= tolerance) matchCount++;
            }
            if (!isNaN(draw)) {
                requiredMatches++;
                if (Math.abs(item.무 - draw) <= tolerance) matchCount++;
            }
            if (!isNaN(lose)) {
                requiredMatches++;
                if (Math.abs(item.패 - lose) <= tolerance) matchCount++;
            }

            return matchCount === requiredMatches;
        });
    }

    // 결과 표시
    displayResults(filteredData);
}

function displayResults(filteredData) {
    const resultDiv = document.getElementById('result');
    
    if (filteredData.length === 0) {
        resultDiv.innerHTML = "<div class='result-item' style='color: red;'>일치하는 데이터가 없습니다.</div>";
        return;
    }

    // 결과 집계
    const total = filteredData.length;
    const results = {
        '승': 0,
        '무': 0,
        '패': 0
    };

    filteredData.forEach(item => {
        results[item.결과]++;
    });

    // 결과 HTML 생성
    let html = "<h3>예측 결과</h3>";
    
    Object.entries(results).forEach(([key, value]) => {
        const ratio = (value / total * 100).toFixed(1);
        if (value > 0) {
            html += `
                <div class='result-item'>
                    <strong>${key}</strong>: ${ratio}%
                    <br>
                    <small>(${value}건/${total}건)</small>
                </div>
            `;
        }
    });

    resultDiv.innerHTML = html;
} 