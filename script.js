document.getElementById('generateBtn').addEventListener('click', function() {
  const canvas = document.getElementById('thumbnailCanvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('titleInput').value;
  const subtitle = document.getElementById('subtitleInput').value;
  const category = document.getElementById('tagInput').value;

  // 캔버스 초기화
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 제목 텍스트 중앙 정렬
  ctx.font = '40px Pretendard';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000';
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 20);

  // 부제목 텍스트 중앙 정렬
  ctx.font = '30px Pretendard';
  ctx.fillStyle = '#666';
  ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 20);

  // 태그 텍스트 중앙 정렬
  ctx.font = '20px Pretendard';
  ctx.fillStyle = '#333';
  ctx.fillText(category, canvas.width / 2, canvas.height / 2 + 60);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
  const canvas = document.getElementById('thumbnailCanvas');
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const link = document.createElement('a');
  link.download = 'thumbnail.png';
  link.href = image;
  link.click();
});