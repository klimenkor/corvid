cd c:\tmp\corvid
serverless create --template aws-python3 --name mail-catcher --path mail-catcher
virtualenv venv --python=python
venv\scripts\activate
.\venv\Scripts\activate.bat

pip install numpy
pip freeze > requirements.txt


serverless deploy --function image_processor


Test email:
motion@ikncu.com
Motion Detection from Cam{Q-zu2FcEr}



=====================
mkdir temp
python3 -m pip install opencv-python -t temp
pip install opencv-python
cd temp
zip -r /package/$1.zip *
