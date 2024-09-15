# recruiting_app/views.py
from rest_framework import generics
from rest_framework.response import Response
from .models import Job, Applicant
from .serializers import JobSerializer, ApplicantSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# List jobs for job seekers
class JobListView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# Job detail view for specific job
class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# Apply for a job (upload resume, etc.)
class ApplyForJobView(generics.CreateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    parser_classes = [MultiPartParser, FormParser]  # Enable resume file uploads

    def perform_create(self, serializer):
        # Here you can call Google Gemini API to calculate match_score
        # For simplicity, set a static score for now
        serializer.save(match_score=75.0)

# List applicants for HR
class ApplicantListView(generics.ListAPIView):
    serializer_class = ApplicantSerializer

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        return Applicant.objects.filter(job__id=job_id).order_by('-match_score')
