Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_photo() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="image_taken" src="'+data_uri+'">';
    });
}

console.log("ML5 Version -", ml5.verison);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/34Zuqj6e8/model.json", ModelLoaded);
function ModelLoaded() {
    console.log("Model Loaded = True");
}

function identify() {
    img = document.getElementById("image_taken");
    classifier.classify(img, answer);

    function answer(error,result) {
        if (error) {
            console.error(error);
            window.alert("Error in Identifing Image . Please Retry =)");
        } else {
            console.log(result);
            document.getElementById("person").innerHTML = result[0].label;
            document.getElementById("accuracy").innerHTML = result[0].confidence.toFixed(2);
            window.alert("Image Identified See The Results Below . ^_^ ");
        }
    }
}