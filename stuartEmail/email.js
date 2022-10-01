const aws = require('aws-sdk')
aws.config.update({
    region:'eu-west-1'
});

async function sendCelebrationEmail(tempKampala, tempLondon)
{
    const ses = new aws.SES();
    const destination = {
        "ToAddresses": ["stuartkasekende1@gmail.com"]
    }

    tempKampala = Math.round(tempKampala);
    tempLondon = Math.round(tempLondon);
    const diff = getDiff(tempKampala, tempLondon);

    const templateData = {
        response: getResponse(diff, tempKampala, tempKampala)
    }

    const params = {
        Source: "stuartkasekende1@gmail.com",
        Destination: destination,
        Template: "testtemplate",
        templateData: JSON.stringify(templateData)
    };

    const email_data = await ses.sendTemplateEmail(params).promise()
    console.info("Successfully sent the email : " +JSON.stringify(email_data));
    //return email_data
}

function getDiff(tempKampala, tempLondon){
    return Math.round(tempKampala - tempLondon)
}

function getResponse(diff, tempKampala, tempLondon)
{
    const response = `<h1> Temperature: <\/h1> <h3> The day has finally arrived! </h3> <p> Uganda: ${tempKampala}C <br> UK: ${tempLondon}C <br> Difference: ${diff}C`

    return response
}

module.exports = { sendCelebrationEmail, getResponse, getDiff}