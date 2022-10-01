file_name=stuartEmail
current_time=$(date "+%d.%m.%Y-%H.%M.%S")
new_fileName=$file_name.$current_time.zip
zip -r $new_fileName .

aws s3 cp $new_fileName s3://stuart-email-bucket
aws cloudformation update-stack --stack-name stuart-email-stack --template-body file://~/Documents/Temperature_Project/lambda_cloudformation_template.yaml --parameters ParameterKey=newFileName,ParameterValue=$new_fileName

# NEED TO EDIT THIS TO CORRECT PATHS