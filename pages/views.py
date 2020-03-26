from django.shortcuts import render
from django.core.mail import send_mail
from .forms import ContactForm
from django.contrib import messages
from django.views.generic import View

# Create your views here.
class HomePage(View):
    def get(self,*args,**kwargs):
        return render(self.request,'pages/index.html',{'form':ContactForm()})
    
    def post(self,*args,**kwargs):
        form = ContactForm(data=self.request.POST or None)

        if form.is_valid():
            cd = form.cleaned_data
            my_emails = ['kwakukusi30@yahoo.com','kwakukusi30@outlook.com']
            subject = 'A message from {} {} with subject "{}"'.format(cd['first_name'],cd['last_name'],cd['subject'])
            res = send_mail(subject,cd['message'],cd['email'],my_emails)
            
            was_sent = True
            if res == 0:
                was_sent = False
                messages.add_message(self.request,messages.ERROR,"email was not sent","danger")
            else:
                messages.add_message(self.request,messages.SUCCESS,"email was sent successfully","success")
            return render(self.request,'pages/index.html',{'form':ContactForm(),'was_sent':was_sent})
        
        return render(self.request,'pages/index.html',{'form':ContactForm()})