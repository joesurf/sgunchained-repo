from django.conf import settings
from django.http import HttpResponse
from django.template.loader import render_to_string

# import weasyprint

# Create your views here.
# def trip_pdf(request, trip):
#   html = render_to_string('pdf.html', {
#     'activity': trip
#   })
#   response = HttpResponse(content_type='application/pdf')
#   response['Content-Disposition'] = f'filename=unchained.pdf'
#   weasyprint.HTML(string=html).write_pdf(
#     response,
#   )
#   return response