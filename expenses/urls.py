from django.conf.urls import url, include
from expenses import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'expenses', views.ExpensesViewSet, base_name='expense')

urlpatterns = [
	url(r'^', include(router.urls)),
]
