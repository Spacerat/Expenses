from rest_framework import viewsets, permissions, filters
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.compat import coreapi
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from expenses.models import Expense
from expenses.serializers import ExpenseSerializer, UserSerializer

from functools import wraps


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.owner == request.user:
            return True
        if request.method in permissions.SAFE_METHODS and request.user.is_staff:
            return True

class AdminSpyFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.user.is_staff:
            if 'user' in request.query_params:
                return  queryset.filter(owner=request.query_params['user'])
        return queryset.filter(owner=request.user)

    def get_schema_fields(self, view):
        return [
            coreapi.Field(name='user', required=False, location='query'),
        ]


class ExpensesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
    filter_backends = (AdminSpyFilter,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        return Response(UserSerializer(request.user).data)

class DateRangeFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('from', None) and request.query_params.get('to', None):
            print(request.query_params)
            queryset = queryset.filter(datetime__range=[
                request.query_params['from'],
                request.query_params['to']
            ])
        return queryset.filter(owner=request.user)

    def get_schema_fields(self, view):
        return [
            coreapi.Field(name='from', required=False, location='query'),
            coreapi.Field(name='to', required=False, location='query'),
            coreapi.Field(name='groupby', required=False, location='query')
        ]

class ReportView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    filter_backends = (DateRangeFilter,)
    queryset = Expense.objects.all()

    def get(self, request, format=None):
        groupby = 'week'
        if 'groupby' in request.query_params:
            groupby = request.query_params['groupby']
        report = Expense.getReport(self.filter_queryset(self.get_queryset()), group_kind=groupby)
        return Response(report)
