// 터치 이벤트 지원
document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.querySelector('button');
    
    // 클릭과 터치 이벤트 모두 지원
    calculateButton.addEventListener('click', calculateProbabilities);
    calculateButton.addEventListener('touchend', function(e) {
        e.preventDefault(); // 더블 터치 방지
        calculateProbabilities();
    });
    
    // 입력 필드 포커스 시 자동 확대 방지
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // 모바일 Safari에서 자동 확대 방지
            document.body.style.webkitTransform = 'scale(1)';
        });
        
        input.addEventListener('blur', function() {
            document.body.style.webkitTransform = '';
        });
    });
});

function calculateProbabilities() {
    try {
        const sport = document.getElementById('sport').value;
        const betType = document.getElementById('betType').value;
        
        // 입력값을 숫자로 변환 (빈 값 처리 추가)
        const win = document.getElementById('win').value ? parseFloat(document.getElementById('win').value) : NaN;
        const draw = document.getElementById('draw').value ? parseFloat(document.getElementById('draw').value) : NaN;
        const lose = document.getElementById('lose').value ? parseFloat(document.getElementById('lose').value) : NaN;

        // 나머지 로직은 동일하게 유지...

    } catch (error) {
        console.error('계산 중 오류 발생:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = "<p style='color: red;'>계산 중 오류가 발생했습니다. 입력값을 확인해주세요.</p>";
    }
}
