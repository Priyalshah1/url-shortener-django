from django.shortcuts import render
from django.shortcuts import render, redirect
from .models import ShortURL
import random, string

def redirect_url(request, code):
    try:
        url = ShortURL.objects.get(short_code=code)
        url.click_count += 1
        url.save()
        return redirect(url.original_url)
    except ShortURL.DoesNotExist:
        return redirect('home')

def generate_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def home(request):
    short_url = None

    if request.method == "POST":
        original_url = request.POST.get("url")  

        if original_url:
            code = generate_code()

            ShortURL.objects.create(
                original_url=original_url,
                short_code=code
            )

            short_url = request.build_absolute_uri('/') + code

    return render(request, "index.html", {"short_url": short_url})