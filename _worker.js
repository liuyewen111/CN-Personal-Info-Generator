const provinceCodes = [
  { code: '11', name: '北京市', cities: ['东城区', '西城区', '朝阳区', '海淀区'] },
  { code: '12', name: '天津市', cities: ['和平区', '河东区', '河西区', '南开区'] },
  { code: '13', name: '河北省', cities: ['石家庄市', '唐山市', '秦皇岛市', '邯郸市'] },
  // ...（完整数据需补充所有省级行政区划代码）
  { code: '50', name: '重庆市', cities: ['渝中区', '大渡口区', '江北区', '沙坪坝区'] }
];

const mobilePrefixes = {
  '移动': ['139', '138', '137', '151', '152', '157', '158', '182', '183', '184', '187', '188', '198'],
  '联通': ['130', '131', '132', '155', '156', '185', '186'],
  '电信': ['133', '153', '177', '180', '181', '189']
};

export default {
  async fetch(request, env) {
      const url = new URL(request.url);
      const path = url.pathname;
      const params = url.search;
      const 网站图标 = env.ICO || 'https://blog.haib.top/img/favicon.ico'; 
      const 网站头像 = env.PNG || 'https://blog.haib.top/img/logo.jpg'; 
      const 网络备案 = env.BEIAN || '';
      const 网页标题 = env.TITLE || '个人信息生成器';
      const 站点名称 = env.NAME || '身份信息生成';

      if (url.pathname.toLowerCase() === '/ads.txt') {
          return new Response(env.ADS || 'google.com...', { headers: { 'content-type': 'text/plain' } });
      } else if (url.pathname.toLowerCase() === '/favicon.ico') {
          return fetch(网站图标);
      } else {
          const personalInfo = await generatePersonalInfo();
          let img = 'https://bing.ee123.net/img/4k'; 
          if (env.IMG) {
              const imgs = await ADD(env.IMG);
              img = imgs[Math.floor(Math.random() * imgs.length)];
          }

          const html = `
          <!DOCTYPE html>
          <html lang="zh-CN">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${站点名称} - ${网页标题}</title>
              <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; margin: 0; padding: 0; background-image: url('${img}'); background-size: cover; background-position: center; background-attachment: fixed; min-height: 100vh; display: flex; justify-content: center; align-items: center; }
                  .container { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px); border-radius: 24px; padding: 30px; width: 480px; min-height: 620px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.3s ease; }
                  .container:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15); }
                  .logo-container { position: relative; width: 180px; height: 180px; margin-bottom: 20px; }
                  .logo { width: 100%; height: 100%; border-radius: 50%; border: 8px solid white; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); animation: pulse 2s infinite; object-fit: cover; }
                  @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(107, 223, 143, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(107, 223, 143, 0); } 100% { box-shadow: 0 0 0 0 rgba(107, 223, 143, 0); } }
                  h1 { color: #1a1f36; font-size: 28px; font-weight: 700; text-align: center; margin: 0 0 30px 0; padding-bottom: 15px; position: relative; }
                  h1::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100px; height: 4px; background: linear-gradient(90deg, #6bdf8f, #ffffff, #a7f3d0, #34d399, #10b981, #6bdf8f); background-size: 200% 100%; animation: flowingLight 2s linear infinite; border-radius: 2px; }
                  @keyframes flowingLight { 0% { background-position: 200% 50%; } 100% { background-position: 0% 50%; } }
                  .description { width: 100%; padding: 0 15px; margin-bottom: 15px; font-weight: 600; }
                  ul { list-style: none; width: 100%; }
                  ul li { color: #1a1f36; font-size: 16px; line-height: 1.6; padding: 12px 15px; margin-bottom: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 12px; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease; cursor: pointer; }
                  ul li:hover { background: rgba(255, 255, 255, 0.8); transform: translateX(5px); }
                  .beian-info a { color: var(--primary-color); text-decoration: none; border-bottom: 1px dashed var(--primary-color); padding-bottom: 2px; }
                  .github-corner { position: fixed; top: 0; right: 0; z-index: 1000; }
                  .github-corner svg { position: absolute; top: 0; right: 0; border: 0; fill: #6bdf8f; width: 80px; height: 80px; transition: fill 0.3s ease; }
                  .github-corner:hover svg { fill: #5bc77d; }
                  .toast {
                      position: fixed;
                      right: 20px;
                      bottom: 20px;
                      padding: 10px 20px;
                      background: rgba(107, 223, 143, 0.8);
                      color: white;
                      border-radius: 16px;
                      opacity: 0;
                      animation: toast 0.5s ease-out;
                  }
                  @keyframes toast { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
              </style>
          </head>
          <body>
              <a href="https://github.com/cmliu/Blog-CDN-Gateway"  target="_blank" class="github-corner" aria-label="View source on Github">
                  <svg viewBox="0 0 250 250" aria-hidden="true">
                      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                      <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                      <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
                  </svg>
              </a>
              <div class="container">
                  <div class="logo-container">
                      <img class="logo" src="${网站头像}" alt="Logo">
                  </div>
                  <h1>${网页标题}</h1>
                  <ul class="description" id="infoList"></ul>
                  <div class="beian-info">${网络备案}</div>
              </div>
              <div class="toast" id="toast"></div>
              <script>
                  const info = ${JSON.stringify(personalInfo)};
                  const ul = document.getElementById("infoList");

                  Object.entries(info).forEach(([key, value]) => {
                      const li = document.createElement("li");
                      li.innerHTML = \`\${key}: <span class="value">\${value}</span>\`;
                      li.addEventListener('click', () => copyText(value));
                      ul.appendChild(li);
                  });

                  function copyText(text) {
                      navigator.clipboard.writeText(text).then(() => {
                          const toast = document.getElementById('toast');
                          toast.textContent = '复制成功';
                          toast.style.opacity = 1;
                          setTimeout(() => {
                              toast.style.opacity = 0;
                              toast.textContent = '';
                          }, 1500);
                      }).catch(() => alert('复制失败'));
                  }
              </script>
          </body>
          </html>
          `;

          return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' } });
      }
  }
};

