from django.conf.urls import url, include
from expenses import views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'expenses', views.ExpensesViewSet, base_name='expense')
router.register(r'users', views.UsersViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
	url(r'^report/$', views.ReportView.as_view(), name='report'),
	url(r'^user/$', views.UserView.as_view(), name='user'),
	url(r'^api_auth/', include('rest_framework.urls')),
	url(r'^get_token/', obtain_auth_token),
]
