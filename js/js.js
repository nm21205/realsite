// 다음 주소 검색 API를 사용하여 주소 검색
function openDaumPostcode(type) {
    new daum.Postcode({
      oncomplete: function(data) {
        var fullAddr = data.address; // 최종 주소 변수
        if (type === 'start') {
          document.getElementById('txtStartAddress1').value = fullAddr;
        } else if (type === 'end') {
          document.getElementById('txtEndAddress1').value = fullAddr;
        }
      }
    }).open();
  }
  
  // 거리 측정 기능
  function calculateDistance() {
    var startAddress = document.getElementById('txtStartAddress1').value;
    var endAddress = document.getElementById('txtEndAddress1').value;
  
    if (!startAddress || !endAddress) {
      alert('출발지와 도착지 주소를 모두 입력하세요.');
      return;
    }
  
    // 거리 계산 로직 (예시)
    // 실제 거리 계산은 좌표를 기반으로 해야 하며, 이를 위해 추가적인 API 호출이 필요합니다.
    var distance = Math.random() * 100; // 임의의 거리 값 (예시)
    document.getElementById('totalDistance').innerText = distance.toFixed(2);
  }

  function openDaumMap() {
    // 데스크톱 사용자 에이전트로 새 창을 엽니다.
    const mapWindow = window.open('', '_blank');
    mapWindow.navigator.__defineGetter__('userAgent', function(){
        return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    });

    // 다음 지도 URL을 로드합니다.
    mapWindow.location.href = 'https://map.kakao.com/';
  }

  function calculatePrice() {
    var distance = parseFloat(document.getElementById('manualDistance').value);

    if (isNaN(distance) || distance <= 0) {
      alert('유효한 거리를 입력하세요.');
      return;
    }

    // 거리당 가격 계산 (예: 1km당 1000원)
    var pricePerKm = 555;
    var estimatedPrice = distance * pricePerKm;

    // 소수점 올림 처리
    estimatedPrice = Math.ceil(estimatedPrice);

    document.getElementById('estimatedPrice').innerText = estimatedPrice.toLocaleString();
  }

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeBorderColor() {
  const items = document.querySelectorAll('.exp-main li');
  const randomColor = getRandomColor();
  items.forEach(item => {
    item.style.borderColor = randomColor;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // 카카오톡 인앱 브라우저 감지
  if (navigator.userAgent.includes('KAKAOTALK')) {
    alert('이 페이지는 크롬에서 최적화되어 있습니다. 크롬으로 열어주세요.');
  }

  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var targetId = this.getAttribute('data-target');
      var action = this.getAttribute('data-action');

      if (targetId) {
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (action === 'refresh') {
        location.reload(); // 페이지 새로고침
      } else if (action === 'call') {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          // 모바일인 경우
          window.location.href = 'tel:1800-3988';
        } else {
          // PC인 경우
          alert('전화번호: 1800-3988');
        }
      }
    });
  });

  // phone-number 클릭 이벤트 추가
  document.getElementById('phoneNumber').addEventListener('click', function() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // 모바일인 경우
      window.location.href = 'tel:1800-3988';
    } else {
      // PC인 경우
      alert('전화번호: 1800-3988');
    }
  });

  // 경계선 색상 변경을 1초마다 실행
  setInterval(changeBorderColor, 1000);
});