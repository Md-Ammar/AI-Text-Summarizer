const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

var button = document.getElementById("myButton");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

submitButton.disabled = true;

function verifyTextLength(e) {
    const textarea = e.target;

    if(textArea.value.length > 200 && textArea.value.length < 100000){
        submitButton.disabled=false;
    }else{
        submitButton.disabled=true;
    }
}

function submitData(e) {
    console.log("submit function")
    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch('/summarize', requestOptions)
        .then(response => response.text())
        .then(summary => {
            summarizedTextArea.value = summary;
            submitButton.classList.remove("submit-button--loading");
            
        }).catch(error=>{
            console.log(error.message);
        });
}
