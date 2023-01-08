using System.Net;
using System.Net.Mail;

namespace InvoicesBackend.Email
{
    public class EmailSender
    {
        private SmtpClient smpt;
        private MailMessage mail;
        private EmailParams emailParams;

        public EmailSender(EmailParams _emailParams)
        {
            this.emailParams = _emailParams;
        }
        public async Task Send(string to, string subject, string body)
        {
            mail = new MailMessage();
            mail.From = new MailAddress(emailParams.SenderEmail, emailParams.SenderName);
            mail.To.Add(new MailAddress(to));
            mail.Subject = subject;
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            mail.Body = body;

            smpt = new SmtpClient()
            {
                Host = emailParams.HostSmtp,
                EnableSsl = emailParams.EnableSsl,
                Port = emailParams.Port,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(emailParams.SenderEmail, emailParams.SenderEmailPassword)
            };
            smpt.SendCompleted += OnSendCompleted;

            var cts = new CancellationTokenSource();
            cts.CancelAfter(TimeSpan.FromSeconds(15));

            await smpt.SendMailAsync(mail, cts.Token);
            
        }
        private void OnSendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
        {
            smpt.Dispose();
            mail.Dispose();
        }
    }
}
