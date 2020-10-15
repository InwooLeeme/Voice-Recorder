
const recordingBtn = document.querySelector('.recordingBtn');
const constraints = {audio : true};
const options = { mimeType : "audio/webm;codecs=opus"};
let voiceRecorder;
const showStatus = document.querySelector('.showStatus');
let timer = 0;
let showTimer;

const getVoice = () => {
    const stream = navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
        voiceRecorder = new MediaRecorder(stream,options);
        voiceRecorder.addEventListener("dataavailable", handleData);
        voiceRecorder.start();
        showTimer = setInterval(showSeconds,1000);
        voiceRecorder.onstart = showTimer
        
        
        recordingBtn.innerHTML = `Stop Recording`;
        recordingBtn.removeEventListener('click',getVoice);
        recordingBtn.addEventListener('click',stopRecording);
        //console.log(voiceRecorder);
    }).catch(function(error){
        console.log(error);
        recordingBtn.innerHTML = `Can't Recording`;
        recordingBtn.removeEventListener('click',getVoice);
    })
}

const showSeconds = () => {
    timer++;
    showStatus.innerHTML = `Recording for ${timer}`;
}

// Stop Recording function
const stopRecording = () => {
    voiceRecorder.stop();
    voiceRecorder.onstop = clearInterval(showTimer);
    showStatus.classList.add('Q3wE');
    recordingBtn.innerHTML = `Start Recording`;
    recordingBtn.removeEventListener('click',stopRecording);
}

const handleData = (event) => {
    // data 추출
    console.log(event);
    const {data} = event;
    // 새로운 링크 생성
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = `recorded.webm`;
    document.body.appendChild(link);
    link.click();
}


recordingBtn.addEventListener('click',getVoice);

