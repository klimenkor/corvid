cd c:\tmp\corvid
serverless create --template aws-python3 --name mail-catcher --path mail-catcher
virtualenv venv --python=python
venv\scripts\activate

pip install numpy
pip freeze > requirements.txt


serverless deploy --function catch_email