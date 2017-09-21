// The exported functions in this module makes a call to Microsoft Custom Vision Service API and return image prediction 
// data if found. For more info checkout the API documentation of Microsoft Custom Vision Service API

var request = require('request').defaults({ encoding: null });

var VISION_IMG = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/8e8cb11a-033e-451a-b05b-60603fd45fd6/image';
var VISION_URL = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/8e8cb11a-033e-451a-b05b-60603fd45fd6/url'
/** 
 *  Gets the image prediction data from an image stream
 * @param {stream} stream The stream to an image.
 * @return {Promise} Promise with image prediction string if succeeded, error otherwise
 */
exports.getDataFromStream = function (stream) {
    return new Promise(
        function (resolve, reject) {
            
            var requestData = {
                url: VISION_IMG,
                encoding: 'binary',
                
                headers: {
                    'Prediction-Key': process.env.MICROSOFT_PREDICTION_KEY,
                    'content-type': 'application/octet-stream'
                }
            };
        
            
            stream.pipe(request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                } else if (response.statusCode !== 200) {
                    reject(body);
                } else {
                    resolve(extractData(JSON.parse(body)));
                }
            }));
        }
    );
};

/** 
 * Gets the caption of the image from an image URL
 * @param {string} url The URL to an image.
 * @return {Promise} Promise with image prediction info string if succeeded, error otherwise
 */
exports.getDataFromUrl = function (url) {
    return new Promise(
        function (resolve, reject) {
            var requestData = {
                url: VISION_URL,
                json: { 'url': url },
                headers: {
                    'Prediction-Key': process.env.MICROSOFT_PREDICTION_KEY,
                    'content-type': 'application/json'
                }
            };

            request.post(requestData, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(extractData(body));
                }
            });
        }
    );
};

/**
 * Extracts the image predication data from the response of the Custome Vision Service API
 * @param {Object} body Response of the Custom Vision Service API
 * @return {string} List of Image prediction data if found, null otherwise.
 */

function extractData(body) {
var list="";
    if (body && body.Predictions && body.Predictions.length) {
        for (var i = 0; i < body.Predictions.length; i++) {
        var re=body.Predictions[i];
        list =list+ "[tag " + re.Tag+", "+"Probability  "+re.Probability+"]   ";
        //console.log('list=%s',list);
        }
        return list;
    }

    return null;
}