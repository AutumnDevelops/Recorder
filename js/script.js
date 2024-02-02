const device = navigator.mediaDevices.getUserMedia({audio:true});
const button = document.querySelector("#record");
const stop_button = document.querySelector("#stop");
const time_seconds = document.querySelector("#seconds");
const time_tens = document.querySelector("#tens");
const delete_button = document.querySelector("#delete");
const timer_div = document.querySelector("#timer");
let seconds = 00;
let tens = 00; 
let interval;

let items = []; 


device.then(stream =>{
    let recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e=>{items.push(e.data);
    if(recorder.state == "inactive"){
            let blob = new Blob (items, {type: "audio/webm"});
            let main_audio = document.querySelector("#audio_bar");
            main_audio.innerHTML = 
                    `
                    <source src = ${URL.createObjectURL(blob)} type = "video/webm"/>
                    `

            document.querySelector("#download_blob").innerHTML = 
                    `
                    <a href="${URL.createObjectURL(blob)}" download = "Audio.mp3" id = "download_blob">Download Audio</a>
                     `

                delete_button.addEventListener("click", ()=>{
                window.location.reload();
                })
            }
        };
        button.addEventListener("click", ()=>{
                recorder.start();
                interval = setInterval(start_timer, 1000)
                document.querySelector("#message").innerHTML = 
                    `<span style = "font-size:30px;font-weight:bold;"> 
                    You are now recording!
                    </span> 
                    <br> 
                    <span style = "font-size:22px;font-weight:bold;">
                    Click or tap stop to stop.
                    </span>
                    `
                    timer_div.classList.toggle("active");

                    
        })
        stop_button.addEventListener("click", ()=>{
                recorder.stop();
                 clearInterval(interval);
                 document.querySelector("#message").innerHTML = 
                 `
                 <p id = "message">Download your message or click "redo" to try again.</p>
                 `
                 timer_div.classList.toggle("active");
    })});




function start_timer(){
	seconds++;
	    if (seconds <= 9){
            time_seconds.innerHTML = "0" + seconds;
        };

        if (seconds > 9){
            time_seconds.innerHTML =seconds;
        };

        if (seconds >= 59){
            tens++;
            time_tens.innerHTML = "0" + tens;
            seconds = 0;
            time_seconds.innerHTML = seconds + 0;
        };

        if (tens > 9){
            time_tens.innerHTML = tens;
        };
}
