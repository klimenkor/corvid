import smtplib
from email.mime.multipart import MIMEMultipart
from emailsend import sendMail

# s = smtplib.SMTP('smtp.gmail.com', 587)
# s.starttls()
# s.login("klimenkor@gmail.com", "M3l1na030217!!")
#
# msg = MIMEMultipart()
# # msg['To']="3234592298@txt.att.net"
# msg['To']="roman.klimenko@gmail.com"
# msg['Subject']="TEST"
#
# s.send_message(msg)
# # s.sendmail("klimenkor@gmail.com","roman.klimenko@gmail.com","Test")
# # del msg
#
# s.quit()


sendMail(fromAddress="klimenkor@gmail.com",
         toAddress="3234592298@txt.att.net",
         mSubject="person detected at south-west",
         mBody="",
         mBodyHTML="",
         mAttachment=[],
         serverLogin="True",
         serverServer="smtp.gmail.com",
         serverPort="587",
         serverTSL="True",
         serverUser="klimenkor@gmail.com",
         serverPass="M3l1na030217!!")
