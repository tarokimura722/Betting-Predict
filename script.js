document.addEventListener('DOMContentLoaded', function() {
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
    try {
        // 종목 옵션 설정
        const sportSelect = document.getElementById('sport');
        // 기존 옵션 제거 (전체 옵션 유지)
        while (sportSelect.options.length > 1) {
            sportSelect.remove(1);
        }
        
        // 데이터에서 고유한 종목 추출
        const sports = [...new Set(bettingData.map(item => item.종목))]
            .filter(Boolean)
            .sort();
        
        // 종목 옵션 추가
        sports.forEach(sport => {
            const option = document.createElement('option');
            option.value = sport;
            option.textContent = sport;
            sportSelect.appendChild(option);
        });

        // 베팅유형 옵션 설정
        const betTypeSelect = document.getElementById('betType');
        // 기존 옵션 제거 (전체 옵션 유지)
        while (betTypeSelect.options.length > 1) {
            betTypeSelect.remove(1);
        }
        
        // 데이터에서 고유한 베팅유형 추출
        const betTypes = [...new Set(bettingData.map(item => item.베팅유형))]
            .filter(Boolean)
            .sort();
        
        // 베팅유형 옵션 추가
        betTypes.forEach(betType => {
            const option = document.createElement('option');
            option.value = betType;
            option.textContent = betType;
            betTypeSelect.appendChild(option);
        });

        console.log('드롭다운 초기화 완료:', { sports, betTypes });
    } catch (error) {
        console.error('드롭다운 초기화 중 오류:', error);
    }
}

function setupEventListeners() {
    const calculateBtn = document.getElementById('calculateBtn');
    const inputs = document.querySelectorAll('input[pattern]');
    
    // 숫자 입력 필드 이벤트 처리
    inputs.forEach(input => {
        // 입력값 검증
        input.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // 숫자와 소수점만 허용
            value = value.replace(/[^\d.]/g, '');
            
            // 소수점 처리 (최대 1개만 허용)
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            // 소수점 이하 2자리까지만 허용
            if (parts.length > 1 && parts[1].length > 2) {
                value = parts[0] + '.' + parts[1].substring(0, 2);
            }
            
            e.target.value = value;
        });

        // 포커스 아웃 시 소수점 형식 정리
        input.addEventListener('blur', function(e) {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
                e.target.value = value.toFixed(2);
            }
        });
    });

    // 계산 버튼 이벤트
    calculateBtn.addEventListener('click', handleCalculation);
    calculateBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleCalculation();
    });
}

// handleCalculation 함수 수정
function handleCalculation() {
    try {
        const sport = document.getElementById('sport').value;
        const betType = document.getElementById('betType').value;
        
        // 입력값을 숫자로 변환
        const win = parseFloat(document.getElementById('win').value) || NaN;
        const draw = parseFloat(document.getElementById('draw').value) || NaN;
        const lose = parseFloat(document.getElementById('lose').value) || NaN;

        console.log('입력값:', { sport, betType, win, draw, lose });

        // 데이터 필터링 및 결과 계산
        let filteredData = filterData(sport, betType, win, draw, lose);
        console.log('필터링된 데이터:', filteredData.length);

        const results = calculateResults(filteredData);
        displayResults(results, sport, betType, win, draw, lose);

    } catch (error) {
        console.error('계산 중 오류 발생:', error);
        showError('계산 중 오류가 발생했습니다. 입력값을 확인해주세요.');
    }
}

// 나머지 함수들은 이전과 동일...
