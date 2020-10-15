
const recordingBtn = document.querySelector('.recordingBtn');
const constraints = {audio : true};
const options = { mimeType : "audio/webm;codecs=opus"};
let voiceRecorder;



const getVoice = () => {
    const stream = navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
        voiceRecorder = new MediaRecorder(stream,options);
        voiceRecorder.addEventListener("dataavailable", handleData);
        voiceRecorder.start();



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

// Stop Recording function
const stopRecording = () => {
    voiceRecorder.stop();
    recordingBtn.innerHTML = `Start Recording`;
    recordingBtn.removeEventListener('click',stopRecording);
}

const handleData = (event) => {
    // data 추출
    const {data} = event;
    // 새로운 링크 생성
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = `recorded.webm`;
    document.body.appendChild(link);
    link.click();
}


recordingBtn.addEventListener('click',getVoice);

