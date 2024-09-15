# recruiting_app/models.py
from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    requirements = models.TextField()
    posted_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class Applicant(models.Model):
    job = models.ForeignKey(Job, related_name='applicants', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    years_of_experience = models.IntegerField()
    education = models.CharField(max_length=200)
    resume = models.FileField(upload_to='resumes/')
    match_score = models.FloatField(default=0)  # Calculated via Google Gemini API

    def __str__(self):
        return self.name
