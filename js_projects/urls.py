from django.urls import path 
from .views import HomePage,ProjectDetail

urlpatterns = [
    path('home/',HomePage.as_view(),name="js_home"),
    path('home/<str:slug>/',ProjectDetail.as_view(),name="project-detail")
]