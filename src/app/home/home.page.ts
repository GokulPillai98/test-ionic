import { Component } from '@angular/core';
declare var MediaRecorder: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  irruka = false;
  audioURL;
  constructor() {}
  captureAudio() {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
      let thisRef = this;
      const mediaRec = new MediaRecorder(stream);
      mediaRec.start();
      setTimeout(() => {
        mediaRec.stop();
      }, 3000);
      const audioChunks = [];
      mediaRec.ondataavailable = function(e) {
        audioChunks.push(e.data);
      }  
      mediaRec.onstop = function(e) {
        console.log(audioChunks)
        let blob = new Blob(audioChunks)
        thisRef.audioURL = window.URL.createObjectURL(blob);
        const audio = new Audio(thisRef.audioURL);
        audio.play();
      }
    })
  }
}


