from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.student_view, name='base'),
    path('save/', views.save_view, name='save'),
    path('delete/', views.delete_view, name='delete'),
    path('edit/', views.edit_view, name='edit'),
    path('api/', include('enroll.api.urls')),

    # path('', views.StudentView.as_view(), name='enroll')
]
