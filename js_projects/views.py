from django.shortcuts import render
from django.views.generic import ListView,DetailView
from .models import Project

# Create your views here.
class HomePage(ListView):
    model = Project
    template_name = 'js_projects/home.html'
    context_object_name = 'projects'


class ProjectDetail(DetailView):
    model = Project
    template_name = 'js_projects/project.html'
    context_object_name = 'project'