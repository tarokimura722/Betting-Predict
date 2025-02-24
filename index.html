<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>베팅 예측 시스템</title>
    <style>
        /* 기존 스타일 유지 */
        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            font-size: 24px;
        }

        .input-group {
            margin: 15px 0;
        }

        label {
            display: inline-block;
            width: 100px;
            font-weight: 500;
            margin-bottom: 5px;
        }

        input, select {
            width: 200px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            background-color: white;
        }

        select {
            cursor: pointer;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 1em;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #007bff;
        }

        .odds-group {
            margin-top: 30px;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .odds-title {
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: #0056b3;
        }

        /* 결과 영역 스타일 개선 */
        #result {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            background-color: #f8f9fa;
        }

        #result h3 {
            color: #007bff;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 20px;
        }

        #result h4 {
            color: #495057;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .result-item {
            padding: 12px;
            margin: 8px 0;
            background-color: white;
            border-radius: 6px;
            border: 1px solid #e9ecef;
            transition: background-color 0.2s;
        }

        .result-item:hover {
            background-color: #f8f9fa;
        }

        .result-item strong {
            color: #007bff;
            font-size: 16px;
        }

        .result-detail {
            color: #6c757d;
            font-size: 14px;
            margin-left: 8px;
        }

        .input-conditions {
            margin: 15px 0;
            padding: 15px;
            background-color: white;
            border-radius: 6px;
            border: 1px solid #e9ecef;
        }

        .input-conditions p {
            margin: 8px 0;
            color: #495057;
            font-size: 14px;
        }

        /* 모바일 대응 */
        @media screen and (max-width: 600px) {
            body {
                padding: 10px;
            }

            .container {
                padding: 15px;
            }

            label {
                display: block;
                width: 100%;
            }

            input, select {
                width: 100%;
            }

            .odds-group {
                padding: 15px;
            }

            button {
                padding: 15px;
            }

            #result {
                padding: 15px;
            }

            .result-item {
                padding: 10px;
            }

            .input-conditions {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>베팅 예측 시스템</h1>
        
        <div class="input-group">
            <label for="sport">종목:</label>
            <select id="sport" name="sport">
                <option value="">전체</option>
            </select>
        </div>

        <div class="input-group">
            <label for="betType">베팅유형:</label>
            <select id="betType" name="betType">
                <option value="">전체</option>
            </select>
        </div>

        <div class="odds-group">
            <div class="odds-title">배당률 입력</div>
            <div class="input-group">
                <label for="win">승:</label>
                <input type="text" 
                       id="win" 
                       name="win" 
                       pattern="[0-9]*[.]?[0-9]*" 
                       inputmode="decimal"
                       placeholder="승 배당률">
            </div>
            <div class="input-group">
                <label for="draw">무:</label>
                <input type="text" 
                       id="draw" 
                       name="draw" 
                       pattern="[0-9]*[.]?[0-9]*" 
                       inputmode="decimal"
                       placeholder="무 배당률">
            </div>
            <div class="input-group">
                <label for="lose">패:</label>
                <input type="text" 
                       id="lose" 
                       name="lose" 
                       pattern="[0-9]*[.]?[0-9]*" 
                       inputmode="decimal"
                       placeholder="패 배당률">
            </div>
        </div>

        <button type="button" id="calculateBtn">예측하기</button>
        <div id="result"></div>
    </div>

    <script src="betting_data.js"></script>
    <script src="script.js"></script>
</body>
</html>
