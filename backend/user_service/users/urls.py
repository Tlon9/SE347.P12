from django.urls import path
from users.apis import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('user/signup', RegisterUserView.as_view(), name='register'),
    path('hello/', HelloView.as_view()),
    path('auth/login/google',GoogleLogin.as_view(), name='google-login'),
    path('user/info/', get_UserInfo.as_view(), name='user-info'),
    path('user/verify/', VerifyUser.as_view(), name='verify'),
    path('user/updateinfo/', UpdateUserInfoView.as_view(), name='user-update'),
    path('user/updatepassword/', UpdatePasswordView.as_view(), name='password-update'),
    path('user/logout/', Logout.as_view(), name='api_logout'),
    path('user/check_login/', check_Login.as_view(), name='api_check_login'),
]
