const fs = require('fs/promises');
const path = require('path');
const { createCanvas, registerFont } = require('canvas');

async function generateTitleImage(title, outputPath) {
    // Create output directory if it doesn't exist
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // 创建画布
    const canvas = createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');

    // 设置黑色背景
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1920, 1080);

    // 添加背景纹理
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';  // 半透明白色
    for (let i = 0; i < 5000; i++) {  // 绘制5000个小点
        const x = Math.random() * 1920;
        const y = Math.random() * 1080;
        const size = Math.random() * 2;  // 随机大小，最大2像素
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // 设置主标题样式
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.font = 'bold 120px "Microsoft YaHei"';  // 增大主标题字号
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 0;  // 移除发光效果

    // 文字换行处理
    const maxWidth = 1720;
    const words = title.split('');
    let lines = [];
    let currentLine = '';

    for (let word of words) {
        const testLine = currentLine + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);

    // 绘制主标题
    const lineHeight = 120;  // 增加行高
    const totalHeight = lineHeight * lines.length;
    const startY = (1080 - totalHeight) / 2 - 50;  // 向上偏移，为副标题留出空间

    lines.forEach((line, index) => {
        const x = 1920/2;
        const y = startY + lineHeight * index + lineHeight/2;
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
    });

    // 添加副标题
    const subtitle = "opacity.ink";  // 可以通过参数传入
    ctx.font = '40px "Microsoft YaHei"';  // 副标题使用较小字号
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';  // 更淡的描边
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  // 略微透明的白色

    const subtitleY = startY + totalHeight + 80;  // 在主标题下方添加间距
    ctx.strokeText(subtitle, 1920/2, subtitleY);

    // 保存图片
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);
}

async function processMarkdownFiles() {
    try {
        const files = await fs.readdir('articles');
        
        for (const file of files) {
            if (path.extname(file) === '.md') {
                const filePath = path.join('articles', file);
                let content = await fs.readFile(filePath, 'utf8');
                
                // 检查是否包含 interface
                if (!content.includes('interface')) {
                    // 从文件内容中提取标题
                    const titleMatch = content.match(/title:\s*(.+)/);
                    if (titleMatch) {
                        const title = titleMatch[1].replace(/['"]/g, '').trim();
                        
                        // 生成图片
                        const imageName = path.basename(file, '.md') + '.png';
                        const imageOutputPath = path.join('public', 'images', 'articles', imageName);
                        
                        await generateTitleImage(title, imageOutputPath);
                        // console.log(`Generated image for: ${file}`);
                        
                        // 添加 interface 到 markdown 内容
                        const interfacePath = `/images/articles/${imageName}`;
                        content = content.replace(/---\n([\s\S]*?)\n---/, (match, p1) => {
                            return `---\n${p1}\ninterface: ${interfacePath}\n---`;
                        });
                        
                        // 复制并更新 md 文件到目标位置
                        const targetPath = path.join('articles', 'cn', file);
                        await fs.mkdir(path.dirname(targetPath), { recursive: true });
                        await fs.writeFile(targetPath, content);

                        const targetPathEn = path.join('articles', 'en', file);
                        await fs.mkdir(path.dirname(targetPathEn), { recursive: true });
                        await fs.writeFile(targetPathEn, content);

                        const targetPathRoot = path.join('articles', file);
                        await fs.mkdir(path.dirname(targetPathRoot), { recursive: true });
                        await fs.writeFile(targetPathRoot, content);

                        // console.log(`Updated and copied ${file} to target directories`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

// 运行脚本
processMarkdownFiles();