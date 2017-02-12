from rest_framework import viewsets

from expenses.models import Expense
from expenses.serializers import ExpensesSerializer
from functools import wraps


class ExpensesViewSet(viewsets.ModelViewSet):
	def get_queryset(self):
		return self.request.user.expenses.all()
	
	serializer_class = ExpensesSerializer
