const webcamElement = document.getElementById('webcam');
const up = document.getElementById('up');
const down = document.getElementById('down');
const count_disp = document.getElementById('count');
let classifier;
let net;
let count = 0;
let lastPose = 1;
var audio = new Audio('ding.mp3');

async function app() {
    console.log('Loading model..');

    // Load the model.
    /*net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: 257,
        quantBytes: 2
    });*/

    net = await posenet.load();
    console.log('Successfully loaded model');

    classifier = knnClassifier.create();

    addExample({ "score": 0.9683827477342942, "keypoints": [{ "score": 0.9976412057876587, "part": "nose", "position": { "x": 267.93225358896217, "y": 62.356407076468265 } }, { "score": 0.9931856393814087, "part": "leftEye", "position": { "x": 277.8128835477718, "y": 54.29358426698915 } }, { "score": 0.9964236617088318, "part": "rightEye", "position": { "x": 261.22432367347096, "y": 55.076031369457915 } }, { "score": 0.8747502565383911, "part": "leftEar", "position": { "x": 289.70627840390927, "y": 61.83210513935015 } }, { "score": 0.756027340888977, "part": "rightEar", "position": { "x": 252.4704988828429, "y": 57.14862541465908 } }, { "score": 0.9978110194206238, "part": "leftShoulder", "position": { "x": 301.84871213445405, "y": 122.03768719031189 } }, { "score": 0.9991893172264099, "part": "rightShoulder", "position": { "x": 240.2631262397024, "y": 117.90810670370257 } }, { "score": 0.9982326626777649, "part": "leftElbow", "position": { "x": 307.7732486947501, "y": 187.34358256892935 } }, { "score": 0.9948105812072754, "part": "rightElbow", "position": { "x": 232.64490862300886, "y": 185.01660239371807 } }, { "score": 0.9900482296943665, "part": "leftWrist", "position": { "x": 306.6987805793257, "y": 263.3259398464099 } }, { "score": 0.9797844886779785, "part": "rightWrist", "position": { "x": 223.97425017004346, "y": 247.93794090181936 } }, { "score": 0.9985044002532959, "part": "leftHip", "position": { "x": 290.7719593567607, "y": 254.95738463642996 } }, { "score": 0.9983602166175842, "part": "rightHip", "position": { "x": 248.70781212001458, "y": 248.2400886743449 } }, { "score": 0.9962770342826843, "part": "leftKnee", "position": { "x": 284.5559621135548, "y": 354.7625114945586 } }, { "score": 0.9912605881690979, "part": "rightKnee", "position": { "x": 243.22361333824782, "y": 351.83801910756625 } }, { "score": 0.9627237915992737, "part": "leftAnkle", "position": { "x": 285.46926298030155, "y": 454.8863511141172 } }, { "score": 0.9374762773513794, "part": "rightAnkle", "position": { "x": 244.985632395466, "y": 454.5239994034229 } }] }, 0);
    addExample({ "score": 0.8178890663034776, "keypoints": [{ "score": 0.8408581614494324, "part": "nose", "position": { "x": 288.6614075894486, "y": 60.02961244100727 } }, { "score": 0.3486729562282562, "part": "leftEye", "position": { "x": 282.3515717621443, "y": 49.91278295850939 } }, { "score": 0.8375979661941528, "part": "rightEye", "position": { "x": 288.0246945392297, "y": 54.174415796183425 } }, { "score": 0.24677249789237976, "part": "leftEar", "position": { "x": 268.1005752504104, "y": 54.07210917788257 } }, { "score": 0.9554916620254517, "part": "rightEar", "position": { "x": 269.47276787071377, "y": 56.740512179957285 } }, { "score": 0.9742079377174377, "part": "leftShoulder", "position": { "x": 255.2599480179961, "y": 101.14056034310782 } }, { "score": 0.9873836040496826, "part": "rightShoulder", "position": { "x": 251.37216293394334, "y": 102.5246868801488 } }, { "score": 0.7368040084838867, "part": "leftElbow", "position": { "x": 254.74462249399622, "y": 169.87307062408803 } }, { "score": 0.9846394062042236, "part": "rightElbow", "position": { "x": 250.15641743107065, "y": 173.36577478549825 } }, { "score": 0.8381218910217285, "part": "leftWrist", "position": { "x": 267.59477904798456, "y": 243.11444174918682 } }, { "score": 0.947123646736145, "part": "rightWrist", "position": { "x": 267.9584963312409, "y": 245.93391863752433 } }, { "score": 0.8988460898399353, "part": "leftHip", "position": { "x": 255.07589258572472, "y": 244.8498618278058 } }, { "score": 0.977441132068634, "part": "rightHip", "position": { "x": 256.97050577007843, "y": 244.61856055352473 } }, { "score": 0.8796417713165283, "part": "leftKnee", "position": { "x": 252.8664258667467, "y": 352.0021253058882 } }, { "score": 0.9391044974327087, "part": "rightKnee", "position": { "x": 253.93664883268482, "y": 347.63876473393424 } }, { "score": 0.7717608213424683, "part": "leftAnkle", "position": { "x": 238.00935262835907, "y": 452.5982749137433 } }, { "score": 0.7396460771560669, "part": "rightAnkle", "position": { "x": 237.48353297608372, "y": 453.7980194685524 } }] }, 0);

    addExample({ "score": 0.7327696979045868, "keypoints": [{ "score": 0.9159460663795471, "part": "nose", "position": { "x": 307.41748735598554, "y": 202.9901051799611 } }, { "score": 0.32662808895111084, "part": "leftEye", "position": { "x": 300.5379999658013, "y": 192.65255761053774 } }, { "score": 0.928784191608429, "part": "rightEye", "position": { "x": 301.33478186937623, "y": 193.39790789533683 } }, { "score": 0.28585439920425415, "part": "leftEar", "position": { "x": 281.02218687302405, "y": 193.50463035969418 } }, { "score": 0.980004608631134, "part": "rightEar", "position": { "x": 289.6010105711941, "y": 197.844093411813 } }, { "score": 0.9278569221496582, "part": "leftShoulder", "position": { "x": 252.16339348819005, "y": 215.06152913728113 } }, { "score": 0.9425076842308044, "part": "rightShoulder", "position": { "x": 269.2791237441482, "y": 219.5372971115409 } }, { "score": 0.35429611802101135, "part": "leftElbow", "position": { "x": 329.59281238600437, "y": 257.93186885373603 } }, { "score": 0.9657328724861145, "part": "rightElbow", "position": { "x": 330.71860821794445, "y": 254.96255006307757 } }, { "score": 0.4378401041030884, "part": "leftWrist", "position": { "x": 387.6738789480484, "y": 267.83817751398345 } }, { "score": 0.48593205213546753, "part": "rightWrist", "position": { "x": 401.20866233736626, "y": 263.92575275109436 } }, { "score": 0.9350943565368652, "part": "leftHip", "position": { "x": 206.6337051094738, "y": 331.6468413237932 } }, { "score": 0.9622013568878174, "part": "rightHip", "position": { "x": 211.29749164507083, "y": 332.337108567531 } }, { "score": 0.4184355139732361, "part": "leftKnee", "position": { "x": 292.27961083794384, "y": 358.3045098568215 } }, { "score": 0.9737004041671753, "part": "rightKnee", "position": { "x": 287.5688307943975, "y": 360.97467919731884 } }, { "score": 0.8631483912467957, "part": "leftAnkle", "position": { "x": 260.77184417368375, "y": 477.66712945722884 } }, { "score": 0.7531217336654663, "part": "rightAnkle", "position": { "x": 256.91953428988325, "y": 479.23866598522613 } }] }, 1);
    addExample({ "score": 0.9554362542488996, "keypoints": [{ "score": 0.9982991814613342, "part": "nose", "position": { "x": 249.84845113197653, "y": 205.43645420890837 } }, { "score": 0.9965780377388, "part": "leftEye", "position": { "x": 256.17390198466376, "y": 197.44712740530764 } }, { "score": 0.9959251880645752, "part": "rightEye", "position": { "x": 240.88688119376215, "y": 200.39073780816815 } }, { "score": 0.8817095160484314, "part": "leftEar", "position": { "x": 270.04467559695706, "y": 203.49401629852414 } }, { "score": 0.8663139343261719, "part": "rightEar", "position": { "x": 232.10711052445586, "y": 206.75717068089585 } }, { "score": 0.9969702363014221, "part": "leftShoulder", "position": { "x": 280.84638424884486, "y": 241.34431831567667 } }, { "score": 0.998697817325592, "part": "rightShoulder", "position": { "x": 219.8736435708369, "y": 241.86060864637798 } }, { "score": 0.985365629196167, "part": "leftElbow", "position": { "x": 298.04378168128346, "y": 279.41639228553623 } }, { "score": 0.9630911946296692, "part": "rightElbow", "position": { "x": 201.33949903198717, "y": 279.49494239421205 } }, { "score": 0.8861717581748962, "part": "leftWrist", "position": { "x": 290.2971557142206, "y": 266.5545689920507 } }, { "score": 0.8816248178482056, "part": "rightWrist", "position": { "x": 228.30710800705253, "y": 267.5195538116336 } }, { "score": 0.9973703026771545, "part": "leftHip", "position": { "x": 274.6202936432241, "y": 333.48629725118553 } }, { "score": 0.998167097568512, "part": "rightHip", "position": { "x": 231.29037938693153, "y": 334.6264019086667 } }, { "score": 0.9841808080673218, "part": "leftKnee", "position": { "x": 284.07290566292255, "y": 387.9431936063655 } }, { "score": 0.9839903116226196, "part": "rightKnee", "position": { "x": 216.94489119117824, "y": 381.1255429041525 } }, { "score": 0.8806878328323364, "part": "leftAnkle", "position": { "x": 281.83862114694796, "y": 465.4136093674003 } }, { "score": 0.9472726583480835, "part": "rightAnkle", "position": { "x": 212.46869276469783, "y": 459.2009963692394 } }] }, 1);

    await setupWebcam();
    while (true) {
        const result = await net.estimateSinglePose(webcamElement);

        //console.log(result);
        const poseArray = result.keypoints.map(p => [p.score, p.position.x, p.position.y]);

        const res = await classifier.predictClass(tf.tensor(poseArray));
        //console.log(res);

        up.innerHTML = "UP: " + res.confidences[0];
        down.innerHTML = "DOWN: " + res.confidences[1];

        //console.log(res.confidences[res.classIndex]);
        if (res.confidences[res.classIndex] > 0.6)
        {
            count_disp.innerHTML = count;

            if (lastPose == 1 && res.classIndex == 0)
            {
                console.log("lastpose: "+lastPose);
                console.log("current: " + res.classIndex);
                audio.play();
                count++;
            }

            lastPose = res.classIndex;
        }

        //console.log(count);

        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}

async function predictPose()
{
    const result = await net.estimateSinglePose(webcamElement);
    console.log(result);
    console.log(JSON.stringify(result));
    return result;
}

function addExample(pose, index) {
    // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
    const poseArray = pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);

    console.log(poseArray);

    // Add an example with a label to the classifier
    classifier.addExample(tf.tensor(poseArray), index);
}

async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true },
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject());
        } else {
            reject();
        }
    });
}

app();