from django import forms

class ContactForm(forms.Form):
    first_name = forms.CharField(max_length=25)
    last_name = forms.CharField(max_length=25)
    email = forms.EmailField()
    subject = forms.CharField(required=False)
    message = forms.CharField(widget=forms.Textarea)