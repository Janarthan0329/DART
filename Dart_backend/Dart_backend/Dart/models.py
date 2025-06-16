from django.db import models

class UserFormSubmission(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='submissions')  # Link to User
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    cad_file = models.FileField(upload_to='cad_files/', blank=True, null=True)
    pdf_spl_doc = models.CharField(max_length=50, blank=True, null=True)
    pdf_file = models.FileField(upload_to='pdf_files/', blank=True, null=True)
    boq_standard = models.CharField(max_length=50, blank=True, null=True)
    collection_method = models.CharField(max_length=50, blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.email})"
    


class User(models.Model):
    ROLE_CHOICES = [
        ('building_a_house', "I'm building a house"),
        ('quantity_surveyor', "I'm a quantity surveyor"),
        ('contractor', "I'm a contractor"),
        ('other', "Other"),
    ]

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='other')  # New field

    def __str__(self):
        return self.username