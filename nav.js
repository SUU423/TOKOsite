/*ニュース表示*/
window.addEventListener('DOMContentLoaded', async () => {
    const apiKey = GNEWS_API_KEY;
    const targetUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=ja&country=jp&max=4&apikey=${apiKey}`;
    //const apiUrl = `https://gnews.io/api/v4/search?q=静岡 OR IT&lang=ja&country=jp&max=4&apikey=${apiKey}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const articles = data.articles;
        const newsList = document.getElementById('newsdiv');
        newsList.innerHTML = '';
        console.log(articles);
        if (data.errors) {
            newsList.innerHTML = `
                <div>
                    <p style="font-weight: bold; margin-bottom: 8px;">⚠️ 本日のニュース取得上限に達しました</p>
                    <p style="font-size: 0.85em;">※明日午前9時に更新が再開されます</p>
                </div>
            `;
            return;
        }

        articles.forEach(article => {
            const newsURL = article.url;
            const imgURL = article.image;
            const title = article.title;
            const htmlcode = `<a href="${newsURL}"  class="news-link"><img src="${imgURL}" class="news-img"><span class="news-text">${title}</span></a>`;
            newsList.innerHTML += htmlcode;
        });
    } catch (error) {
        console.error('GNewsが取得できてないよ:', error);
    }
});


/*コラム表示*/
window.addEventListener('DOMContentLoaded', () => {
    const columndiv = document.getElementById('columndiv');
    columndiv.innerHTML = '';
    for (let i = 1; i <= 2; i++) {
        const random = Math.floor(Math.random() * 50);
        const showcolumn = columnList[random];
        const htmlcode = `<div class="card">${showcolumn}</div>`;
        columndiv.innerHTML += htmlcode;
    }
});


/*電車表示*/
const Train = () => {
    const now = new Date();
    const Hour = String(now.getHours()).padStart(2, '0');
    const Minute = String(now.getMinutes()).padStart(2, '0');
    const nowTime = `${Hour}:${Minute}`;
    const JRShizuokatrain = JRShizuoka.find(time => time > nowTime);
    const JRShimizutrain = JRShimizu.find(time => time > nowTime);
    const STShizuokatrain = STShizuoka.find(time => time > nowTime);
    const STShimizutrain = STShimizu.find(time => time > nowTime);
    document.getElementById('train1').textContent = `next ${JRShizuokatrain}`;
    document.getElementById('train2').textContent = `next ${JRShimizutrain}`;
    document.getElementById('train3').textContent = `next ${STShizuokatrain}`;
    document.getElementById('train4').textContent = `next ${STShimizutrain}`;
};
Train();
// 1分ごと（60000ミリ秒）に再計算してカウントダウンを更新する
setInterval(Train, 60000);
