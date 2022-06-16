const currentTime= document.querySelector('h1'),
content = document.querySelector('.content'),
selectOption= document.querySelectorAll('select'),
alarmButton= document.querySelector('button');

let alarmTime, isAlarmSet= false,
ringtone = new Audio('./assets/alarmring.mp3');

for(let i=12; i>0; i--){
    i=i<10 ? '0' + i : i;
    let option= `<option value= '${i}'>${i}</option>`;
    selectOption[0].firstElementChild.insertAdjacentHTML('afterend', option);
}

for(let i=59; i>0; i--){
    i=i<10 ? '0' + i : i;
    let option= `<option value= '${i}'>${i}</option>`;
    selectOption[1].firstElementChild.insertAdjacentHTML('afterend', option);
}

for(let i=2; i>0; i--){
    let ampmday= i ==1 ? 'AM' : 'PM';
    let option= `<option value= '${ampmday}'>${ampmday}</option>`;
    selectOption[2].firstElementChild.insertAdjacentHTML('afterend', option);
}

setInterval(()=>{

    let date= new Date(),
    h= date.getHours(),
    m= date.getMinutes(),
    s= date.getSeconds(),
    ampmday= 'AM';

    if(h>=12){
        h=h-12;
        ampmday='PM';
    }
    //if hour is equal to 0, the value is set up to 12
    h= h==0 ? h=12 : h;

    //Add 0 before h,m,s if the value is less than 10. eg: 00, 01, 02 ...

    h=h<10? '0' + h: h;
    m=m<10? '0' + m : m;
    s = s< 10 ?'0' + s : s;

    currentTime.innerText= `${h}:${m}:${s} ${ampmday}`;

    if(alarmTime==`${h}:${m}:${s} ${ampmday}`){
        ringtone.play();
        ringtone.loop= true;
    }
}, 1000);

function setalarmButton(){
    if(isAlarmSet){
        alarmTime="";
        ringtone.pause();
        content.classList.remove('disable');
        alarmButton.innerText= 'Set Alarm';
        return isAlarmSet=false;
    }

    let time= `${selectOption[0].value}:${selectOption[1].value} ${selectOption[2].value}`;

    if(time.includes('Hour') || time.includes('Minutes') || time.includes('AM/PM')){
        return alert('Please, select a valid time to set Alarm!');
    }
    isAlarmSet= true;
    alarmTime=time;
    content.classList.add('disable');
    alarmButton.innerText= 'Clear Alarm';

}

alarmButton.addEventListener('click', setalarmButton);