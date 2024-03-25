const titleInput = document.getElementById('titleInput');
const subtitleInput = document.getElementById('subtitleInput');
const categoryInput = document.getElementById('categoryInput');
const canvas = document.getElementById('thumbnailCanvas');
const ctx = canvas.getContext('2d');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
let customBackgroundColor = '#fff'; // 기본 배경색을 흰색으로 설정


function drawRoundedRect(x, y, width, height, radius, fill, stroke = true) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

function drawTags(tags) {
    const maxTags = tags.slice(0, 4); // 태그 최대 4개까지
    const padding = 10; // 태그 텍스트 좌우 패딩
    let totalWidth = 0; // 모든 태그의 총 너비 계산에 사용될 변수
    const tagHeight = 25; // 태그 높이
    const tagSpacing = 5; // 태그 간의 가로 간격

    ctx.font = '18px Pretendard'; // 태그 폰트 사이즈 부제목보다 작게
    maxTags.forEach(tag => {
        const tagText = '# ' + tag.trim();
        const tagWidth = ctx.measureText(tagText).width + padding * 2;
        totalWidth += tagWidth + tagSpacing; // 태그 간 간격 추가
    });

    let startX = (canvas.width - totalWidth + tagSpacing) / 2; // 첫 태그의 시작 X 좌표, 가운데 정렬
    const startY = canvas.height - 70; // 시작 Y 좌표, 하단 여백 고려

    maxTags.forEach(tag => {
        const tagText = '# ' + tag.trim();
        const tagWidth = ctx.measureText(tagText).width + padding * 2;

        // 둥근 모서리 사각형 배경, 외곽선 제거
        ctx.fillStyle = '#000000'; // 태그 배경 색상
        drawRoundedRect(startX, startY - tagHeight, tagWidth, tagHeight, 5, true, false);

        // 태그 텍스트, 폰트 색상 변경
        ctx.fillStyle = '#FFFFFF'; // 태그 폰트 색상
        ctx.textAlign = 'center';
        ctx.fillText(tagText, startX + tagWidth / 2, startY - (tagHeight / 2) + (tagHeight / 4));

        startX += tagWidth + tagSpacing; // 다음 태그를 위해 X 좌표 업데이트
    });
}

function drawThumbnail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = customBackgroundColor; // 사용자가 선택한 배경색 사용
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const title = titleInput.value.trim();
    const subtitle = subtitleInput.value.trim();
    const categories = categoryInput.value.split(',').filter(Boolean); // 빈 문자열 제거

    // 제목
    if (title) {
        ctx.fillStyle = '#000';
        ctx.font = 'bold 40px Pretendard';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 60);
    }

    // 부제목
    if (subtitle) {
        ctx.fillStyle = '#666';
        ctx.font = '30px Pretendard';
        ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2);
    }

    // 태그
    if (categories.length) {
        drawTags(categories);
    }
}

// 배경색 변경 이벤트 리스너
backgroundColorPicker.addEventListener('change', function() {
    customBackgroundColor = backgroundColorPicker.value; // 사용자가 선택한 배경색 저장
    drawThumbnail(); // 배경색 변경 후 썸네일 다시 그리기
});


titleInput.addEventListener('input', drawThumbnail);
subtitleInput.addEventListener('input', drawThumbnail);
categoryInput.addEventListener('input', drawThumbnail);

drawThumbnail();
