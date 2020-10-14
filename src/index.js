const recordContainer = document.getElementById('jsRecorderContainer');
const recordingBtn = document.querySelector('.RecordingBtn');

function startVoiceRecording(){
        const stream = navigator.mediaDevices.getUserMedia({
            audio:true
        });
        console.log(stream);
}

const init = () => {
    recordingBtn.addEventListener('click',startVoiceRecording);
}

if(recordContainer){
    init();
}