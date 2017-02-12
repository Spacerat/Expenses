from django.conf.urls import url, include
from expenses import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'expenses', views.ExpensesViewSet, base_name='expense')
router.register(r'users', views.UsersViewSet)
router.register(r'users', views.UsersViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
	url(r'^report/$', views.ReportView.as_view(), name='report'),
	url(r'^api_auth/', include('rest_framework.urls')),
]
