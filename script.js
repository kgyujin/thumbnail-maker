const titleInput = document.getElementById('titleInput');
const subtitleInput = document.getElementById('subtitleInput');
const categoryInput = document.getElementById('categoryInput');
const canvas = document.getElementById('thumbnailCanvas');
const ctx = canvas.getContext('2d');

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

        ctx.fillStyle = 'lightgray';
        drawRoundedRect(startX, startY - tagHeight, tagWidth, tagHeight, 5, true);

        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        // 수정된 부분: tag.text -> tagText 사용
        ctx.fillText(tagText, startX + tagWidth / 2, startY - (tagHeight / 2) + (tagHeight / 4));

        startX += tagWidth + tagSpacing; // 다음 태그를 위해 X 좌표 업데이트
    });
}

function drawThumbnail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
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

titleInput.addEventListener('input', drawThumbnail);
subtitleInput.addEventListener('input', drawThumbnail);
categoryInput.addEventListener('input', drawThumbnail);

drawThumbnail();
