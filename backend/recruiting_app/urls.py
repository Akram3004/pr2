# recruiting_app/urls.py
from django.urls import path
from .views import JobListView, JobDetailView, ApplyForJobView, ApplicantListView

urlpatterns = [
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('jobs/<int:pk>/apply/', ApplyForJobView.as_view(), name='apply-job'),
    path('jobs/<int:job_id>/applicants/', ApplicantListView.as_view(), name='applicant-list'),
]
