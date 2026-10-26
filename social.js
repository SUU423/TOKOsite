/*時刻表示*/
const Clock = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const dayOfWeek = days[now.getDay()];
    const dateString = `${month}月${date}日(${dayOfWeek})`;
    document.getElementById('datearea').textContent = dateString;

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('timearea').textContent = timeString;
};

setInterval(Clock, 1000);
Clock();


/*天気表示*/
window.addEventListener('DOMContentLoaded', async () => {
    const apiKey = WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Shizuoka,jp&units=metric&lang=ja&appid=${apiKey}`;
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const htmlcode = `<img src="${iconUrl}"class="weatherimg"><p class="temp">${temp}℃</p>`;
        console.log(htmlcode);
        document.getElementById('weatherarea').innerHTML = htmlcode;

    } catch (error) {
        console.error('天気情報の取得に失敗しました:', error);
    }
});