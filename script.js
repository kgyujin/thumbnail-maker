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
    const maxTags = tags.slice(0, 5); // 최대 5개의 태그 처리
    maxTags.forEach((tag, index) => {
        const tagText = '# ' + tag.trim();
        ctx.font = '20px Pretendard';
        const textWidth = ctx.measureText(tagText).width;
        const padding = 20;
        const tagHeight = 30;
        const rectWidth = textWidth + padding;
        const rectX = (canvas.width - rectWidth) / 2;
        const rectY = canvas.height - (tagHeight + 20) * (maxTags.length - index) - 30;

        ctx.fillStyle = 'lightgray';
        drawRoundedRect(rectX, rectY, rectWidth, tagHeight, 10, true, false); // 둥근 모서리의 사각형을 그립니다.
        
        // 태그 텍스트를 정중앙에 배치
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(tagText, canvas.width / 2, rectY + tagHeight / 2 + 6); // Y 위치 조정
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
