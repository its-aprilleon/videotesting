// Get UI

const getvideoscreen = document.getElementById('videoscreen');
const playbtn = document.getElementById('play'),
    prevbtn = document.getElementById('prev'),
    nextbtn = document.getElementById('next'),
    stopbtn = document.getElementById('stop');
const getprogress = document.getElementById('progress'),
    getprogressbar = document.getElementById('progress-bar');
const getdisplaytime = document.getElementById('displaytime');
const gettitle = document.getElementById('title');

const getcontainer = document.querySelector('.container');
const getopenfullscreen = document.getElementById('openfullscreen');
const getclosefullscreen = document.getElementById('closefullscreen');

// add value in src in video tag
const videos = ['samplevideo1', 'samplevideo2'];
// length 3
// index 0 1 2

let curridx = 0;
// console.log(videos[curridx]); //sample1

// loadvideo(videos[curridx]);

function loadvideo(video) {
    getvideoscreen.src = `./source/${video}.mp4`;
    gettitle.textContent = video;
}

function playvideo() {
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    getvideoscreen.play(); // default html function
}

function pausevideo() {
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    getvideoscreen.pause(); // default html function
}

function playandpausevideo() {
    // paused html default keywords for video/video
    if (getvideoscreen.paused) {
        playvideo();
    } else {
        pausevideo();
    }
}

function nextvideo() {
    curridx++;

    // 0 1 2    3-1=2
    if (curridx > videos.length - 1) {
        curridx = 0;
    }

    // console.log(curridx);

    loadvideo(videos[curridx]);
    playvideo();
}

function previousvideo() {
    curridx--;

    // 0 1 2    3-1=2
    if (curridx < 0) {
        curridx = videos.length - 1;
    }

    // console.log(curridx);

    loadvideo(videos[curridx]);
    playvideo();
}

function updateprogress(e) {
    // console.log(e.target);

    // console.log(e.target.duration);
    // console.log(e.target.currentTime);

    // const getduration = e.target.duration;
    // const getcurrenttime = e.target.currentTime;
    // console.log(getduration,getcurrenttime);

    // const {duration,currentTime} = e.target;
    // console.log(duration,currentTime);

    // const { duration } = e.target;
    // const { currentTime } = e.target;
    // console.log(duration,currentTime);

    // const [currentTime, duration] = [e.target.currentTime, e.target.duration];
    const [currentTime, duration] = [
        e.srcElement.currentTime,
        e.srcElement.duration,
    ];

    // console.log(duration,currentTime);

    if (currentTime === 0) {
        getprogressbar.style.width = '0%';
    } else {
        // 0 to 100
        const progresspercent = (currentTime / duration) * 100;
        //console.log(progresspercent);

        getprogressbar.style.width = `${progresspercent}%`;
    }

    //forward
    // const mins = Math.floor(currentTime/60);
    // const secs = Math.floor(currentTime%60);

    //backward
    const mins = Math.floor((duration - currentTime) / 60);
    const secs = Math.floor((duration - currentTime) % 60);
    // console.log(typeof mins); //number

    const minutevalue = mins.toString().padStart(2, '0'); // if you use padStart() concat number must string.
    // console.log(minutevalue);
    const secondvalue = secs.toString().padStart(2, '0'); // if you use padStart() concat number must string.

    getdisplaytime.innerText = `-${minutevalue}:${secondvalue}`;
}

function stopvideo() {
    getvideoscreen.currentTime = 0;
    getprogressbar.style.width = '0%';

    pausevideo();
}

function setprogress(e) {
    const width = this.clientWidth;
    const clickx = e.offsetX;
    const getduration = getvideoscreen.duration;

    getvideoscreen.currentTime = (clickx / width) * getduration;
}

function openfullscreen() {
    if (getcontainer.requestFullscreen) {
        getcontainer.requestFullscreen(); //          standard browser
    } else if (getcontainer.mozRequestFullscreen) {
        getcontainer.mozRequestFullscreen(); //          firefox browser
    } else if (getcontainer.webkitRequestFullscreen) {
        getcontainer.webkitRequestFullscreen(); //          chrome, safari, opera browsers
    } else if (getcontainer.msRequestFullscreen) {
        getcontainer.msRequestFullscreen(); //          ie, edge browser
    }

    getopenfullscreen.style.display = 'none';
    getclosefullscreen.style.display = 'inline-block';
    // if display flex did not mention, it would display in next line.
    // we can use inline-block to prevent this circumstance
}

function closefullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen(); //          standard browser
    } else if (document.mozCancelFullscreen) {
        document.mozExitFullscreen(); //          firefox browser
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); //          chrome, safari, opera browsers
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); //          ie, edge browser
    }

    getclosefullscreen.style.display = 'none';
    getopenfullscreen.style.display = 'inline-block';
}

getvideoscreen.addEventListener('timeupdate', updateprogress);
getvideoscreen.addEventListener('ended', nextvideo); //  autoplay next video

playbtn.addEventListener('click', playandpausevideo);
nextbtn.addEventListener('click', nextvideo); // 0 1 2 0 1 2
prevbtn.addEventListener('click', previousvideo); // 2 1 0 2 1 0
stopbtn.addEventListener('click', stopvideo);

getprogress.addEventListener('click', setprogress);
getopenfullscreen.addEventListener('click', openfullscreen);
getclosefullscreen.addEventListener('click', closefullscreen);
