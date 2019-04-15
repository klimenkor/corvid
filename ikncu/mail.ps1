$smtp = "smtp.gmail.com"
$port = "465"
$from = "klimenkor@gmail.com"
$to = "motion@ikncu.com"
$attachment = "E:\dev\corvid\test2.jpg"
$camera = "gw9cR93uX"
$subject = "Motion Detection from Cam{" + $camera + "} at " + (Get-Date).ToString("MM/dd/yyyy hh:mm:ss")
$body = ""

$credentials = Get-Credential # -credential $from

Send-MailMessage -From $from -to $to -Subject $subject -SmtpServer $smtp -port $port -UseSsl -Credential $credentials -Attachments $attachment –DeliveryNotificationOption OnSuccess
