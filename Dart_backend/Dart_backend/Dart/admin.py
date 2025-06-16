from django.contrib import admin
from .models import UserFormSubmission, User

@admin.register(UserFormSubmission)
class UserFormSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'user__email', 'country', 'contact',  'cad_file', 'pdf_spl_doc', 'pdf_file', 'boq_standard', 'collection_method','submitted_at')
    search_fields = ('name', 'country', 'contact')
    



@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role') 
    search_fields = ('username', 'email', 'role')