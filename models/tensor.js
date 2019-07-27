const tf = require('@tensorflow/tfjs-node');


const features = tf.tensor([
    [-121, 47],
    [-121.2, 46.5],
    [-122, 46.4],
    [-120.9, 46.7]
]);

const labels = tf.tensor([
    [200],
    [250],
    [215],
    [240]
]);

const predicitionPoint = tf.tensor([-121, 45]);

let k = 2;


console.log();

//console.log(getKNN(predicitionPoint, features, labels, k));



// function getKNN(predicitionPoint, features, labels, k) {
// 	return features.sub(predicitionPoint).pow(2).sum(1).sqrt().expandDims(1).concat(labels, 1).unstack().sort((a, b) => { 
// 		console.log(a.arraySync()[0]);


// 		return a.arraySync()[0] - b.arraySync()[0] }).slice(0,k).length;
// }