cd c:\tmp\corvid
serverless create --template aws-python3 --name mail-catcher --path mail-catcher
virtualenv venv --python=python
venv\scripts\activate

pip install numpy
pip freeze > requirements.txt


serverless deploy --function catch_email


Test email:
motion@ikncu.com
Motion Detection from Cam{Q-zu2FcEr}
