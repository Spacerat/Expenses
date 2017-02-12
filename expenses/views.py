from rest_framework import viewsets
from django.contrib.auth.models import User
from expenses.models import Expense
from expenses.serializers import ExpenseSerializer, UserSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
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
