const delay = ms => new Promise(res => setTimeout(res, ms));
function copyText(text) 
{
     if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text);
     } else {
          var tempInput = document.createElement("input");
          tempInput.style = "position: absolute; left: -1000px; top: -1000px";
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
     }
} 


function sendCommand(command) {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/command",
    data: { command: command }
  });
}

async function waitFor()
{
   await delay(1);
   sendCommand("Joined");
}

window.addEventListener('beforeunload', function(event) {
  if (event.type === 'beforeunload') {
    sendCommand("Left");
  }
});
