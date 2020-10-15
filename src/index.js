
const recordingBtn = document.querySelector('.recordingBtn');
const constraints = {audio : true};
const options = { mimeType : "audio/webm;codecs=opus"}

const getVoice = () => {
    const stream = navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream){
        //console.log(stream);
        const voiceRecorder = new MediaRecorder(stream,options);
        voiceRecorder.addEventListener("dataavailable", handleData);
        voiceRecorder.start();

        recordingBtn.innerHTML = `Stop Recording`;
        recordingBtn.removeEventListener('click',getVoice);
        recordingBtn.addEventListener('click',function(){
            voiceRecorder.stop();
            recordingBtn.innerHTML = `Start Recording`;
            recordingBtn.removeEventListener('click',getVoice);
        });
        //console.log(voiceRecorder);
    }).catch(function(error){
        console.log(error);
        recordingBtn.innerHTML = `Can't Recording`;
        recordingBtn.removeEventListener('click',getVoice);
    })
}

const handleData = (event) => {
    console.log(event);
}


recordingBtn.addEventListener('click',getVoice);

