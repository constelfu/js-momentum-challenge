const clock = document.querySelector("#clock");
const yearMonthDay = document.querySelector(".date__text");

function getClock() {
    const date = new Date();

    const years = String(date.getFullYear());
    const months = String(date.getMonth() + 1);
    const days = String(date.getDate());

    const hours   = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    yearMonthDay.innerText = `${years}년 ${months}월 ${days}일`;
    clock.innerText = `${hours}:${minutes}`;
}

getClock();
setInterval(getClock, 1000);    // 일정 시간마다 실행
//setTimeout(sayHello, 5000);   // 시간지연함수