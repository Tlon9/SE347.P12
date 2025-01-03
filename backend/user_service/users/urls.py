from django.urls import path
from users.apis import *

urlpatterns = [
    path('user/signup', RegisterUserView.as_view(), name='register'),
    path('auth/login/google',GoogleLogin.as_view(), name='google-login'),
    path('user/', UserInfoView.as_view(), name='user-info'),
    path('user/updateinfo/', UpdateUserInfoView.as_view(), name='user-update'),
    path('user/updatepassword/', UpdatePasswordView.as_view(), name='password-update'),
    path('user/token-verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('user/checkpassport/', CheckPassport.as_view(), name='check-passport'),
    path('user/verify/', VerifyUser.as_view(), name='verify'),
    path('user/updateinfo/', UpdateUserInfoView.as_view(), name='user-update'),
    path('user/updatepassword/', UpdatePasswordView.as_view(), name='password-update'),
    path('user/logout/', Logout.as_view(), name='api_logout'),
    path('user/check_login/', check_Login.as_view(), name='api_check_login'),
    path('user/score/', getScore.as_view(), name='user-score'),
    path('user/score/update/', updateScore.as_view(), name='update-score'),
]
