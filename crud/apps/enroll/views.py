# Editing ajax issue not solved.

from django.shortcuts import render
# from django.views.generic import FormView
from .forms import StudentRegistration
from .models import User
from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def student_view(request):
    form = StudentRegistration()
    stud = User.objects.all()
    return render(request, 'enroll/base.html', {'form': form, 'stu': stud})

# class StudentView(FormView):
#     form_class = StudentRegistration
#     template_name = 'enroll/base.html'
#
#     def get_context_data(self, **kwargs):
#         context = super(StudentView).


# @csrf_exempt  # This decorator is used if we didn't use csrf_protection
def save_view(request):
    if request.method == "POST":
        form = StudentRegistration(request.POST)
        if form.is_valid():
            sid = request.POST.get('stuid')
            name = request.POST['name']
            email = request.POST['email']
            password = request.POST['password']
            if(sid == ''):
                usr = User(name=name, email=email, password=password)
            else:
                usr = User(id=sid, name=name, email=email, password=password)
            usr.save()
            stud = User.objects.values()
            # print(stud)
            student_data = list(stud)
            return JsonResponse({'status': 'save',
                                 'student_data': student_data})
        else:
            return JsonResponse({'status': 0})


def delete_view(request):
    if request.method == "POST":
        id = request.POST.get('sid')
        # print(id)
        pi = User.objects.get(pk=id)
        pi.delete()
        return JsonResponse({'status': 1})
    else:
        return JsonResponse({'status': 0})


def edit_view(request):
    if request.method == "POST":
        id = request.POST.get('sid')
        # print(id)
        student = User.objects.get(pk=id)
        student_data = {'id': student.id, 'name': student.name,
                        'email': student.email, 'password': student.password}
        return JsonResponse(student_data)
