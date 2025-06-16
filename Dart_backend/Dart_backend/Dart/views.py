from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserFormSubmission, User
from django.http import JsonResponse
import jwt
from django.views.decorators.csrf import csrf_exempt
import json

@api_view(['POST'])
def submit_form(request):
    data = request.data
    user_email = data.get('user_email') 

    if not user_email:
        return Response({"error": "User email is required."}, status=400)

    try:
        # Find the user by email
        user = User.objects.get(email=user_email)

        # Create a new form submission linked to the user
        submission = UserFormSubmission.objects.create(
            user=user,
            name=data.get('name'),
            country=data.get('country'),
            contact=data.get('contact'),
            cad_file=request.FILES.get('cadFile'),
            pdf_spl_doc=data.get('pdfSplDoc'),
            pdf_file=request.FILES.get('pdfFile'),
            boq_standard=data.get('boqStandard'),
            collection_method=data.get('collectionMethod'),
        )
        return Response({"message": "Form submitted successfully!"})
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=400)



@csrf_exempt
def signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            role = data.get("role")  # Get the role from the request

            # Check if the user already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({"message": "User already exists."}, status=400)

            # Save the user to the database
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password),  # Ensure password is hashed in production
                role=role,  # Save the selected role
            )
            return JsonResponse({"message": "User signed up successfully."}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=400)




@api_view(['POST'])
def login(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    try:
        user = User.objects.get(username=username)
        if check_password(password, user.password):
            return Response({"message": "Login successful!", "email": user.email})
        else:
            return Response({"error": "Invalid password."}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=400)
    

@csrf_exempt
def google_login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get("token")

        try:
            # Decode the Google token
            decoded_token = jwt.decode(token, options={"verify_signature": False})
            email = decoded_token.get("email")

            # Check if the user exists
            user = User.objects.filter(email=email).first()
            if user:
                return JsonResponse({"isNewUser": False}, status=200)
            else:
                # If user is new, prompt them to select a role
                return JsonResponse({"isNewUser": True}, status=200)
        except Exception as e:
            return JsonResponse({"error": "Invalid token."}, status=400)



@csrf_exempt
def save_user_role(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")
            role = data.get("role")

            # Check if the user already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({"message": "User already exists."}, status=400)

            # Save the user to the database
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password), # Ensure password is hashed in production
                role=role,
            )
            return JsonResponse({"message": "User saved successfully."}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=400)