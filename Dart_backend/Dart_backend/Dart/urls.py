from django.urls import path
from .views import submit_form, signup, login, google_login, save_user_role

urlpatterns = [
    path('api/submit-form/', submit_form, name='submit_form'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('google-login/', google_login, name='google_login'),
    path('save-user-role/', save_user_role, name='save_user_role'),
]