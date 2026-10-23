const Clock =() =>{
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