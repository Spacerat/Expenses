from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

from expenses.models import Expense
from expenses.serializers import ExpenseSerializer, UserSerializer

from functools import wraps


class ExpensesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpenseSerializer
    def get_queryset(self):
        return self.request.user.expenses.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        report = Expense.getReport(self.request.user)
        return Response(report)
