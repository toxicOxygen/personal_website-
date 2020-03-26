from django.db import models
from django.utils.text import slugify
from django.urls import reverse

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200,blank=True)
    description = models.CharField(max_length=300,blank=True)
    js_code = models.TextField()
    html_code = models.TextField()
    css_code = models.TextField(blank=True)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('project-detail',args=[str(self.slug),])
    