async function generatePersonalInfo() {
  const province = provinceCodes[Math.floor(Math.random() * provinceCodes.length)];
  const city = province.cities[Math.floor(Math.random() * province.cities.length)];
  const birthDate = generateBirthDate();
  const gender = Math.random() > 0.5 ? '男' : '女';

  const idNumber = generateIDNumber(province.code, city, birthDate, gender);
  const mobile = generateMobileNumber(province.code, gender);
  const operator = getOperator(mobile.slice(0, 3));

  return {
      姓名: generateName(gender),
      身份证号: idNumber,
      手机号: mobile,
      地址: `${province.name} ${city}`,
      出生日期: birthDate,
      性别: gender,
      运营商: operator
  };
}

function generateName(gender) {
  const maleNames = ['伟', '强', '杰', '浩', '龙'];
  const femaleNames = ['芳', '丽', '敏', '婷', '雪'];
  const surnames = ['王', '李', '张', '刘', '陈', '杨', '黄', '周', '吴', '徐'];

  const givenNames = gender === '男' ? maleNames : femaleNames;
  return `${surnames[Math.floor(Math.random() * surnames.length)]}${givenNames[Math.floor(Math.random() * givenNames.length)]}`;
}

function generateBirthDate() {
  const year = 1990 + Math.floor(Math.random() * 30);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateIDNumber(provinceCode, city, birthDate, gender) {
  const datePart = birthDate.replace(/-/g, '');
  let sequence = Math.floor(Math.random() * 900 + 100);
  // 根据性别设置顺序码奇偶性（第17位）
  if (gender === '女' && sequence % 2 === 1) sequence--;
  if (gender === '男' && sequence % 2 === 0) sequence++;

  const base = provinceCode + cityCode(city) + datePart + String(sequence).padStart(3, '0');
  const checkCode = calculateCheckCode(base);
  return base + checkCode;
}

function cityCode(city) {
  const cityMap = {
      '东城区': '01', '西城区': '02', '朝阳区': '06', '海淀区': '09',
      '和平区': '01', '河东区': '02', '河西区': '03', '南开区': '04',
      '石家庄市': '01', '唐山市': '02', '秦皇岛市': '03', '邯郸市': '04',
      '渝中区': '01', '大渡口区': '02', '江北区': '03', '沙坪坝区': '04'
  };
  return cityMap[city] || '01';
}

function calculateCheckCode(id) {
  const weights = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
  const sum = [...id].slice(0,17).reduce((sum, char, i) => sum + (parseInt(char)*weights[i]), 0);
  const remainder = sum % 11;
  return '10X98765432'[remainder];
}

function generateMobileNumber(provinceCode, gender) {
  const operator = Object.keys(mobilePrefixes)[Math.floor(Math.random() * 3)];
  const prefix = mobilePrefixes[operator][Math.floor(Math.random() * mobilePrefixes[operator].length)];
  const suffix = String(Math.floor(10000000 + Math.random() * 89999999)).padStart(8, '0');
  return prefix + suffix;
}

function getOperator(prefix) {
  for (const [operator, prefixes] of Object.entries(mobilePrefixes)) {
      if (prefixes.includes(prefix)) return operator;
  }
  return '未知运营商';
}

async function ADD(envadd) {
  var addtext = envadd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');
  if (addtext[0] == ',') addtext = addtext.slice(1);
  if (addtext[addtext.length - 1] == ',') addtext = addtext.slice(0, -1);
  return addtext.split(',');
}
